import { BasePage } from '../BasePage';

// Perfil del Book Store con sesión iniciada. Tras el rediseño la colección es una <table>
// HTML (antes react-table con .rt-tr) y cada libro tiene su icono #delete-record-<ISBN>.
export class ProfilePage extends BasePage {
  constructor() {
    super('/profile');
  }

  // --- Locators ---
  // #userName-value se repite en el detalle de libro, pero en /profile es único
  get userNameValue() {
    return cy.get('#userName-value');
  }

  bookRow(title) {
    return cy.contains('table tbody tr', title);
  }

  deleteBookButton(isbn) {
    return cy.get(`#delete-record-${isbn}`);
  }

  get confirmDeletionButton() {
    return cy.get('#closeSmallModal-ok');
  }

  // --- Acciones ---
  deleteBook(isbn) {
    this.deleteBookButton(isbn).click();
    this.confirmDeletionButton.click();
    return this;
  }
}
