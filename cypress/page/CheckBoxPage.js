export class CheckBoxPage {
    constructor() {
      // Elementos reutilizables
      this.expandButton = ".rct-collapse-btn";
      this.checkboxLabel = ".rct-title";
      this.checkboxCheckIcon = ".rct-icon-check";
      this.checkboxUncheckIcon = ".rct-icon-uncheck";
    }
  
    /**
     * Expande la lista de checkboxes
     */
    expandirLista() {
      cy.get(this.expandButton).click();
    }
  
    /**
     * Selecciona un checkbox basado en el nombre del elemento
     * @param {string} nombreElemento - Nombre visible del checkbox
     */
    seleccionarElemento(nombreElemento) {
      cy.contains(this.checkboxLabel, nombreElemento).click();
    }
  
    /**
     * Verifica si un checkbox está seleccionado
     * @param {string} nombreElemento - Nombre visible del checkbox
     */
    verificarElementoSeleccionado(nombreElemento) {
      cy.contains(this.checkboxLabel, nombreElemento)
        .parent()
        .find(this.checkboxCheckIcon)
        .should("exist");
    }
  
    /**
     * Verifica si un checkbox está desmarcado
     * @param {string} nombreElemento - Nombre visible del checkbox
     */
    verificarElementoDeseleccionado(nombreElemento) {
      cy.contains(this.checkboxLabel, nombreElemento)
        .parent()
        .find(this.checkboxUncheckIcon)
        .should("exist");
    }
  }
  