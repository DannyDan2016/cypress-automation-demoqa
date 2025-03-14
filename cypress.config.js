const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    defaultCommandTimeout: 30000,
    retries: 1,
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 32, // Reduce el tamaño del video
    videoUploadOnPasses: true, // Guarda el video aunque la prueba pase
    browser: "chrome",
    chromeWebSecurity: false,
    experimentalStudio: true,
    experimentalSessionAndOrigin: true, // Habilita el acceso entre diferentes orígenes
    blockHosts: ["*google.com", "*facebook.com", "*ads.com"],
    
    // Borra screenshots y videos antes de cada ejecución
    setupNodeEvents(on, config) {
      on("before:run", () => {
        const screenshotsPath = "cypress/reports/screenshots";
        const videosPath = "cypress/reports/videos";

        if (fs.existsSync(screenshotsPath)) {
          fs.rmSync(screenshotsPath, { recursive: true, force: true });
          console.log("Screenshots eliminados antes de la ejecución");
        }

        if (fs.existsSync(videosPath)) {
          fs.rmSync(videosPath, { recursive: true, force: true });
          console.log("Videos eliminados antes de la ejecución");
        }
      });

      require("cypress-mochawesome-reporter/plugin")(on); // Integración con Mochawesome
      return config;
    },
  },

  env: {
    nombreReporte: "reporte-pruebas",
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true, // Ahora sobrescribe los reportes anteriores
    html: true,
    json: true,
    inline: true, // Inserta imágenes y videos en el reporte
    embeddedScreenshots: true, // Inserta screenshots en el reporte
    charts: true,
    autoOpen: true, // Agrega gráficos visuales
  },

  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
  includeShadowDom: true,
});







