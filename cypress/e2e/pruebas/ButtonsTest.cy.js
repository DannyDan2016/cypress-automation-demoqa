/// <reference types="cypress" />

import { ButtonsPage } from '../../page/ButtonsPage'; // Verifica la ruta correcta

describe('Pruebas en la página de botones', () => {
  let buttonsPage;

  beforeEach(() => {
    cy.visit('/buttons');
    buttonsPage = new ButtonsPage();
  });

  it('Debe hacer doble clic en el botón y verificar el mensaje', function () {
    buttonsPage.hacerDobleClick();

    buttonsPage.verificarMensaje(buttonsPage.doubleClickMessage);
  });

  it('Debe hacer clic derecho en el botón y verificar el mensaje', function () {
    buttonsPage.hacerClickDerecho();

    buttonsPage.verificarMensaje(buttonsPage.rightClickMessage);
  });

  it('Debe hacer un clic único en el botón dinámico y verificar mensaje', function () {
    buttonsPage.hacerClickUnico();

    buttonsPage.verificarMensaje(buttonsPage.singleClickMessage);
  });
});
