/// <reference types="cypress" />

import { TextBoxPage } from '../../page/TextBoxPage';

describe('Pruebas en la página de Text Box', () => {
  const textBoxPage = new TextBoxPage();

  beforeEach(() => {
    cy.fixture('text-box').as('datos');
    textBoxPage.visitar();
  });

  it('Debe completar el formulario y verificar los datos ingresados', function () {
    textBoxPage.completarFormulario(this.datos).enviar();

    textBoxPage.nombreSalida.should('have.text', `Name:${this.datos.nombre}`);
    textBoxPage.emailSalida.should('have.text', `Email:${this.datos.email}`);
    textBoxPage.direccionActualSalida.should('contain.text', this.datos.direccion);
    textBoxPage.direccionPermanenteSalida.should('contain.text', this.datos.direccionPermanente);
  });
});
