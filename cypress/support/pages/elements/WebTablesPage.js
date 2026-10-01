import { BasePage } from '../BasePage';

// Tras el rediseño, DemoQA usa una <table> HTML (antes react-table con .rt-*)
const ROWS = '.web-tables-wrapper table tbody tr';

// Claves de datos (YAML `entrada`) → campo del modal de registro
const FIELDS = {
  nombre: '#firstName',
  apellido: '#lastName',
  email: '#userEmail',
  edad: '#age',
  salario: '#salary',
  departamento: '#department',
};

export class WebTablesPage extends BasePage {
  constructor() {
    super('/webtables');
  }

  // --- Locators ---
  get addButton() {
    return cy.get('#addNewRecordButton');
  }

  get registrationModal() {
    return cy.get('#registration-form-modal');
  }

  get submitButton() {
    return cy.get('#submit');
  }

  get searchInput() {
    return cy.get('#searchBox');
  }

  get rows() {
    return cy.get(ROWS);
  }

  /** Fila que contiene el texto (p. ej. el nombre del registro). */
  row(text) {
    return cy.contains(ROWS, text);
  }

  /** Celdas de datos de la fila (sin la columna de acciones). */
  rowCells(text) {
    return this.row(text).find('td').not(':last');
  }

  editButton(text) {
    return this.row(text).find('span[id^="edit-record-"]');
  }

  deleteButton(text) {
    return this.row(text).find('span[id^="delete-record-"]');
  }

  // --- Acciones ---
  openAddForm() {
    this.addButton.click();
    return this;
  }

  fillForm(values) {
    return this.fillFields(FIELDS, values);
  }

  submit() {
    this.submitButton.click();
    return this;
  }

  search(term) {
    this.searchInput.clear().type(term);
    return this;
  }

  edit(text) {
    this.editButton(text).click();
    return this;
  }

  delete(text) {
    this.deleteButton(text).click();
    return this;
  }
}
