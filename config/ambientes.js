// Ambientes disponibles. DemoQA solo tiene un ambiente público, así que todos apuntan a la
// misma URL: la estructura es demostrativa y está lista para URLs reales. `staging` es un
// ejemplo de ambiente con datos propios (ver data/staging/).
const AMBIENTES = {
  dev: { baseUrl: 'https://demoqa.com' },
  qa: { baseUrl: 'https://demoqa.com' },
  staging: { baseUrl: 'https://demoqa.com' },
  prod: { baseUrl: 'https://demoqa.com' },
};
const AMBIENTE_POR_DEFECTO = 'prod';

/**
 * Resuelve el ambiente con esta prioridad:
 * 1. `--expose TEST_ENV=<ambiente>` en la CLI (lo usan los scripts npm; es multiplataforma).
 * 2. `TEST_ENV` en el entorno o en `.env`.
 * 3. `prod` por defecto.
 */
function resolverAmbiente(config, entorno = process.env) {
  const nombre = String(
    config.expose?.TEST_ENV || entorno.TEST_ENV || AMBIENTE_POR_DEFECTO,
  ).toLowerCase();

  if (!AMBIENTES[nombre]) {
    throw new Error(
      `TEST_ENV="${nombre}" no es válido. Usa uno de: ${Object.keys(AMBIENTES).join(', ')}.`,
    );
  }
  return { nombre, ...AMBIENTES[nombre] };
}

module.exports = { AMBIENTES, AMBIENTE_POR_DEFECTO, resolverAmbiente };
