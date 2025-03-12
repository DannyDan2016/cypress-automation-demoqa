const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    defaultCommandTimeout: 30000,
    retries: 2,
    screenshotOnRunFailure: true,
    video: true,
    browser: "chrome",
    chromeWebSecurity: false,
    experimentalStudio: true,
    blockHosts: ["*google.com", "*facebook.com", "*ads.com"],
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on); // ✅ Integración con Cypress
      return config;
    },
  },
  env: {
    nombreReporte: "reporte-pruebas",
  },
  reporter: "cypress-mochawesome-reporter", // ✅ Se cambia al reporter adecuado
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
    inline: true, // ✅ Incluye las imágenes y videos en el HTML
    embeddedScreenshots: true, // ✅ Inserta los screenshots en el reporte
    charts: true,
    autoOpen: true, // ✅ Agrega gráficos visuales
  },
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
  includeShadowDom: true,
});






