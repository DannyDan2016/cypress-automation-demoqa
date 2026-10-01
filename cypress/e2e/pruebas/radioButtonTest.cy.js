/// <reference types="cypress" />
import { RadioButtonPage } from '../../page/RadioButtonPage';

describe('Pruebas en la página de Radio Button', () => {
  let radioButtonPage;
  let datosPrueba;

  // Antes de todas las pruebas, cargamos los datos de prueba
  before(() => {
    cy.fixture('radio-button').then((data) => {
      datosPrueba = data;
    });
  });

  // Antes de cada prueba, se inicializa la página
  beforeEach(() => {
    radioButtonPage = new RadioButtonPage();
    radioButtonPage.visitar();
  });

  it('Debe seleccionar cada opción de radio button permitida y verificar su selección', () => {
    datosPrueba.opcionesHabilitadas.forEach(({ opcion, mensaje }) => {
      radioButtonPage.seleccionarOpcion(opcion);
      radioButtonPage.verificarMensajeSeleccionado(mensaje);
    });
  });

  it("Debe verificar que el radio button 'No' está deshabilitado", () => {
    radioButtonPage.verificarRadioNoDeshabilitado();
  });
});
