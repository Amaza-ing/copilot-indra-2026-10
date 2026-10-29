---
name: sales-db
description: "Guía tareas sobre la base de datos de ventas: pedidos, transacciones, productos, facturas, devoluciones e informes. Úsala al consultar, modificar o documentar datos y esquemas comerciales."
---

# Base de datos de ventas

## Cuándo usarla

- Al trabajar con pedidos, líneas de pedido, productos, pagos, facturas, devoluciones o informes de ventas.
- Al revisar consultas, modelos, migraciones o integraciones que acceden a esos datos.

## Procedimiento

1. Localiza la configuración, documentación, modelos y migraciones existentes para identificar la conexión y el esquema reales. No presupongas el motor, los nombres de tablas o columnas ni el entorno.
2. Confirma que la tarea corresponde a la base de ventas y sigue sus patrones de acceso existentes. No mezcles datos de usuarios; cualquier integración entre bases debe estar explícitamente solicitada y documentada.
3. Usa consultas parametrizadas y las herramientas de acceso existentes. Nunca construyas consultas concatenando datos proporcionados por usuarios.
4. Al calcular importes, verifica las reglas documentadas para moneda, impuestos, descuentos, redondeo, estados y zona horaria. No infieras esas reglas ni alteres registros históricos para cambiar el resultado de informes.
5. Antes de cambiar pedidos, pagos, facturas o devoluciones, confirma que la petición lo autoriza, revisa las relaciones y restricciones afectadas y usa transacciones o migraciones reversibles cuando el proyecto las admita.
6. Limita los datos mostrados y evita incluir información personal o financiera sensible en logs, respuestas, ejemplos, capturas o archivos versionados.
7. Valida los resultados con pruebas o verificaciones no destructivas; para informes, comprueba los cálculos y los filtros con casos representativos.

## Reglas

- No inventes un esquema, estado comercial o regla de cálculo; inspecciona el proyecto o pide la información necesaria.
- No uses datos de producción ni ejecutes operaciones masivas, cobros, reembolsos o cambios irreversibles sin autorización explícita.
- Conserva la trazabilidad de las operaciones y las reglas de integridad, privacidad y retención de datos.
