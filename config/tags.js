// Expresión de tags de Cucumber que se ejecuta cuando no se indica ninguna.
// Los escenarios @known-bug comprueban el comportamiento CORRECTO de un defecto real del
// sitio: fallan hasta que DemoQA lo corrija, por eso se excluyen del run por defecto.
const TAGS_POR_DEFECTO = 'not @known-bug';

/**
 * Prioridad: `--expose tags="<expresión>"` en la CLI > variable de entorno TAGS > por defecto.
 * Una cadena vacía cuenta como "sin indicar" (docker compose pasa TAGS="" si no se define).
 */
function resolverTags(config, entorno = process.env) {
  const tags = String(config.expose?.tags ?? entorno.TAGS ?? '').trim();
  return tags || TAGS_POR_DEFECTO;
}

module.exports = { TAGS_POR_DEFECTO, resolverTags };
