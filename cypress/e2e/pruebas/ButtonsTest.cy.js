/// <reference types="cypress" />

import { ButtonsPage } from "../../page/ButtonsPage"; // Verifica la ruta correcta

describe("Pruebas en la página de botones", () => {
let buttonsPage;
let datos;

beforeEach(() => {
cy.visit("/buttons");
buttonsPage = new ButtonsPage();

cy.fixture("datosPrueba.json").then((data) => {
    datos = data.botones;
});
});

it("Debe hacer doble clic en el botón y verificar el mensaje", function () {
buttonsPage.hacerDobleClick();
cy.wait(1000);
cy.screenshot("Paso_1_Doble_Click");

buttonsPage.verificarMensaje(buttonsPage.doubleClickMessage);
cy.screenshot("Paso_2_Verificar_Doble_Click");
});

it("Debe hacer clic derecho en el botón y verificar el mensaje", function () {
buttonsPage.hacerClickDerecho();
cy.wait(1000);
cy.screenshot("Paso_1_Click_Derecho");

buttonsPage.verificarMensaje(buttonsPage.rightClickMessage);
cy.screenshot("Paso_2_Verificar_Click_Derecho");
});

it("Debe hacer un clic único en el botón dinámico y verificar mensaje", function () {
buttonsPage.hacerClickUnico();
cy.wait(1000);
cy.screenshot("Paso_1_Click_Unico");

buttonsPage.verificarMensaje(buttonsPage.singleClickMessage);
cy.screenshot("Paso_2_Verificar_Click_Unico");
});
});








