class PaginaPrincipal {
    visitar() {
    cy.visit('/');
    }
    irAFormularioTexto() {
    cy.get('span').contains('Text Box').click();
    }
    irACheckbox() {
    cy.get('span').contains('Check Box').click();
    }
    irARadioButton() {
    cy.get('span').contains('Radio Button').click();
    }
}
export default new PaginaPrincipal();