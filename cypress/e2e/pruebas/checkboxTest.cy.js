/// <reference types="cypress" />

import { CheckBoxPage } from "../../page/CheckBoxPage"; // Verifica la ruta correcta

describe("Pruebas en la página de CheckBox", () => {
let checkBoxPage;

beforeEach(function () {
cy.visit("/checkbox");
checkBoxPage = new CheckBoxPage();

cy.fixture("datosPrueba.json").then((data) => {
    this.datos = data.checkbox;
});
});

it("Debe expandir la lista y seleccionar un solo elemento", function () {
checkBoxPage.expandirLista();
cy.wait(1000);
cy.screenshot("Paso_1_Lista_Expandida");

checkBoxPage.seleccionarElemento(this.datos.elementoSeleccionado);
cy.wait(1000);
cy.screenshot("Paso_2_Elemento_Seleccionado");

checkBoxPage.verificarElementoSeleccionado(this.datos.elementoSeleccionado);
cy.screenshot("Paso_3_Verificar_Seleccion");
});

it("Debe seleccionar varios elementos y verificar la selección", function () {
checkBoxPage.expandirLista();
cy.wait(1000);
cy.screenshot("Paso_1_Lista_Expandida");

this.datos.elementosMultiples.forEach((elemento) => {
    checkBoxPage.seleccionarElemento(elemento);
    cy.wait(500);
});

cy.screenshot("Paso_2_Varios_Elementos_Seleccionados");

this.datos.elementosMultiples.forEach((elemento) => {
    checkBoxPage.verificarElementoSeleccionado(elemento);
});

cy.screenshot("Paso_3_Verificar_Seleccion_Multiple");
});

it("Debe deseleccionar un elemento y validar que se quitó la selección", function () {
checkBoxPage.expandirLista();
cy.wait(1000);
cy.screenshot("Paso_1_Lista_Expandida");

checkBoxPage.seleccionarElemento(this.datos.elementoParaDeseleccionar);
cy.wait(500);
cy.screenshot("Paso_2_Elemento_Seleccionado");

checkBoxPage.seleccionarElemento(this.datos.elementoParaDeseleccionar);
cy.wait(500);
cy.screenshot("Paso_3_Elemento_Deseleccionado");

checkBoxPage.verificarElementoDeseleccionado(this.datos.elementoParaDeseleccionar);
cy.screenshot("Paso_4_Verificar_Deseleccion");
});
});

