import { BasePage } from '../BasePage';

// Los tres botones cambian a los 5 s de cargar la página (setTimeout de la app).
// El párrafo "This text has random Id" tiene un id aleatorio: no se usa como locator.
export class DynamicPropertiesPage extends BasePage {
  constructor() {
    super('/dynamic-properties');
  }

  get enableAfterButton() {
    return cy.get('#enableAfter');
  }

  get colorChangeButton() {
    return cy.get('#colorChange');
  }

  get visibleAfterButton() {
    return cy.get('#visibleAfter');
  }
}
