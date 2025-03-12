## 🚀 Proyecto de Automatización de Pruebas con Cypress-JavaScript-POM y MochaAwesome

## 📌 Descripción del Proyecto

Este proyecto tiene como objetivo la automatización de pruebas funcionales en la web DemoQA utilizando Cypress como framework de pruebas, junto con MochaAwesome para la generación de reportes detallados con capturas de pantalla y videos.

La automatización sigue el patrón Page Object Model (POM), lo que mejora la reutilización del código y facilita el mantenimiento de las pruebas.

📂 Estructura del Proyecto

El proyecto sigue una estructura bien definida para organizar los scripts de prueba, las páginas y los reportes:

📦 cypress-automation-demoqa
│
├── 📁 cypress
│   ├── 📁 e2e
│   │   ├── 📁 testCases
│   │   │   ├── textBoxTest.cy.js  # Prueba para la página Text Box
│   │   │   ├── ... # Otras pruebas
│   │
│   ├── 📁 page
│   │   ├── textBoxPage.js  # POM para Text Box
│   │   ├── checkBoxPage.js  # POM para Check Box
│   │   ├── radioButtonPage.js  # POM para Radio Button
│   │   ├── webTablesPage.js  # POM para Web Tables
│   │   ├── buttonsPage.js  # POM para Botones
│   │   ├── linksPage.js  # POM para Links
│   │   ├── ... # Más páginas de la aplicación
│   │
│   ├── 📁 fixture
│   │   ├── datosPrueba.json  # Datos de prueba para cada test
│   │
│   ├── 📁 support
│   │   ├── commands.js  # Comandos personalizados de Cypress
│   │   ├── e2e.js  # Configuración de hooks globales
│   │
│   ├── 📁 screenshots  # Capturas de pantalla de fallos
│   │
│   ├── 📁 videos  # Grabaciones de pruebas ejecutadas
│   │
│   ├── 📁 reports  # Reportes generados con MochaAwesome
│   │   ├── mochawesome.json
│   │   ├── mochawesome-report  # Carpeta con el HTML del reporte
│   │
│   ├── cypress.config.js  # Configuración de Cypress
│
├── package.json  # Dependencias del proyecto
├── README.md  # Documentación del proyecto

🛠️ Herramientas Utilizadas

Herramienta

Descripción

Cypress

Framework de pruebas para aplicaciones web

Mocha

Framework de pruebas en JavaScript

Chai

Librería de aserciones para pruebas

MochaAwesome

Generador de reportes detallados en HTML

⚙️ Configuración y Ejecución del Proyecto

📌 Requisitos Previos

Tener Node.js instalado (versión 16 o superior).

Tener Cypress instalado en el proyecto.

Tener Google Chrome o Microsoft Edge como navegadores compatibles.

📌 Instalación

Clonar el repositorio y ejecutar los siguientes comandos:

# Instalar dependencias del proyecto
npm install

## 📌 Configuración de Cypress

El archivo cypress.config.js contiene la configuración del entorno de prueba. Algunos parámetros clave:

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
      require("mochawesome/register");
    }
  },
  env: {
    nombreReporte: "reporte-pruebas",
  },
  includeShadowDom: true
});

## 📌 Ejecución de las Pruebas

Ejecutar las pruebas en modo interactivo:

npx cypress open

Ejecutar las pruebas en modo headless:

npx cypress run

Ejecutar las pruebas y generar el reporte con MochaAwesome:

npx cypress run --reporter mochawesome


## 📊 Reportes de Pruebas

Los reportes de pruebas se generan en la carpeta cypress/reports/mochawesome-report/ y se pueden visualizar en un navegador.

📌 Ver el Reporte

Abrir el archivo HTML generado:

open cypress/reports/mochawesome-report/mochawesome.html

El reporte incluirá:
✔ Capturas de pantalla en cada paso ejecutado.
✔ Videos de las pruebas en ejecución.
✔ Detalles de pruebas exitosas y fallidas.

## 📌 Buenas Prácticas Implementadas

✅ Uso del patrón Page Object Model (POM) para mejorar la mantenibilidad.
✅ Separación de datos de prueba con archivos JSON en fixture.
✅ Configuración de MochaAwesome para reportes detallados.
✅ Uso de cy.wait(1000) en cada interacción para mejorar la claridad en videos y screenshots.
✅ Configuración de reintentos (retries: 2) en caso de fallos intermitentes.

## 📌 Próximas Mejoras

🔹 Implementación de pruebas para más módulos de la web DemoQA.
🔹 Integración con Jenkins para ejecución continua.
🔹 Automatización con Docker para ejecución en contenedores.
🔹 Generación de reportes en Allure Report como alternativa visual.

## 📩 Contacto

Si tienes dudas o sugerencias sobre este proyecto, no dudes en contactarme. 🚀