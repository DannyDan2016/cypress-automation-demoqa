export class TextBoxPage {
  escribirNombre(nombre) {
    cy.get("#userName").type(nombre);
  }

  escribirEmail(email) {
    cy.get("#userEmail").type(email);
  }

  escribirDireccionActual(direccion) {
    cy.get("#currentAddress").type(direccion);
  }

  escribirDireccionPermanente(direccion) {
    cy.get("#permanentAddress").type(direccion);
  }

  clickEnBotonEnviar() {
    cy.get("#submit").click();
  }

  verificarNombreSalida() {
    return cy.get("#name");
  }

  verificarEmailSalida() {
    return cy.get("#email");
  }

  verificarDireccionActualSalida() {
    return cy.get('.border > #currentAddress');
  }

  verificarDireccionPermanenteSalida() {
    return cy.get('.border > #permanentAddress');
  }
}

  