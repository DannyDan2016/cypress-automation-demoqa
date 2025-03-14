export class TextBoxPage {
  constructor() {
    this.selectors = {
      nombreInput: "#userName",
      emailInput: "#userEmail",
      direccionActualInput: "#currentAddress",
      direccionPermanenteInput: "#permanentAddress",
      botonEnviar: "#submit",
      nombreSalida: "#name",
      emailSalida: "#email",
      direccionActualSalida: ".border > #currentAddress",
      direccionPermanenteSalida: ".border > #permanentAddress"
    };
  }

  escribirNombre(nombre) {
    cy.get(this.selectors.nombreInput).type(nombre);
  }

  escribirEmail(email) {
    cy.get(this.selectors.emailInput).type(email);
  }

  escribirDireccionActual(direccion) {
    cy.get(this.selectors.direccionActualInput).type(direccion);
  }

  escribirDireccionPermanente(direccion) {
    cy.get(this.selectors.direccionPermanenteInput).type(direccion);
  }

  clickEnBotonEnviar() {
    cy.get(this.selectors.botonEnviar).click();
  }

  verificarNombreSalida() {
    return cy.get(this.selectors.nombreSalida);
  }

  verificarEmailSalida() {
    return cy.get(this.selectors.emailSalida);
  }

  verificarDireccionActualSalida() {
    return cy.get(this.selectors.direccionActualSalida);
  }

  verificarDireccionPermanenteSalida() {
    return cy.get(this.selectors.direccionPermanenteSalida);
  }
}