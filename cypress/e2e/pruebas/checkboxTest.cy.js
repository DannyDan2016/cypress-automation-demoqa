/// <reference types="cypress" />

import { CheckBoxPage } from '../../page/CheckBoxPage';

describe('Pruebas en la página de CheckBox', () => {
  const checkBoxPage = new CheckBoxPage();

  beforeEach(() => {
    cy.fixture('checkbox').as('datos');
    checkBoxPage.visitar().expandirLista();
  });

  it('Debe expandir la lista y seleccionar un solo elemento', function () {
    checkBoxPage.alternarElemento(this.datos.elementoSeleccionado);

    checkBoxPage
      .casilla(this.datos.elementoSeleccionado)
      .should('have.attr', 'aria-checked', 'true');
  });

  it('Debe seleccionar varios elementos y verificar la selección', function () {
    this.datos.elementosMultiples.forEach((elemento) => {
      checkBoxPage.alternarElemento(elemento);
    });

    this.datos.elementosMultiples.forEach((elemento) => {
      checkBoxPage.casilla(elemento).should('have.attr', 'aria-checked', 'true');
    });
  });

  it('Debe deseleccionar un elemento y validar que se quitó la selección', function () {
    const elemento = this.datos.elementoParaDeseleccionar;

    checkBoxPage.alternarElemento(elemento);
    checkBoxPage.casilla(elemento).should('have.attr', 'aria-checked', 'true');

    checkBoxPage.alternarElemento(elemento);
    checkBoxPage.casilla(elemento).should('have.attr', 'aria-checked', 'false');
  });
});
