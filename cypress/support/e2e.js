// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

Cypress.on("uncaught:exception", (err, runnable) => {
  console.warn("Error capturado:", err.message);
  return false; // 🔥 Ignorar errores de scripts externos
});

beforeEach(() => {
  cy.intercept("GET", "**/*", (req) => {
    if (req.url.includes("ads") || req.url.includes("tracking")) {
      req.destroy(); // ❌ Bloquea scripts de rastreo
    }
  }).as("blockExternalScripts");
});


  
import './commands'
import "cypress-mochawesome-reporter/register";

