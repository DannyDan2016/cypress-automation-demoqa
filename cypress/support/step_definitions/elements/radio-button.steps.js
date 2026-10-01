import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { radioButtonPage } from '../../pages';
import { expectText } from '../../helpers/assertions';

const DATA = 'elements/radio-button';

When('selecciono la opción {string} de Radio Button', (opcion) => {
  cy.datos(DATA, `opciones.${opcion}.etiqueta`).then((etiqueta) => {
    radioButtonPage.select(etiqueta);
  });
});

Then('la opción {string} queda seleccionada con su mensaje', (opcion) => {
  cy.datos(DATA, `opciones.${opcion}`).then(({ etiqueta, mensaje }) => {
    radioButtonPage.radio(etiqueta).should('be.checked');
    expectText(radioButtonPage.selectionMessage, mensaje);
  });
});

Then('la opción {string} de Radio Button está deshabilitada', (opcion) => {
  cy.datos(DATA, `opciones.${opcion}.etiqueta`).then((etiqueta) => {
    radioButtonPage.radio(etiqueta).should('be.disabled');
  });
});
