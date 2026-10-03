const { defineConfig } = require('cypress');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

const { resolverAmbiente } = require('./config/ambientes');
const { crearCargadorDatos } = require('./config/datos');
const { resolverTags } = require('./config/tags');

// Carga las variables de `.env` (si existe) en process.env. Las variables ya definidas
// en el sistema o en CI tienen prioridad: dotenv no las sobrescribe.
require('dotenv').config({ quiet: true });

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
    specPattern: 'cypress/e2e/**/*.feature',
    // Resolución de escritorio: con el viewport por defecto (1000x660) la tabla de
    // Web Tables invade la columna lateral de anuncios y esta tapa sus botones.
    viewportWidth: 1920,
    viewportHeight: 1080,
    // DemoQA es un sitio público inestable (timeouts de carga intermitentes): se reintenta
    // solo en `cypress run`, nunca en modo interactivo, para no esconder fallos al depurar.
    retries: { runMode: 2, openMode: 0 },
    pageLoadTimeout: 60000,
    // Las capturas de fallos quedan junto al reporte (y en el volumen de Docker)
    screenshotsFolder: 'reports/screenshots',
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

    async setupNodeEvents(on, config) {
      const ambiente = resolverAmbiente(config);
      // BASE_URL (o la nativa CYPRESS_BASE_URL) permite apuntar puntualmente a otra URL
      config.baseUrl = process.env.BASE_URL || process.env.CYPRESS_BASE_URL || ambiente.baseUrl;
      // Valores públicos, legibles con Cypress.expose(). `tags` lo lee el preprocesador de
      // Cucumber para filtrar escenarios: hay que fijarlo ANTES de registrar el plugin.
      config.expose = { ...config.expose, TEST_ENV: ambiente.nombre, tags: resolverTags(config) };
      config.env = { ...config.env, ...secretos() };

      // Cucumber: registra before/after:run y genera los reportes HTML y JSON
      // (ver .cypress-cucumber-preprocessorrc.json). Es el único reporter de la suite.
      await addCucumberPreprocessorPlugin(on, config);
      on('file:preprocessor', createBundler({ plugins: [createEsbuildPlugin(config)] }));

      // Datos de prueba: data/comun + data/<ambiente> (YAML), leídos con cy.datos()
      const datos = crearCargadorDatos({ ambiente: ambiente.nombre });
      on('task', { datos: (consulta) => datos.obtener(consulta) });

      console.log(
        `[config] Ambiente: ${ambiente.nombre} | baseUrl: ${config.baseUrl} | tags: ${config.expose.tags}`,
      );
      return config;
    },
  },

  includeShadowDom: true,
});
