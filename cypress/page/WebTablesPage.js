class WebTablesPage {
    visitar() {
    cy.visit('/webtables');
    }
    agregarNuevoRegistro() {
    cy.get('#addNewRecordButton').click();
    }
    llenarFormulario(datos) {
    Object.entries(datos).forEach(([campo, valor]) => {
        cy.get(`#${campo}`).type(valor);
    });
    }
    guardarRegistro() {
    cy.get('#submit').click();
    }
}
export default WebTablesPage();
