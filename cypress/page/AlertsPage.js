class AlertsPage {
    visitar() {
    cy.visit('/alerts');
    }
    activarAlerta() {
    cy.get('#alertButton').click();
    }
    aceptarAlertaTiempo() {
    cy.get('#timerAlertButton').click();
    }
}
export default new AlertsPage();