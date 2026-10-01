/// <reference types="cypress" />

import { TextBoxPage } from '../../page/TextBoxPage'; // Verifica la ruta correcta

describe('Pruebas en la página de Text Box', () => {
  let textBoxPage;
  let datos;

  beforeEach(() => {
    cy.visit('/text-box');
    textBoxPage = new TextBoxPage();

    cy.fixture('datosPrueba.json').then((data) => {
      datos = data.formularios.textBox;
    });
  });

  it('Debe completar el formulario y verificar los datos ingresados', () => {
    cy.wrap(datos).then((datos) => {
      textBoxPage.escribirNombre(datos.nombre);

      textBoxPage.escribirEmail(datos.email);

      textBoxPage.escribirDireccionActual(datos.direccion);

      textBoxPage.escribirDireccionPermanente(datos.direccionPermanente);

      textBoxPage.clickEnBotonEnviar();

      // Verificación de los datos enviados
      textBoxPage.verificarNombreSalida().should('exist').and('contain', datos.nombre);

      textBoxPage.verificarEmailSalida().should('exist').and('contain', datos.email);

      textBoxPage.verificarDireccionActualSalida().should('exist').and('contain', datos.direccion);

      textBoxPage
        .verificarDireccionPermanenteSalida()
        .should('exist')
        .and('contain', datos.direccionPermanente);
    });
  });
});
