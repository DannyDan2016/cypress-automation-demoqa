import { BasePage } from '../BasePage';

export class ButtonsPage extends BasePage {
  constructor() {
    super('/buttons');
  }

  // --- Locators ---
  get doubleClickButton() {
    return cy.get('#doubleClickBtn');
  }

  get rightClickButton() {
    return cy.get('#rightClickBtn');
  }

  // "Click Me" tiene un id aleatorio en cada carga: se localiza por su texto exacto
  get dynamicClickButton() {
    return cy.contains('button', /^Click Me$/);
  }

  get doubleClickMessage() {
    return cy.get('#doubleClickMessage');
  }

  get rightClickMessage() {
    return cy.get('#rightClickMessage');
  }

  get dynamicClickMessage() {
    return cy.get('#dynamicClickMessage');
  }

  // --- Acciones ---
  doubleClick() {
    this.doubleClickButton.dblclick();
    return this;
  }

  rightClick() {
    this.rightClickButton.rightclick();
    return this;
  }

  dynamicClick() {
    this.dynamicClickButton.click();
    return this;
  }
}
