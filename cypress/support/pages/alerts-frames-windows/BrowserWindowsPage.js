import { BasePage } from '../BasePage';

// Tipo de destino (clave usada en los .feature) → botón que lo abre
const OPENERS = {
  pestana: '#tabButton',
  ventana: '#windowButton',
  mensaje: '#messageWindowButton',
};

export class BrowserWindowsPage extends BasePage {
  constructor() {
    super('/browser-windows');
  }

  // --- Locators ---
  openerButton(target) {
    if (!OPENERS[target]) {
      throw new Error(
        `BrowserWindowsPage: destino "${target}" desconocido. Destinos: ${Object.keys(OPENERS)}.`,
      );
    }
    return cy.get(OPENERS[target]);
  }

  // --- Acciones ---
  open(target) {
    this.openerButton(target).click();
    return this;
  }
}
