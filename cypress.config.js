const { defineConfig } = require('cypress');

module.exports = defineConfig({
  // Electron está deprecado como navegador de pruebas en Cypress 16
  defaultBrowser: 'chrome',

  e2e: {
    baseUrl: 'https://demoqa.com',
    // Resolución de escritorio: con el viewport por defecto (1000x660) la tabla de
    // Web Tables invade la columna lateral de anuncios y esta tapa sus botones.
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,
    retries: 1,
    blockHosts: ['*google.com', '*facebook.com', '*ads.com'],

    setupNodeEvents(on) {
      // El plugin registra su propio "before:run"/"after:run" (Cypress solo admite
      // un handler por evento) y vacía reportDir antes de cada ejecución.
      require('cypress-mochawesome-reporter/plugin')(on);
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
