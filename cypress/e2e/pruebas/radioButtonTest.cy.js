/// <reference types="cypress" />

import { RadioButtonPage } from '../../page/RadioButtonPage';
import datos from '../../fixtures/radio-button.json';

describe('Pruebas en la página de Radio Button', () => {
  const radioButtonPage = new RadioButtonPage();

  beforeEach(() => {
    radioButtonPage.visitar();
  });

  // Data-driven: un test por cada opción habilitada del fixture
  datos.opcionesHabilitadas.forEach(({ opcion, mensaje }) => {
    it(`Debe seleccionar la opción "${opcion}" y mostrar su mensaje`, () => {
      radioButtonPage.seleccionarOpcion(opcion);

      radioButtonPage.radio(opcion).should('be.checked');
      radioButtonPage.mensajeSeleccion.should('have.text', mensaje);
    });
  });

  it(`Debe mostrar la opción "${datos.opcionDeshabilitada}" deshabilitada`, () => {
    radioButtonPage.radio(datos.opcionDeshabilitada).should('be.disabled');
  });
});
