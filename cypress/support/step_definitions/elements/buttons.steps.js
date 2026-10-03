import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { buttonsPage } from '../../pages';
import { expectText } from '../../helpers/assertions';

const DATA = 'elements/buttons';

// Tipo de clic (clave usada en el .feature y en el YAML) → acción y mensaje del page object
const CLICKS = {
  doble_clic: {
    act: () => buttonsPage.doubleClick(),
    message: () => buttonsPage.doubleClickMessage,
  },
  clic_derecho: {
    act: () => buttonsPage.rightClick(),
    message: () => buttonsPage.rightClickMessage,
  },
  clic_dinamico: {
    act: () => buttonsPage.dynamicClick(),
    message: () => buttonsPage.dynamicClickMessage,
  },
};

const click = (tipo) => {
  if (!CLICKS[tipo]) {
    throw new Error(
      `Tipo de clic "${tipo}" desconocido. Tipos: ${Object.keys(CLICKS).join(', ')}.`,
    );
  }
  return CLICKS[tipo];
};

When('hago un {string} sobre su botón', (tipo) => {
  click(tipo).act();
});

Then('se muestra el mensaje del {string}', (tipo) => {
  cy.datos(DATA, `mensajes.${tipo}`).then((mensaje) => expectText(click(tipo).message(), mensaje));
});
