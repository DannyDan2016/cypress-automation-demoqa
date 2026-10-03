export class RadioButtonPage {
  // --- Elementos ---
  // Input de una opción ("Yes", "Impressive", "No"): ids yesRadio, impressiveRadio, noRadio
  radio(opcion) {
    return cy.get(`#${opcion.toLowerCase()}Radio`);
  }

  // El input está oculto por estilos: se interactúa con su label asociado
  etiqueta(opcion) {
    return cy.get(`label[for="${opcion.toLowerCase()}Radio"]`);
  }

  // Párrafo "You have selected <opción>" que aparece tras elegir una opción
  get mensajeSeleccion() {
    return cy.contains('p', 'You have selected');
  }

  // --- Acciones ---
  visitar() {
    cy.visit('/radio-button');
    // Guard de carga (sincronización, no verificación de negocio)
    cy.location('pathname').should('eq', '/radio-button');
    return this;
  }

  seleccionarOpcion(opcion) {
    this.etiqueta(opcion).click();
    return this;
  }
}
