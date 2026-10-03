# Cómo contribuir

## Flujo

1. Crea una rama desde `main`: `tipo/descripcion-kebab` (`feat`, `fix`, `test`, `refactor`, `ci`, `build`, `docs`, `chore`).
2. Commits atómicos con [Conventional Commits](https://www.conventionalcommits.org/es/): tipo en inglés y descripción en español, por ejemplo `test(alerts): cubre el prompt con cadena vacía`.
3. Antes de abrir el PR: `npm run lint`, `npm run test:unit` y la suite afectada (`npx cypress run --browser chrome --expose "tags=@tc-afw-014"`).
4. Rellena la plantilla del PR.

## Añadir un escenario

1. Busca el caso en el inventario ([estrategia](docs/estrategia-de-pruebas.md)) y usa su ID.
2. Escribe el escenario en `cypress/e2e/features/<area>/<pagina>.feature`, en español (`# language: es`), de forma declarativa y referenciando **claves** de datos, nunca valores.
3. Añade entradas y valores esperados en `data/comun/<area>/<pagina>.yaml`. Si un ambiente necesita otro valor, crea `data/<ambiente>/<area>/<pagina>.yaml` solo con lo que cambia.
4. Implementa los steps en `cypress/support/step_definitions/<area>/` (delgados: leen datos, llaman al page object y verifican).
5. Si hace falta, amplía el page object en `cypress/support/pages/<area>/` y regístralo en `pages/index.js`.

## Convenciones

- **Page objects** (código en inglés): heredan de `BasePage`, conocen su ruta y exponen solo locators y acciones. Las verificaciones van en los steps.
- **Selectores**: ids, roles o atributos estables. Nada de `react-select-N-*`, ids aleatorios ni `.first()` sin acotar.
- **Steps**: sin selectores, URLs ni literales de negocio. Usa los helpers de `support/helpers/` para aserciones y stubs.
- **Esperas**: prohibido `cy.wait(ms)`. Usa aserciones web-first, `cy.intercept` con alias o `cy.clock`/`cy.tick`.
- **YAML**: claves en español; textos de la UI literales (con sus erratas). Pon entre comillas los valores con `#`, `:` o que empiecen por `@`, `*`, `&` o `'`: un ` #` sin comillas inicia un comentario y corta el valor.
- **API**: rutas y cabeceras en los service objects de `support/api/`; cada respuesta nueva necesita su esquema en `support/api/schemas/`.
- **Datos del Book Store**: nunca un usuario fijo; usa los steps de usuario temporal, que crean y borran por API.

## Tags

Cada escenario necesita `@smoke` o `@regression` (las features ya llevan `@regression`) y su `@tc-<area>-NNN`. Añade `@negative` en casos de error y `@known-bug` cuando el escenario compruebe el comportamiento correcto de un defecto real (explica el defecto en un comentario encima). `npm run lint:features` rechaza cualquier otro tag; si necesitas uno nuevo, decláralo en `scripts/validar-tags.js` y documéntalo en el README.
