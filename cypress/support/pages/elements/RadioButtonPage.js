import { BasePage } from '../BasePage';

// Ids de los inputs: yesRadio, impressiveRadio, noRadio (a partir de la etiqueta visible)
const radioId = (label) => `${label.toLowerCase()}Radio`;

export class RadioButtonPage extends BasePage {
  constructor() {
    super('/radio-button');
  }

  // --- Locators ---
  radio(label) {
    return cy.get(`#${radioId(label)}`);
  }

  // El input está oculto por estilos: se interactúa con su label asociado
  labelFor(label) {
    return cy.get(`label[for="${radioId(label)}"]`);
  }

  /** Párrafo "You have selected <opción>" (solo existe tras elegir una opción). */
  get selectionMessage() {
    return cy.get('p:has(> .text-success)');
  }

  // --- Acciones ---
  select(label) {
    this.labelFor(label).click();
    return this;
  }
}
