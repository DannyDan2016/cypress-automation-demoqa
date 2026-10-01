/// <reference types="cypress" />

import { CheckBoxPage } from '../../page/CheckBoxPage'; // Verifica la ruta correcta

describe('Pruebas en la página de CheckBox', () => {
  let checkBoxPage;

  beforeEach(function () {
    cy.visit('/checkbox');
    checkBoxPage = new CheckBoxPage();

    cy.fixture('datosPrueba.json').then((data) => {
      this.datos = data.checkbox;
    });
  });

  it('Debe expandir la lista y seleccionar un solo elemento', function () {
    checkBoxPage.expandirLista();

    checkBoxPage.seleccionarElemento(this.datos.elementoSeleccionado);

    checkBoxPage.verificarElementoSeleccionado(this.datos.elementoSeleccionado);
  });

  it('Debe seleccionar varios elementos y verificar la selección', function () {
    checkBoxPage.expandirLista();

    this.datos.elementosMultiples.forEach((elemento) => {
      checkBoxPage.seleccionarElemento(elemento);
    });

    this.datos.elementosMultiples.forEach((elemento) => {
      checkBoxPage.verificarElementoSeleccionado(elemento);
    });
  });

  it('Debe deseleccionar un elemento y validar que se quitó la selección', function () {
    checkBoxPage.expandirLista();

    checkBoxPage.seleccionarElemento(this.datos.elementoParaDeseleccionar);

    checkBoxPage.seleccionarElemento(this.datos.elementoParaDeseleccionar);

    checkBoxPage.verificarElementoDeseleccionado(this.datos.elementoParaDeseleccionar);
  });
});
