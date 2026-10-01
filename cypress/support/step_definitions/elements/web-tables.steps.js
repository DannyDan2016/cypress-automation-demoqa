import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { webTablesPage } from '../../pages';
import { expectTexts } from '../../helpers/assertions';

const DATA = 'elements/web-tables';

// La fila de un caso se identifica por su primera celda (el nombre)
const nameOf = (caso) => cy.datos(DATA, `casos.${caso}.esperado.celdas.0`);

const register = (caso) => {
  cy.datos(DATA, `casos.${caso}.entrada`).then((entrada) => {
    webTablesPage.openAddForm().fillForm(entrada).submit();
  });
};

When('registro en Web Tables el caso {string}', register);
Given('que registré en Web Tables el caso {string}', register);

When('edito en Web Tables el registro del caso {string}', (caso) => {
  cy.datos(DATA, `casos.${caso}`).then(({ registro, entrada }) => {
    webTablesPage.edit(registro).fillForm(entrada).submit();
  });
});

When('busco en Web Tables según la búsqueda {string}', (busqueda) => {
  cy.datos(DATA, `busquedas.${busqueda}.termino`).then((termino) => {
    webTablesPage.search(termino);
  });
});

When('elimino de Web Tables la fila del caso {string}', (caso) => {
  nameOf(caso).then((nombre) => {
    webTablesPage.delete(nombre);
  });
});

Then('la tabla muestra la fila del caso {string}', (caso) => {
  cy.datos(DATA, `casos.${caso}.esperado.celdas`).then((celdas) => {
    expectTexts(webTablesPage.rowCells(celdas[0]), celdas);
  });
});

Then('la tabla muestra solo las filas de la búsqueda {string}', (busqueda) => {
  cy.datos(DATA, `busquedas.${busqueda}.esperado.filas`).then((filas) => {
    webTablesPage.rows.should('have.length', filas.length);
    filas.forEach((texto) => webTablesPage.row(texto).should('be.visible'));
  });
});

Then('la tabla ya no muestra la fila del caso {string}', (caso) => {
  nameOf(caso).then((nombre) => webTablesPage.row(nombre).should('not.exist'));
});
