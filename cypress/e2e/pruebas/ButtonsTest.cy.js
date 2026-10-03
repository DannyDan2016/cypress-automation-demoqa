/// <reference types="cypress" />

import { ButtonsPage } from '../../page/ButtonsPage';

describe('Pruebas en la página de botones', () => {
  const buttonsPage = new ButtonsPage();

  beforeEach(() => {
    cy.fixture('buttons').as('datos');
    buttonsPage.visitar();
  });

  it('Debe hacer doble clic en el botón y verificar el mensaje', function () {
    buttonsPage.hacerDobleClick();

    buttonsPage.mensajeDobleClick.should('have.text', this.datos.mensajesEsperados.dobleClick);
  });

  it('Debe hacer clic derecho en el botón y verificar el mensaje', function () {
    buttonsPage.hacerClickDerecho();

    buttonsPage.mensajeClickDerecho.should('have.text', this.datos.mensajesEsperados.clickDerecho);
  });

  it('Debe hacer un clic único en el botón dinámico y verificar mensaje', function () {
    buttonsPage.hacerClickUnico();

    buttonsPage.mensajeClickDinamico.should('have.text', this.datos.mensajesEsperados.clickUnico);
  });
});
