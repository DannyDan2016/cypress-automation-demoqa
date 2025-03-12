class RadioButtonPage {
    visitar() {
    cy.visit('/radio-button');
    }
    seleccionarOpcion(opcion) {
    cy.contains('label', opcion).click();
    }
}
export default new RadioButtonPage();