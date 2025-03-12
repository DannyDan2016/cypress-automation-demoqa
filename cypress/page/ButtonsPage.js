class ButtonsPage {
    visitar() {
    cy.visit('/buttons');
    }
    hacerDobleClick() {
    cy.get('#doubleClickBtn').dblclick();
    }
    hacerClickDerecho() {
    cy.get('#rightClickBtn').rightclick();
    }
    hacerClickSimple() {
    cy.contains('button', 'Click Me').click();
    }
}
export default new ButtonsPage();