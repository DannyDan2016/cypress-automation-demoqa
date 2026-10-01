// Dobles de prueba para APIs del navegador que Cypress no puede automatizar de forma nativa
// (diálogos y ventanas nuevas). Cada helper crea un stub con alias para verificarlo después
// con cy.get('@alias'). Deben registrarse ANTES de la acción que dispara el diálogo.

/** window.alert → alias @alert */
export function stubAlert() {
  const stub = cy.stub().as('alert');
  cy.on('window:alert', stub);
}

/** window.confirm → alias @confirm; responde `accept` (true = Aceptar, false = Cancelar) */
export function stubConfirm(accept) {
  const stub = cy.stub().as('confirm').returns(accept);
  cy.on('window:confirm', stub);
}

/** window.prompt → alias @prompt; responde `answer` (null = Cancelar) */
export function stubPrompt(answer) {
  cy.window().then((win) => {
    cy.stub(win, 'prompt').as('prompt').returns(answer);
  });
}

/** window.open → alias @windowOpen; evita abrir pestañas o ventanas que Cypress no controla */
export function stubWindowOpen() {
  cy.window().then((win) => {
    cy.stub(win, 'open').as('windowOpen');
  });
}

/** Ruta (pathname) de la URL que se pasó a window.open, resuelta contra la página actual. */
export function openedPath() {
  return cy.get('@windowOpen').then((stub) => {
    const [url] = stub.lastCall?.args ?? [];
    return cy.location('href').then((href) => new URL(String(url), href).pathname);
  });
}
