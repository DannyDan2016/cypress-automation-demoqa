import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { browserWindowsPage, samplePage } from '../../pages';
import { expectText } from '../../helpers/assertions';
import { openedPath, stubWindowOpen } from '../../helpers/browser';

const SAMPLE_DATA = 'alerts-frames-windows/pagina-ejemplo';

When('abro una {string} desde Browser Windows', (destino) => {
  stubWindowOpen();
  browserWindowsPage.open(destino);
});

Then('se pide abrir la página de ejemplo en un destino nuevo', () => {
  cy.get('@windowOpen').should('have.been.calledOnce');
  openedPath().should('eq', samplePage.path);
});

Then('la página de ejemplo muestra su encabezado', () => {
  samplePage.visit();
  cy.datos(SAMPLE_DATA, 'encabezado').then((encabezado) => {
    expectText(samplePage.heading, encabezado);
  });
});
