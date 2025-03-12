class AutomationPracticeFormPage {
    visitar() {
    cy.visit('/automation-practice-form');
    }
    llenarFormulario(datos) {
    Object.entries(datos).forEach(([campo, valor]) => {
        cy.get(`[name="${campo}"]`).type(valor);
    });
    }
    enviarFormulario() {
    cy.get('#submit').click();
    }
}
export default new AutomationPracticeFormPage();