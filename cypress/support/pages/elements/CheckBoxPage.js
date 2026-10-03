import { BasePage } from '../BasePage';

const exact = (text) => new RegExp(`^${Cypress._.escapeRegExp(text)}$`);

// DemoQA usa rc-tree: cada nodo es un [role=treeitem] con su switcher (expandir/colapsar),
// una casilla accesible ([role=checkbox][aria-label="Select <nodo>"]) y su título.
export class CheckBoxPage extends BasePage {
  constructor() {
    super('/checkbox');
  }

  // --- Locators ---
  node(title) {
    return cy.contains('[role="treeitem"]', exact(title));
  }

  expander(title) {
    return this.node(title).find('.rc-tree-switcher');
  }

  /** Casilla del nodo; su estado está en `aria-checked` (true | false | mixed). */
  checkbox(title) {
    return cy.get(`[role="checkbox"][aria-label="Select ${title}"]`);
  }

  /** Nodos listados en "You have selected :" (en minúsculas, uno por span). */
  get selectedItems() {
    return cy.get('#result .text-success');
  }

  get result() {
    return cy.get('#result');
  }

  // --- Acciones ---
  expand(title) {
    this.expander(title).click();
    return this;
  }

  /** Alterna la casilla (marca si estaba desmarcada y viceversa). Clic en el título solo resalta. */
  toggle(title) {
    this.checkbox(title).click();
    return this;
  }
}
