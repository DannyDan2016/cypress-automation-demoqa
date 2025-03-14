/// <reference types="cypress" />

import { WebTablesPage } from "../../page/WebTablesPage"; // Importar la clase POM

describe("Pruebas en la página de Web Tables", () => {
let webTablesPage;
let datos;

beforeEach(() => {
cy.visit("https://demoqa.com/webtables"); // Visitar la página
webTablesPage = new WebTablesPage();

// Cargar datos de prueba antes de cada test
cy.fixture("datosPrueba.json").then((data) => {
    datos = data.formularios.webTables;
});
});

it("Debe agregar un nuevo usuario y verificar su existencia en la tabla", () => {
webTablesPage.abrirFormularioNuevoRegistro();
cy.screenshot("Paso_1_Formulario_Abierto");

webTablesPage.llenarFormulario(datos);
cy.screenshot("Paso_2_Formulario_Completado");

// Verificar que el usuario se agregó a la tabla
webTablesPage.verificarRegistroEnTabla(datos.nombre);
cy.screenshot("Paso_3_Verificacion_Registro");
});

it("Debe buscar un usuario en la tabla", () => {
// Agregar usuario antes de buscarlo
webTablesPage.abrirFormularioNuevoRegistro();
webTablesPage.llenarFormulario(datos);

// Buscar usuario
webTablesPage.buscarUsuario(datos.nombre);
cy.screenshot("Paso_1_Busqueda_Usuario");

webTablesPage.verificarRegistroEnTabla(datos.nombre);
cy.screenshot("Paso_2_Verificacion_Busqueda");
});

it("Debe eliminar un usuario y verificar que ya no está en la tabla", () => {
// Agregar usuario antes de eliminarlo
webTablesPage.abrirFormularioNuevoRegistro();
webTablesPage.llenarFormulario(datos);
webTablesPage.buscarUsuario(datos.nombre);
cy.screenshot("Paso_1_Busqueda_Usuario");

// Eliminar usuario
webTablesPage.eliminarRegistro(datos.nombre);
cy.screenshot("Paso_2_Usuario_Eliminado");

// Verificar que el usuario ya no está en la tabla
webTablesPage.verificarUsuarioEliminado();
cy.screenshot("Paso_3_Verificacion_Eliminacion");
});
});



