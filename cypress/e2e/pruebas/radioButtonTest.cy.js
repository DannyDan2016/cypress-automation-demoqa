/// <reference types="cypress" />
import { RadioButtonPage } from "../../page/RadioButtonPage";

describe("Pruebas en la página de Radio Button", () => {
let radioButtonPage;
let datosPrueba;

// Antes de todas las pruebas, cargamos los datos de prueba
before(() => {
    cy.fixture("datosPrueba.json").then((data) => {
        datosPrueba = data.radioButton;
    });
});

// Antes de cada prueba, se inicializa la página
beforeEach(() => {
    radioButtonPage = new RadioButtonPage();
    radioButtonPage.visitar();
});

it("Debe seleccionar cada opción de radio button permitida y verificar su selección", () => {
    datosPrueba.opciones.forEach((opcion, index) => {
        if (opcion !== "No") { // Solo intentamos seleccionar Yes e Impressive
            cy.log(`Seleccionando opción: ${opcion}`);

            // Paso 1: Seleccionar el radio button permitido
            radioButtonPage.seleccionarOpcion(opcion);
            cy.wait(500);
            cy.screenshot(`Paso_${index + 1}_Seleccion_${opcion}`);

            // Paso 2: Validar que el mensaje mostrado sea el correcto
            const mensajeEsperado = datosPrueba[`mensaje${opcion}`];
            cy.log(`Verificando mensaje: ${mensajeEsperado}`);
            radioButtonPage.verificarMensajeSeleccionado(mensajeEsperado);
            cy.screenshot(`Paso_${index + 1}_Verificacion_${opcion}`);
        }
    });
});

it("Debe verificar que el radio button 'No' está deshabilitado", () => {
    radioButtonPage.verificarRadioNoDeshabilitado();
});
});


