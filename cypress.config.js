const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    // Resolución de escritorio: con el viewport por defecto (1000x660) la tabla de
    // Web Tables invade la columna lateral de anuncios y esta tapa sus botones.
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 30000,
    retries: 1,
    browser: "chrome",
    chromeWebSecurity: false,
    experimentalStudio: true,
    blockHosts: ["*google.com", "*facebook.com", "*ads.com"],

    setupNodeEvents(on, config) {
      // El plugin registra su propio "before:run"/"after:run" (Cypress solo admite
      // un handler por evento). Con overwrite por defecto, el "before:run" del plugin
      // vacía reportDir antes de cada ejecución, así que no hace falta limpiarlo a mano.
      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },

  env: {
    nombreReporte: "reporte-pruebas",
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    html: true,
    json: true,
    inline: true, // Inserta imágenes y videos en el reporte
    embeddedScreenshots: true, // Inserta screenshots en el reporte
    charts: true,
    autoOpen: false, // No abrir el navegador al terminar (rompe ejecuciones en CI)
  },

  trashAssetsBeforeRuns: false, // La limpieza de cypress/reports la hace el plugin del reporter
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
  includeShadowDom: true,
});