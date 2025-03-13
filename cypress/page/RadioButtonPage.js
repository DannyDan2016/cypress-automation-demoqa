export class RadioButtonPage {
// Definimos los selectores de los elementos
elementos = {
    radioYes: 'input[id="yesRadio"]',         // Selector del radio "Yes"
    radioImpressive: 'input[id="impressiveRadio"]', // Selector del radio "Impressive"
    radioNo: 'input[id="noRadio"]',           // Selector del radio "No"
    mensajeSeleccion: ".mt-3"                 // Selector del mensaje de confirmación
};

/**
 * Visita la página de radio buttons
 */
visitar() {
    cy.log("Visitando la página de Radio Button");
    cy.visit("/radio-button");
}

/**
 * Selecciona una opción del radio button (Yes o Impressive)
 * @param {string} opcion - Nombre de la opción ("Yes", "Impressive")
 */
seleccionarOpcion(opcion) {
    cy.log(`Intentando seleccionar la opción: ${opcion}`);

    // Seleccionamos el radio button haciendo clic en el label correspondiente
    cy.get(`label[for="${opcion.toLowerCase()}Radio"]`)
        .should("be.visible")
        .click();

    // Validamos que el radio button realmente está seleccionado
    cy.get(this.elementos[`radio${opcion}`])
        .should("be.checked");
}

/**
 * Verifica que el radio button "No" esté deshabilitado
 */
verificarRadioNoDeshabilitado() {
    cy.log("Verificando que el radio button 'No' está deshabilitado");
    cy.get(this.elementos.radioNo)
        .should("be.disabled"); // Verifica que el botón está deshabilitado
}

/**
 * Verifica que el mensaje de selección sea correcto
 * @param {string} mensajeEsperado - Mensaje esperado después de seleccionar una opción
 */
verificarMensajeSeleccionado(mensajeEsperado) {
    cy.log(`Esperando que el mensaje de selección sea: "${mensajeEsperado}"`);
    cy.get(this.elementos.mensajeSeleccion, { timeout: 5000 })
        .should("be.visible")
        .and("contain", mensajeEsperado);
}
}
