class DynamicPropertiesPage {
    visitar() {
    cy.visit('/dynamic-properties');
    }
    esperarBotonHabilitado() {
    cy.get('#enableAfter').should('be.enabled');
    }
    verificarCambioDeColor() {
    cy.get('#colorChange').should('have.class', 'text-danger');
    }
}
export default new DynamicPropertiesPage();