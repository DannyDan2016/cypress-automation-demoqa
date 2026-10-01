/// <reference types="cypress" />

import { WebTablesPage } from '../../page/WebTablesPage';

describe('Pruebas en la página de Web Tables', () => {
  const webTablesPage = new WebTablesPage();

  beforeEach(() => {
    cy.fixture('web-tables').as('datos');
    webTablesPage.visitar();
  });

  it('Debe agregar un nuevo usuario y verificar su existencia en la tabla', function () {
    webTablesPage.abrirFormularioNuevoRegistro().llenarFormulario(this.datos);

    webTablesPage
      .filaUsuario(this.datos.nombre)
      .should('contain.text', this.datos.apellido)
      .and('contain.text', this.datos.email);
  });

  it('Debe buscar un usuario en la tabla', function () {
    webTablesPage.abrirFormularioNuevoRegistro().llenarFormulario(this.datos);

    webTablesPage.buscarUsuario(this.datos.nombre);

    webTablesPage.filasTabla.should('have.length', 1);
    webTablesPage.filaUsuario(this.datos.nombre).should('be.visible');
  });

  it('Debe eliminar un usuario y verificar que ya no está en la tabla', function () {
    webTablesPage
      .abrirFormularioNuevoRegistro()
      .llenarFormulario(this.datos)
      .buscarUsuario(this.datos.nombre);
    webTablesPage.filaUsuario(this.datos.nombre).should('be.visible');

    webTablesPage.eliminarRegistro(this.datos.nombre);

    // Con la búsqueda aplicada, la tabla queda sin filas
    // (la nueva DemoQA ya no muestra "No rows found")
    webTablesPage.filasTabla.should('not.exist');
  });
});
