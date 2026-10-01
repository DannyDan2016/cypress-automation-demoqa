/// <reference types="cypress" />

const FILAS_TABLA = '.web-tables-wrapper table tbody tr';

export class WebTablesPage {
  // --- Elementos ---
  get botonAgregar() {
    return cy.get('#addNewRecordButton');
  }

  get inputNombre() {
    return cy.get('#firstName');
  }

  get inputApellido() {
    return cy.get('#lastName');
  }

  get inputEmail() {
    return cy.get('#userEmail');
  }

  get inputEdad() {
    return cy.get('#age');
  }

  get inputSalario() {
    return cy.get('#salary');
  }

  get inputDepartamento() {
    return cy.get('#department');
  }

  get botonEnviar() {
    return cy.get('#submit');
  }

  get inputBusqueda() {
    return cy.get('#searchBox');
  }

  // Tras el rediseño, DemoQA usa una <table> HTML (antes react-table con .rt-*)
  get filasTabla() {
    return cy.get(FILAS_TABLA);
  }

  filaUsuario(nombre) {
    return cy.contains(FILAS_TABLA, nombre);
  }

  botonEliminar(nombre) {
    return this.filaUsuario(nombre).find('span[id^="delete-record-"]');
  }

  // --- Acciones ---
  visitar() {
    cy.visit('/webtables');
    // Guard de carga (sincronización, no verificación de negocio)
    cy.location('pathname').should('eq', '/webtables');
    return this;
  }

  abrirFormularioNuevoRegistro() {
    this.botonAgregar.click();
    return this;
  }

  // Rellena el formulario de alta y lo envía
  llenarFormulario({ nombre, apellido, email, edad, salario, departamento }) {
    this.inputNombre.clear().type(nombre);
    this.inputApellido.clear().type(apellido);
    this.inputEmail.clear().type(email);
    this.inputEdad.clear().type(edad);
    this.inputSalario.clear().type(salario);
    this.inputDepartamento.clear().type(departamento);
    this.botonEnviar.click();
    return this;
  }

  buscarUsuario(nombre) {
    this.inputBusqueda.clear().type(nombre);
    return this;
  }

  eliminarRegistro(nombre) {
    this.botonEliminar(nombre).click();
    return this;
  }
}
