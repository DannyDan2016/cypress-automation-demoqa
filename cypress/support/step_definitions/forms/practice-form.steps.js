import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { practiceFormPage } from '../../pages';
import { expectInvalid, expectKeyValueRows, expectText } from '../../helpers/assertions';

const DATA = 'forms/practice-form';

When('envío el Practice Form con el caso {string}', (caso) => {
  cy.datos(DATA, `casos.${caso}.entrada`).then((entrada) => {
    practiceFormPage.fill(entrada).submit();
  });
});

Then('el modal de confirmación muestra los datos del caso {string}', (caso) => {
  cy.datos(DATA, 'confirmacion.titulo').then((titulo) => {
    expectText(practiceFormPage.confirmationTitle, titulo);
  });
  cy.datos(DATA, `casos.${caso}.esperado.tabla`).then((tabla) => {
    expectKeyValueRows(practiceFormPage.confirmationRows, tabla);
  });
});

Then('el Practice Form marca como inválidos los campos del caso {string}', (caso) => {
  cy.datos(DATA, 'validacion.claseFormulario').then((clase) => {
    practiceFormPage.form.should('have.class', clase);
  });
  cy.datos(DATA, `casos.${caso}.esperado.camposInvalidos`).then((campos) => {
    campos.forEach((campo) => expectInvalid(practiceFormPage.requiredField(campo)));
  });
});

Then('no se muestra el modal de confirmación', () => {
  practiceFormPage.confirmationTitle.should('not.exist');
});
