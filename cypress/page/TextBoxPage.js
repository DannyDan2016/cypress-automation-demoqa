export class TextBoxPage {
  // --- Elementos del formulario ---
  get nombreInput() {
    return cy.get('#userName');
  }

  get emailInput() {
    return cy.get('#userEmail');
  }

  get direccionActualInput() {
    return cy.get('#currentAddress');
  }

  get direccionPermanenteInput() {
    return cy.get('#permanentAddress');
  }

  get botonEnviar() {
    return cy.get('#submit');
  }

  // --- Salida tras enviar (contenedor #output) ---
  get nombreSalida() {
    return cy.get('#output #name');
  }

  get emailSalida() {
    return cy.get('#output #email');
  }

  get direccionActualSalida() {
    return cy.get('#output #currentAddress');
  }

  get direccionPermanenteSalida() {
    return cy.get('#output #permanentAddress');
  }

  // --- Acciones ---
  visitar() {
    cy.visit('/text-box');
    // Guard de carga (sincronización, no verificación de negocio)
    cy.location('pathname').should('eq', '/text-box');
    return this;
  }

  completarFormulario({ nombre, email, direccion, direccionPermanente }) {
    this.nombreInput.clear().type(nombre);
    this.emailInput.clear().type(email);
    this.direccionActualInput.clear().type(direccion);
    this.direccionPermanenteInput.clear().type(direccionPermanente);
    return this;
  }

  enviar() {
    this.botonEnviar.click();
    return this;
  }
}
