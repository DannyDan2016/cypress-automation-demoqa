class BrowserWindowsPage {
    visitar() {
    cy.visit('/browser-windows');
    }
    abrirNuevaPestana() {
    cy.get('#tabButton').click();
    }
    abrirNuevaVentana() {
    cy.get('#windowButton').click();
    }
}
export default new BrowserWindowsPage();