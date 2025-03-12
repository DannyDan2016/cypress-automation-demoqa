class CheckBoxPage {
    visitar() {
    cy.visit('/checkbox');
    }
    expandirLista() {
    cy.get('.rct-collapse-btn').first().click();
    }
    seleccionarElemento(nombre) {
    cy.get('.rct-title').contains(nombre).click();
    }
}
export default new CheckBoxPage();