const greeting = document.querySelector("#greeting");
const greetingButton = document.querySelector("#greeting-button");
const clockTime = document.querySelector("#clock-time");
const hourHand = document.querySelector(".clock-hand--hour");
const minuteHand = document.querySelector(".clock-hand--minute");
const secondHand = document.querySelector(".clock-hand--second");

const messages = [
  "Un pequeño espacio para dar vida a tus ideas.",
  "¡Qué bueno tenerte por aquí!",
  "Las grandes ideas empiezan con algo sencillo.",
];

let currentMessage = 0;

greetingButton.addEventListener("click", () => {
  currentMessage = (currentMessage + 1) % messages.length;
  greeting.textContent = messages[currentMessage];
});

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds() + now.getMilliseconds() / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  hourHand.style.transform = `translateX(-50%) rotate(${hours * 30}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minutes * 6}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${seconds * 6}deg)`;
  clockTime.dateTime = now.toISOString();
  clockTime.textContent = `Hora local: ${now.toLocaleTimeString("es")}`;
}

updateClock();
window.setInterval(updateClock, 1000);
