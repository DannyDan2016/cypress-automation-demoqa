export class ButtonsPage {
  // --- Botones ---
  get botonDobleClick() {
    return cy.get('#doubleClickBtn');
  }

  get botonClickDerecho() {
    return cy.get('#rightClickBtn');
  }

  // El botón "Click Me" tiene un id aleatorio en cada carga: se localiza por su texto exacto
  get botonClickDinamico() {
    return cy.contains('button', /^Click Me$/);
  }

  // --- Mensajes de confirmación ---
  get mensajeDobleClick() {
    return cy.get('#doubleClickMessage');
  }

  get mensajeClickDerecho() {
    return cy.get('#rightClickMessage');
  }

  get mensajeClickDinamico() {
    return cy.get('#dynamicClickMessage');
  }

  // --- Acciones ---
  visitar() {
    cy.visit('/buttons');
    // Guard de carga (sincronización, no verificación de negocio)
    cy.location('pathname').should('eq', '/buttons');
    return this;
  }

  hacerDobleClick() {
    this.botonDobleClick.dblclick();
    return this;
  }

  hacerClickDerecho() {
    this.botonClickDerecho.rightclick();
    return this;
  }

  hacerClickUnico() {
    this.botonClickDinamico.click();
    return this;
  }
}
