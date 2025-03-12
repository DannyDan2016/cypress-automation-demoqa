class AccordianPage {
    visitar() {
    cy.visit('/accordian');
    }
    expandirSeccion(seccion) {
    cy.contains('.card-header', seccion).click();
    }
}
export default new AccordianPage();