const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const projectDirectory = path.join(__dirname, "..");
const script = readFileSync(path.join(projectDirectory, "script.js"), "utf8");
const html = readFileSync(path.join(projectDirectory, "index.html"), "utf8");
const fixedTime = "2024-01-02T03:04:05.500Z";

function loadApp(reducedMotion = false) {
  const elements = {
    "#greeting": { textContent: "" },
    "#greeting-button": { addEventListener: (event, handler) => {
      elements.greetingClick = handler;
    } },
    "#clock-time": { dateTime: "", textContent: "" },
    ".clock-hand--hour": { style: {} },
    ".clock-hand--minute": { style: {} },
    ".clock-hand--second": { style: {} },
  };
  const intervals = [];

  class FixedDate extends Date {
    constructor(...args) {
      super(...(args.length === 0 ? [fixedTime] : args));
    }
  }

  const context = {
    Date: FixedDate,
    document: {
      querySelector: (selector) => elements[selector],
    },
    window: {
      matchMedia: () => ({ matches: reducedMotion }),
      setInterval: (callback, delay) => {
        intervals.push({ callback, delay });
      },
    },
  };

  vm.runInNewContext(script, context);
  return { elements, intervals };
}

test("el HTML carga el script de forma diferida y contiene sus elementos", () => {
  assert.match(html, /<script src="script\.js" defer><\/script>/);
  for (const selector of [
    'id="greeting"',
    'id="greeting-button"',
    'id="clock-time"',
    "clock-hand--hour",
    "clock-hand--minute",
    "clock-hand--second",
  ]) {
    assert.ok(html.includes(selector), `Falta ${selector} en index.html`);
  }
});

test("el botón recorre los mensajes de inspiración y vuelve al primero", () => {
  const { elements } = loadApp();
  const messages = [
    "Un pequeño espacio para dar vida a tus ideas.",
    "¡Qué bueno tenerte por aquí!",
    "Las grandes ideas empiezan con algo sencillo.",
  ];

  for (const message of [
    messages[1],
    messages[2],
    messages[0],
    messages[1],
  ]) {
    elements.greetingClick();
    assert.equal(elements["#greeting"].textContent, message);
  }
});

test("el reloj muestra la hora local y actualiza las agujas cada segundo", () => {
  const { elements, intervals } = loadApp();
  const now = new Date(fixedTime);
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  assert.equal(elements["#clock-time"].dateTime, now.toISOString());
  assert.equal(
    elements["#clock-time"].textContent,
    `Hora local: ${now.toLocaleTimeString("es")}`,
  );
  assert.equal(
    elements[".clock-hand--hour"].style.transform,
    `translateX(-50%) rotate(${hours * 30}deg)`,
  );
  assert.equal(
    elements[".clock-hand--minute"].style.transform,
    `translateX(-50%) rotate(${minutes * 6}deg)`,
  );
  assert.equal(
    elements[".clock-hand--second"].style.transform,
    `translateX(-50%) rotate(${seconds * 6}deg)`,
  );
  assert.equal(intervals.length, 1);
  assert.equal(intervals[0].delay, 1000);
});

test("el reloj respeta la preferencia de movimiento reducido", () => {
  const { elements } = loadApp(true);

  assert.equal(
    elements[".clock-hand--second"].style.transform,
    "translateX(-50%) rotate(0deg)",
  );
  assert.equal(
    elements[".clock-hand--minute"].style.transform,
    "translateX(-50%) rotate(24deg)",
  );
});
