import { BasePage } from '../BasePage';

// Claves de datos (YAML `entrada`) → campo del formulario
const FIELDS = {
  nombre: '#userName',
  email: '#userEmail',
  direccionActual: '#currentAddress',
  direccionPermanente: '#permanentAddress',
};

// Claves de datos (YAML `esperado.salida`) → línea de la salida (#output)
const OUTPUT = {
  nombre: '#output #name',
  email: '#output #email',
  direccionActual: '#output #currentAddress',
  direccionPermanente: '#output #permanentAddress',
};

export class TextBoxPage extends BasePage {
  constructor() {
    super('/text-box');
  }

  // --- Locators ---
  get emailInput() {
    return cy.get(FIELDS.email);
  }

  get submitButton() {
    return cy.get('#submit');
  }

  /** Líneas de la salida que se muestran tras enviar (vacío si no hay salida). */
  get outputLines() {
    return cy.get('#output p');
  }

  outputField(key) {
    if (!OUTPUT[key]) {
      throw new Error(
        `TextBoxPage: la salida "${key}" no existe. Salidas: ${Object.keys(OUTPUT)}.`,
      );
    }
    return cy.get(OUTPUT[key]);
  }

  // --- Acciones ---
  fillForm(values) {
    return this.fillFields(FIELDS, values);
  }

  submit() {
    this.submitButton.click();
    return this;
  }
}
