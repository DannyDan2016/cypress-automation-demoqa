const { defineConfig } = require('cypress');

// Carga las variables de `.env` (si existe) en process.env. Las variables ya definidas
// en el sistema o en CI tienen prioridad: dotenv no las sobrescribe.
require('dotenv').config({ quiet: true });

// Ambientes disponibles. DemoQA solo tiene un ambiente público, así que los tres apuntan
// a la misma URL: la estructura es demostrativa y está lista para URLs reales.
const AMBIENTES = {
  dev: { baseUrl: 'https://demoqa.com' },
  qa: { baseUrl: 'https://demoqa.com' },
  prod: { baseUrl: 'https://demoqa.com' },
};
const AMBIENTE_POR_DEFECTO = 'prod';

/**
 * Resuelve el ambiente con esta prioridad:
 * 1. `--expose TEST_ENV=<ambiente>` en la CLI (lo usan los scripts npm; es multiplataforma).
 * 2. `TEST_ENV` en el entorno o en `.env`.
 * 3. `prod` por defecto.
 */
function resolverAmbiente(config) {
  const nombre = String(
    config.expose?.TEST_ENV ?? process.env.TEST_ENV ?? AMBIENTE_POR_DEFECTO,
  ).toLowerCase();

  if (!AMBIENTES[nombre]) {
    throw new Error(
      `TEST_ENV="${nombre}" no es válido. Usa uno de: ${Object.keys(AMBIENTES).join(', ')}.`,
    );
  }
  return { nombre, ...AMBIENTES[nombre] };
}

// Secretos: van en `env` y desde los tests solo se leen con `cy.env([...])`
// (no se exponen al navegador). Solo se incluyen los que estén definidos.
function secretos() {
  const valores = { bookUser: process.env.BOOK_USER, bookPass: process.env.BOOK_PASS };
  return Object.fromEntries(Object.entries(valores).filter(([, valor]) => valor));
}

module.exports = defineConfig({
  // Electron está deprecado como navegador de pruebas en Cypress 16
  defaultBrowser: 'chrome',

  e2e: {
    // Resolución de escritorio: con el viewport por defecto (1000x660) la tabla de
    // Web Tables invade la columna lateral de anuncios y esta tapa sus botones.
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: 1,
    // Bloquea analítica y anuncios de terceros: no forman parte de la app y la ralentizan.
    // Ojo: '*google.com' no cubría googletagmanager.com (no termina en google.com).
    blockHosts: [
      '*googletagmanager.com',
      '*google-analytics.com',
      '*googlesyndication.com',
      '*doubleclick.net',
      '*adservice.google.com',
      '*facebook.com',
    ],

    setupNodeEvents(on, config) {
      // El plugin registra su propio "before:run"/"after:run" (Cypress solo admite
      // un handler por evento) y vacía reportDir antes de cada ejecución.
      require('cypress-mochawesome-reporter/plugin')(on);

      const ambiente = resolverAmbiente(config);
      // BASE_URL (o la nativa CYPRESS_BASE_URL) permite apuntar puntualmente a otra URL
      config.baseUrl = process.env.BASE_URL || process.env.CYPRESS_BASE_URL || ambiente.baseUrl;
      // Valores públicos: legibles en los tests con Cypress.expose('TEST_ENV')
      config.expose = { ...config.expose, TEST_ENV: ambiente.nombre };
      config.env = { ...config.env, ...secretos() };

      console.log(`[config] Ambiente: ${ambiente.nombre} | baseUrl: ${config.baseUrl}`);
      return config;
    },
  },

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports/mochawesome',
    reportPageTitle: 'DemoQA - Pruebas E2E con Cypress',
    charts: true,
    embeddedScreenshots: true, // Incrusta las capturas en el HTML
    inlineAssets: true, // Genera un único HTML autocontenido
    autoOpen: false, // No abrir el navegador al terminar (rompe ejecuciones en CI)
  },

  includeShadowDom: true,
});
