export class CheckBoxPage {
  // --- Elementos ---
  // DemoQA usa rc-tree: el primer "switcher" expande el nodo raíz (Home)
  get botonExpandirRaiz() {
    return cy.get('.rc-tree-switcher').first();
  }

  // Casilla de un nodo, identificada por su aria-label accesible ("Select <nombre>").
  // Su estado se lee en `aria-checked`. Ojo: hacer clic en el título solo resalta el nodo.
  casilla(nombreElemento) {
    return cy.get(`.rc-tree-checkbox[role="checkbox"][aria-label="Select ${nombreElemento}"]`);
  }

  // --- Acciones ---
  visitar() {
    cy.visit('/checkbox');
    // Guard de carga (sincronización, no verificación de negocio)
    cy.location('pathname').should('eq', '/checkbox');
    return this;
  }

  expandirLista() {
    this.botonExpandirRaiz.click();
    return this;
  }

  // Alterna el estado de la casilla (marca si estaba desmarcada y viceversa)
  alternarElemento(nombreElemento) {
    this.casilla(nombreElemento).click();
    return this;
  }
}
