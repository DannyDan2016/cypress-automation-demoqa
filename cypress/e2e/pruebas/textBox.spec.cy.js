/// <reference types="cypress" />

import { TextBoxPage } from "../../page/TextBoxPage"; // Verifica la ruta correcta

describe("Pruebas en la página de Text Box", () => {
  let textBoxPage;
  let datos;

  beforeEach(() => {
    cy.visit("/text-box");
    textBoxPage = new TextBoxPage();

    cy.fixture("datosPrueba.json").then((data) => {
      datos = data.formularios.textBox;
    });
  });

  it("Debe completar el formulario y verificar los datos ingresados", () => {
    cy.wrap(datos).then((datos) => {
      textBoxPage.escribirNombre(datos.nombre);
      cy.wait(1000);
      cy.screenshot("Paso_1_Nombre_ingresado");

      textBoxPage.escribirEmail(datos.email);
      cy.wait(1000);
      cy.screenshot("Paso_2_Email_ingresado");

      textBoxPage.escribirDireccionActual(datos.direccion);
      cy.wait(1000);
      cy.screenshot("Paso_3_DireccionActual_ingresada");

      textBoxPage.escribirDireccionPermanente(datos.direccionPermanente);
      cy.wait(1000);
      cy.screenshot("Paso_4_DireccionPermanente_ingresada");

      textBoxPage.clickEnBotonEnviar();
      cy.wait(1000);
      cy.screenshot("Paso_5_Formulario_Enviado");

      // Verificación de los datos enviados
      textBoxPage.verificarNombreSalida().should("exist").and("contain", datos.nombre);
      cy.screenshot("Paso_6_Verificar_Nombre");

      textBoxPage.verificarEmailSalida().should("exist").and("contain", datos.email);
      cy.screenshot("Paso_7_Verificar_Email");

      textBoxPage.verificarDireccionActualSalida().should("exist").and("contain", datos.direccion);
      cy.screenshot("Paso_8_Verificar_DireccionActual");

      textBoxPage.verificarDireccionPermanenteSalida().should("exist").and("contain", datos.direccionPermanente);
      cy.screenshot("Paso_9_Verificar_DireccionPermanente");
    });
  });
});





