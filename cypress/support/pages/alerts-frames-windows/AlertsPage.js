import { BasePage } from '../BasePage';

export class AlertsPage extends BasePage {
  constructor() {
    super('/alerts');
  }

  // --- Locators ---
  get alertButton() {
    return cy.get('#alertButton');
  }

  get timerAlertButton() {
    return cy.get('#timerAlertButton');
  }

  get confirmButton() {
    return cy.get('#confirmButton');
  }

  // El id tiene una errata en el sitio ("promt")
  get promptButton() {
    return cy.get('#promtButton');
  }

  get confirmResult() {
    return cy.get('#confirmResult');
  }

  get promptResult() {
    return cy.get('#promptResult');
  }

  // --- Acciones ---
  openAlert() {
    this.alertButton.click();
    return this;
  }

  openTimerAlert() {
    this.timerAlertButton.click();
    return this;
  }

  openConfirm() {
    this.confirmButton.click();
    return this;
  }

  openPrompt() {
    this.promptButton.click();
    return this;
  }
}
