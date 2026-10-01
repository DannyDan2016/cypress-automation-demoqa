/**
 * Base de todos los page objects. Cada página conoce su ruta y expone locators (getters o
 * métodos que devuelven cadenas de Cypress) y acciones. Las verificaciones de negocio NO
 * van aquí: las hacen los steps.
 */
export class BasePage {
  constructor(path) {
    this.path = path;
  }

  visit() {
    cy.visit(this.path);
    // Guard de carga (sincronización, no verificación de negocio)
    cy.location('pathname').should('eq', this.path);
    return this;
  }

  /**
   * Rellena campos a partir de un mapa `clave de datos → selector`. Las claves son las de los
   * YAML (`entrada`), así el step pasa el objeto tal cual. Solo se escriben las claves
   * presentes, lo que permite casos parciales (p. ej. solo nombre).
   */
  fillFields(fields, values = {}) {
    Object.entries(values).forEach(([key, value]) => {
      const selector = fields[key];
      if (!selector) {
        throw new Error(
          `${this.constructor.name}: el campo "${key}" no existe. Campos: ${Object.keys(fields).join(', ')}.`,
        );
      }
      cy.get(selector).clear();
      if (value !== '' && value !== null) {
        cy.get(selector).type(String(value));
      }
    });
    return this;
  }
}
