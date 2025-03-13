export class CheckBoxPage {
constructor() {
    // Elemento para expandir la lista de checkboxes
    this.expandButton = ".rct-collapse-btn";

    // Selector de las etiquetas de checkbox
    this.checkboxLabel = ".rct-title";

    // Íconos que indican si un checkbox está marcado o desmarcado
    this.checkboxCheckIcon = ".rct-icon-check";
    this.checkboxUncheckIcon = ".rct-icon-uncheck";
}

/**
 * Expande la lista de checkboxes
 */
expandirLista() {
    cy.log("Expandiendo la lista de checkboxes...");
    cy.get(this.expandButton).click();
}

/**
 * Selecciona un checkbox basado en el nombre visible del elemento
 * @param {string} nombreElemento - Nombre visible del checkbox en la interfaz
 */
seleccionarElemento(nombreElemento) {
    cy.log(`Seleccionando checkbox: ${nombreElemento}`);
    cy.contains(this.checkboxLabel, nombreElemento).click();
}

/**
 * Verifica si un checkbox está seleccionado
 * @param {string} nombreElemento - Nombre visible del checkbox en la interfaz
 */
verificarElementoSeleccionado(nombreElemento) {
    cy.log(`Verificando que el checkbox "${nombreElemento}" esté seleccionado`);
    cy.contains(this.checkboxLabel, nombreElemento)
    .parent()
    .find(this.checkboxCheckIcon)
    .should("exist");
}

/**
 * Verifica si un checkbox está desmarcado
 * @param {string} nombreElemento - Nombre visible del checkbox en la interfaz
 */
verificarElementoDeseleccionado(nombreElemento) {
    cy.log(`Verificando que el checkbox "${nombreElemento}" esté desmarcado`);
    cy.contains(this.checkboxLabel, nombreElemento)
    .parent()
    .find(this.checkboxUncheckIcon)
    .should("exist");
}
}
  
