export class CheckBoxPage {
constructor() {
    // DemoQA usa ahora rc-tree: el primer "switcher" expande el nodo raíz (Home)
    this.expandButton = ".rc-tree-switcher";

    // Casilla de un nodo, identificada por su aria-label accesible ("Select <nombre>").
    // Ojo: hacer clic en el título solo resalta el nodo, no lo marca.
    this.checkbox = (nombreElemento) =>
        `.rc-tree-checkbox[role="checkbox"][aria-label="Select ${nombreElemento}"]`;
}

/**
 * Expande la lista de checkboxes
 */
expandirLista() {
    cy.log("Expandiendo la lista de checkboxes...");
    cy.get(this.expandButton).first().click();
}

/**
 * Selecciona un checkbox basado en el nombre visible del elemento
 * @param {string} nombreElemento - Nombre visible del checkbox en la interfaz
 */
seleccionarElemento(nombreElemento) {
    cy.log(`Seleccionando checkbox: ${nombreElemento}`);
    cy.get(this.checkbox(nombreElemento)).click();
}

/**
 * Verifica si un checkbox está seleccionado
 * @param {string} nombreElemento - Nombre visible del checkbox en la interfaz
 */
verificarElementoSeleccionado(nombreElemento) {
    cy.log(`Verificando que el checkbox "${nombreElemento}" esté seleccionado`);
    cy.get(this.checkbox(nombreElemento)).should("have.attr", "aria-checked", "true");
}

/**
 * Verifica si un checkbox está desmarcado
 * @param {string} nombreElemento - Nombre visible del checkbox en la interfaz
 */
verificarElementoDeseleccionado(nombreElemento) {
    cy.log(`Verificando que el checkbox "${nombreElemento}" esté desmarcado`);
    cy.get(this.checkbox(nombreElemento)).should("have.attr", "aria-checked", "false");
}
}
  
