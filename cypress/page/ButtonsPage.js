export class ButtonsPage {
constructor() {
    // Selectores de los botones
    this.doubleClickButton = "#doubleClickBtn"; // Botón para doble clic
    this.rightClickButton = "#rightClickBtn"; // Botón para clic derecho
    this.singleClickText = "Click Me"; // Usamos el texto del botón en lugar del selector dinámico

    // Selectores de los mensajes de confirmación
    this.doubleClickMessage = "#doubleClickMessage";
    this.rightClickMessage = "#rightClickMessage";
    this.singleClickMessage = "#dynamicClickMessage";
}

// Navegar a la página de botones
visitarPagina() {
    cy.visit("/buttons");
}

// Métodos de acción sobre los botones
hacerDobleClick() {
    cy.get(this.doubleClickButton).should("be.visible").dblclick();
}

hacerClickDerecho() {
    cy.get(this.rightClickButton).should("be.visible").rightclick();
}

hacerClickUnico() {
    cy.get("button").contains(/^Click Me$/).should("be.visible").click();
}

// Método para verificar mensajes de éxito después del clic
verificarMensaje(mensaje) {
    cy.get(mensaje, { timeout: 10000 }).should("be.visible");
}
}

