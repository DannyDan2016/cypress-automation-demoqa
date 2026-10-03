# Estrategia de pruebas

Documento vivo de la suite: qué se prueba de DemoQA, por qué se eligió cada escenario, cómo se traza cada caso y qué defectos reales se encontraron.

## 1. Alcance

- **Sistema bajo prueba**: [demoqa.com](https://demoqa.com) (UI rediseñada, octubre de 2026) y su Book Store API (`/Account/v1`, `/BookStore/v1`).
- **Tipos de prueba**: E2E de UI, pruebas de API con validación de contratos y pruebas unitarias del código de configuración (cargador YAML, ambientes y tags).
- **Navegador**: Chrome (Electron está deprecado en Cypress 16).
- **Fuera de alcance**: rendimiento, accesibilidad, compatibilidad entre navegadores, Widgets e Interactions (ver §3), y el alta de usuarios por UI (reCAPTCHA v3).

## 2. Criterio de selección

La suite es una **muestra curada**, no una cobertura total. Un caso entra si cumple al menos uno de estos criterios:

1. **Riesgo**: flujos con más lógica o más propensos a romperse (formularios con validación, sesión, colecciones con datos compartidos, contratos de API).
2. **Técnica**: cada escenario demuestra una técnica distinta de automatización (stubs del navegador, control del reloj, iframes, react-select, subida de archivos, `cy.session`, JSON Schema, datos efímeros por API).
3. **Valor de regresión**: los 14 tests que ya existían se migraron y ampliaron hasta completar flujos (por ejemplo, el CRUD de Web Tables).
4. **Hallazgos**: si el inventario detecta un defecto real, se automatiza el comportamiento correcto como `@known-bug`.

Se descartan los casos de poco valor o de mucho coste frente a lo que demuestran (variantes de borde repetidas, arrastres por coordenadas, `:hover` de CSS).

## 3. Inventario y cobertura

El inventario completo (192 casos verificados contra el sitio real, con selectores, mensajes y trampas) se hizo antes de automatizar. Resumen por área:

| Área                         |   Casos | @smoke | Negativos/borde | Automatizados | Cobertura |
| ---------------------------- | ------: | -----: | --------------: | ------------: | --------: |
| NAV: home y navegación       |       6 |      2 |               2 |             0 |        0% |
| ELEM: Elements               |      49 |     10 |              20 |            20 |       41% |
| FORM: Practice Form          |      13 |      2 |               6 |             2 |       15% |
| AFW: Alerts, Frame & Windows |      19 |      5 |               6 |             9 |       47% |
| WID: Widgets                 |      31 |      9 |               9 |             0 |        0% |
| INT: Interactions            |      20 |      5 |               6 |             0 |        0% |
| BS: Book Store UI            |      24 |      5 |               9 |             2 |        8% |
| API: Book Store API          |      30 |      4 |              17 |             7 |       23% |
| **Total**                    | **192** | **42** |          **75** |        **40** |   **21%** |

En la suite: 13 features y 33 escenarios (44 ejecuciones contando los ejemplos de los esquemas): 43 en el run por defecto y 1 `@known-bug`.

Qué queda fuera y por qué:

- **Widgets e Interactions**: aportan sobre todo variantes de UI (sliders, arrastres por coordenadas, `:hover` de CSS que Cypress no activa sin CDP). La técnica más valiosa del área (control del reloj) ya está cubierta en Alerts y Dynamic Properties.
- **Navegación**: bajo riesgo; queda como siguiente paso barato.
- **Book Store UI destructivo** (Delete Account) y variantes de la API: el patrón (service objects, contratos y datos efímeros) ya está demostrado y extenderlo es mecánico.

## 4. Matriz de trazabilidad

| TC                  | Caso                                               | Feature                                         | Tags                 | Técnica                                                    |
| ------------------- | -------------------------------------------------- | ----------------------------------------------- | -------------------- | ---------------------------------------------------------- |
| TC-ELEM-001         | Text Box: envío válido muestra los 4 campos        | `elements/text-box.feature`                     | @smoke               | Esquema; entrada y salida esperada en YAML                 |
| TC-ELEM-002         | Text Box: email inválido (3 variantes)             | `elements/text-box.feature`                     | @negative            | Esquema; clase `field-error` y ausencia de salida          |
| TC-ELEM-005         | Text Box: Unicode y HTML se muestran literal       | `elements/text-box.feature`                     | @regression          | Ejemplos etiquetados por bloque                            |
| TC-ELEM-010         | Check Box: expandir la raíz muestra sus hijos      | `elements/check-box.feature`                    | @smoke               | rc-tree por roles ARIA                                     |
| TC-ELEM-011         | Check Box: marcar varios nodos                     | `elements/check-box.feature`                    | @regression          | `aria-checked`                                             |
| TC-ELEM-012         | Check Box: marcar un padre marca sus hijos         | `elements/check-box.feature`                    | @regression          | Lista esperada de `#result` en YAML                        |
| TC-ELEM-014         | Check Box: desmarcar quita la selección            | `elements/check-box.feature`                    | @negative            | Estado declarado por caso en YAML                          |
| TC-ELEM-020         | Radio Button: opción habilitada muestra su mensaje | `elements/radio-button.feature`                 | @smoke               | Esquema                                                    |
| TC-ELEM-021         | Radio Button: "No" está deshabilitada              | `elements/radio-button.feature`                 | @negative            |                                                            |
| TC-ELEM-031         | Web Tables: alta                                   | `elements/web-tables.feature`                   | @smoke               | Mapa de campos → selector; celdas esperadas en YAML        |
| TC-ELEM-035         | Web Tables: edición                                | `elements/web-tables.feature`                   | @regression          | Override parcial de un registro semilla                    |
| TC-ELEM-036         | Web Tables: borrado                                | `elements/web-tables.feature`                   | @regression          |                                                            |
| TC-ELEM-037         | Web Tables: búsqueda                               | `elements/web-tables.feature`                   | @regression          |                                                            |
| TC-ELEM-050         | Buttons: doble clic                                | `elements/buttons.feature`                      | @smoke               | Esquema con un bloque de Ejemplos por TC                   |
| TC-ELEM-051         | Buttons: clic derecho                              | `elements/buttons.feature`                      | @regression          | `rightclick`                                               |
| TC-ELEM-052         | Buttons: clic dinámico                             | `elements/buttons.feature`                      | @regression          | Botón con id aleatorio localizado por texto exacto         |
| TC-ELEM-090         | Dynamic Properties: estado inicial                 | `elements/dynamic-properties.feature`           | @regression          | `cy.clock()` antes de visitar                              |
| TC-ELEM-091/092/093 | Dynamic Properties: cambios a los 5 s              | `elements/dynamic-properties.feature`           | @smoke               | `cy.tick(5000)` sin esperas reales                         |
| TC-FORM-001         | Practice Form: envío completo y modal              | `forms/practice-form.feature`                   | @smoke               | react-select, datepicker, `selectFile`, tabla Label/Values |
| TC-FORM-003         | Practice Form: obligatorios                        | `forms/practice-form.feature`                   | @negative            | `was-validated` + `validity` HTML5                         |
| TC-AFW-001          | Browser Windows: New Tab abre `/sample`            | `alerts-frames-windows/browser-windows.feature` | @regression          | Stub de `window.open`                                      |
| TC-AFW-002          | Browser Windows: New Window abre `/sample`         | `alerts-frames-windows/browser-windows.feature` | @smoke               | Stub de `window.open` + visita de la ruta pedida           |
| TC-AFW-010          | Alerts: alerta simple                              | `alerts-frames-windows/alerts.feature`          | @smoke               | `cy.on('window:alert')` con stub                           |
| TC-AFW-011          | Alerts: alerta a los 5 s                           | `alerts-frames-windows/alerts.feature`          | @regression          | `cy.clock`/`cy.tick`: no aparece antes y sí al cumplirse   |
| TC-AFW-012          | Alerts: confirm aceptado                           | `alerts-frames-windows/alerts.feature`          | @regression          | Stub de `window:confirm`                                   |
| TC-AFW-013          | Alerts: confirm cancelado                          | `alerts-frames-windows/alerts.feature`          | @negative            | Stub que devuelve `false`                                  |
| TC-AFW-014          | Alerts: prompt con nombre                          | `alerts-frames-windows/alerts.feature`          | @regression          | `cy.stub(win, 'prompt')`                                   |
| TC-AFW-020          | Frames: frame grande                               | `alerts-frames-windows/frames.feature`          | @smoke               | `cy.iframeBody`                                            |
| TC-AFW-021          | Frames: frame pequeño                              | `alerts-frames-windows/frames.feature`          | @regression          | `cy.iframeBody`                                            |
| TC-API-004          | Crear usuario                                      | `bookstore-api/cuenta.feature`                  | @smoke               | Contrato `usuario-creado` (ajv)                            |
| TC-API-005          | Contraseña débil (4 variantes)                     | `bookstore-api/cuenta.feature`                  | @negative            | Esquema; 400/1300 y contrato `mensaje`                     |
| TC-API-008          | Generar token                                      | `bookstore-api/cuenta.feature`                  | @smoke               | Contrato `token`                                           |
| TC-API-009          | Token con contraseña errónea debe dar 401          | `bookstore-api/cuenta.feature`                  | @negative @known-bug | Comportamiento correcto de un defecto real                 |
| TC-API-017          | Añadir libro a la colección                        | `bookstore-api/coleccion.feature`               | @smoke               | Contratos `libros-anadidos` y `usuario`                    |
| TC-API-022          | Borrar libro de la colección                       | `bookstore-api/coleccion.feature`               | @regression          | Verificación posterior por GET                             |
| TC-API-026          | Borrar usuario; consultarlo da 401/1207            | `bookstore-api/cuenta.feature`                  | @regression          | Datos efímeros                                             |
| TC-BS-014           | Perfil con la colección preparada por API          | `bookstore-ui/perfil.feature`                   | @smoke               | Login por API + `cy.session` con cookies                   |
| TC-BS-017           | Borrar libro desde el perfil                       | `bookstore-ui/perfil.feature`                   | @regression          | Modal + alert stub + verificación cruzada por API          |

Para ejecutar un caso concreto: `npx cypress run --browser chrome --expose "tags=@tc-api-005"`.

## 5. Datos de prueba

- **Entradas y valores esperados en YAML** (`data/comun/**`, con overrides en `data/<ambiente>/**`). Los `.feature` solo nombran claves; los textos de la UI van literales, con sus erratas ("Permananet Address").
- **Datos efímeros**: los usuarios del Book Store se crean con nombre único (`qa_cy_<timestamp>_<aleatorio>`) y un hook `After` los borra por API. Verificado: tras una ejecución, los usuarios creados responden `404 User not found!`.
- Las contraseñas del YAML son de esos usuarios efímeros, no secretos. La suite no necesita credenciales.

## 6. Defectos y observaciones encontrados

| #   | Hallazgo                                                                                                                               | Severidad        | Evidencia                                                         | En la suite                                     |
| --- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| 1   | `POST /Account/v1/GenerateToken` con contraseña errónea responde **200** con `token: null` y `status: "Failed"` en lugar de **401**    | Media            | Ejecución del 2026-10-01: `expected 200 to equal 401`             | TC-API-009 `@known-bug`                         |
| 2   | El **JWT** que emite `GenerateToken` lleva la contraseña en claro en el payload (`{"userName": "...", "password": "...", "iat": ...}`) | Alta (seguridad) | Payload decodificado del token de un usuario temporal, 2026-10-01 | Documentado                                     |
| 3   | `POST /Account/v1/Login` (el que usa la UI) devuelve el campo `password` en claro y no aparece en Swagger                              | Alta (seguridad) | Respuesta del 2026-10-01                                          | Documentado                                     |
| 4   | Text Box rechaza emails con alias `+` (`juan.perez+qa@example.com`), válidos según RFC 5322                                            | Baja             | Sin salida y campo marcado como inválido                          | Documentado; el override de `qa` usa otro email |
| 5   | En /broken, la imagen "válida" (`/images/Toolsqa.jpg`) también está rota (`naturalWidth = 0`)                                          | Baja             | Inventario                                                        | Fuera de la muestra                             |
| 6   | Web Tables: la ordenación por columna ya no funciona y con 0 resultados muestra "Page 1 of 0"                                          | Baja             | Inventario                                                        | Fuera de la muestra                             |
| 7   | Erratas de UI: "Permananet Address", "staus", "Voilet", "Prevent Propogation", "Dragabble", "Accordian"                                | Cosmética        | Inventario                                                        | Literales en el YAML                            |

**Falso positivo descartado**: el inventario señalaba que New Tab abría `https://demoqa.com/null`. Al verificarlo, el bundle de la app hace `window.open("/sample")`, el stub de Cypress recibe `"/sample"` y con Playwright (Chrome real, sin interceptar `window.open`) se abre `/sample` en 4 de 4 intentos. El `/null` lo provocaba el wrapper de `window.open` de la sonda. TC-AFW-001 es hoy un escenario normal en verde.

## 7. Estabilidad

- DemoQA tiene cargas lentas e intermitentes. Mitigaciones: `retries` solo en `cypress run` (2), `pageLoadTimeout` de 60 s, bloqueo de anuncios y analítica, y regresión nocturna separada del smoke de los PR.
- Sin esperas fijas: aserciones web-first, stubs y `cy.clock`. ESLint trata `cypress/no-unnecessary-waiting` como error.
- Cada escenario es independiente: navega por su cuenta, crea sus datos y los limpia.
