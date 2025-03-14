const { defineConfig } = require("cypress");
const fs = require("fs");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://demoqa.com",
    defaultCommandTimeout: 30000,
    retries: 1,
    browser: "chrome",
    chromeWebSecurity: false,
    experimentalStudio: true,
    blockHosts: ["*google.com", "*facebook.com", "*ads.com"],

    // Desactiva la eliminación de assets antes de correr pruebas para evitar errores de archivos bloqueados
    trashAssetsBeforeRuns: false,

    setupNodeEvents(on, config) {
      on("before:run", () => {
        const reportsPath = "cypress/reports";
        const screenshotsPath = "cypress/reports/screenshots";
        const videosPath = "cypress/reports/videos";

        try {
          if (fs.existsSync(reportsPath)) {
            fs.rmSync(reportsPath, { recursive: true, force: true });
            console.log("Carpeta 'reports' eliminada antes de la ejecución.");
          }
          if (fs.existsSync(screenshotsPath)) {
            fs.rmSync(screenshotsPath, { recursive: true, force: true });
            console.log("Screenshots eliminados antes de la ejecución.");
          }
          if (fs.existsSync(videosPath)) {
            fs.rmSync(videosPath, { recursive: true, force: true });
            console.log("Videos eliminados antes de la ejecución.");
          }
        } catch (error) {
          console.warn(`No se pudo eliminar la carpeta de reportes: ${error.message}`);
        }
      });

      require("cypress-mochawesome-reporter/plugin")(on);
    },
  },

  env: {
    nombreReporte: "reporte-pruebas",
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false, // No sobrescribir para evitar el error EBUSY
    html: true,
    json: true,
    inline: true, // Inserta imágenes y videos en el reporte
    embeddedScreenshots: true, // Inserta screenshots en el reporte
    charts: true,
    autoOpen: true, // Abre el reporte automáticamente
  },

  trashAssetsBeforeRuns: false, // Evita la eliminación automática de reportes
  screenshotsFolder: "cypress/reports/screenshots",
  videosFolder: "cypress/reports/videos",
  includeShadowDom: true,
});