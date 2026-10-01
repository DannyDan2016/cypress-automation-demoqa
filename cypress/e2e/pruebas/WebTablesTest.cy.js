/// <reference types="cypress" />

import { WebTablesPage } from '../../page/WebTablesPage'; // Importar la clase POM

describe('Pruebas en la página de Web Tables', () => {
  let webTablesPage;
  let datos;

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables'); // Visitar la página
    webTablesPage = new WebTablesPage();

    // Cargar datos de prueba antes de cada test
    cy.fixture('datosPrueba.json').then((data) => {
      datos = data.formularios.webTables;
    });
  });

  it('Debe agregar un nuevo usuario y verificar su existencia en la tabla', () => {
    webTablesPage.abrirFormularioNuevoRegistro();

    webTablesPage.llenarFormulario(datos);

    // Verificar que el usuario se agregó a la tabla
    webTablesPage.verificarRegistroEnTabla(datos.nombre);
  });

  it('Debe buscar un usuario en la tabla', () => {
    // Agregar usuario antes de buscarlo
    webTablesPage.abrirFormularioNuevoRegistro();
    webTablesPage.llenarFormulario(datos);

    // Buscar usuario
    webTablesPage.buscarUsuario(datos.nombre);

    webTablesPage.verificarRegistroEnTabla(datos.nombre);
  });

  it('Debe eliminar un usuario y verificar que ya no está en la tabla', () => {
    // Agregar usuario antes de eliminarlo
    webTablesPage.abrirFormularioNuevoRegistro();
    webTablesPage.llenarFormulario(datos);
    webTablesPage.buscarUsuario(datos.nombre);

    // Eliminar usuario
    webTablesPage.eliminarRegistro(datos.nombre);

    // Verificar que el usuario ya no está en la tabla
    webTablesPage.verificarUsuarioEliminado();
  });
});
