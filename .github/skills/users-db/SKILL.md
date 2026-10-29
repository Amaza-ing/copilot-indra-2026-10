---
name: users-db
description: "Guía tareas sobre la base de datos de usuarios: cuentas, perfiles, roles, permisos y autenticación. Úsala al consultar, modificar o documentar datos y esquemas de usuarios."
---

# Base de datos de usuarios

## Cuándo usarla

- Al trabajar con cuentas, perfiles, roles, permisos o estados de usuario.
- Al revisar consultas, modelos, migraciones o integraciones que acceden a esos datos.

## Procedimiento

1. Localiza la configuración, documentación, modelos y migraciones existentes para identificar la conexión y el esquema reales. No presupongas el motor, los nombres de tablas o columnas ni el entorno.
2. Confirma que la tarea corresponde a la base de usuarios y sigue sus patrones de acceso existentes. No mezcles datos de ventas; cualquier integración entre bases debe estar explícitamente solicitada y documentada.
3. Trata nombres, correos, credenciales, identificadores y demás información personal como sensible. No expongas valores reales en logs, respuestas, ejemplos, capturas ni archivos versionados.
4. Usa consultas parametrizadas y las herramientas de acceso existentes. Nunca construyas consultas concatenando datos proporcionados por usuarios.
5. Mantén el acceso limitado a los datos y permisos necesarios. No consultes ni reveles contraseñas, tokens, secretos o hashes; usa los flujos seguros existentes para autenticación y credenciales.
6. Antes de cambiar datos o esquema, confirma que la petición lo autoriza, revisa las restricciones y relaciones afectadas y usa transacciones o migraciones reversibles cuando el proyecto las admita.
7. Valida el resultado con pruebas o verificaciones no destructivas y comunica cualquier supuesto, limitación o dato que falte.

## Reglas

- No inventes un esquema ni completes valores faltantes por conjetura; inspecciona el proyecto o pide la información necesaria.
- No uses datos de producción ni ejecutes operaciones masivas o irreversibles sin autorización explícita.
- Conserva las reglas existentes de unicidad, integridad, privacidad y retención de datos.