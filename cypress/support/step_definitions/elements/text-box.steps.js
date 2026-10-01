import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { textBoxPage } from '../../pages';
import { expectText } from '../../helpers/assertions';

const DATA = 'elements/text-box';

When('completo Text Box con el caso {string}', (caso) => {
  cy.datos(DATA, `casos.${caso}.entrada`).then((entrada) => {
    textBoxPage.fillForm(entrada);
  });
});

When('envío el formulario de Text Box', () => {
  textBoxPage.submit();
});

Then('la salida de Text Box coincide con el caso {string}', (caso) => {
  cy.datos(DATA, `casos.${caso}.esperado.salida`).then((salida) => {
    Object.entries(salida).forEach(([campo, texto]) => {
      expectText(textBoxPage.outputField(campo), texto);
    });
  });
});
