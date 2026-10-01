import { Then } from '@badeball/cypress-cucumber-preprocessor';
import { framesPage } from '../../pages';
import { expectText } from '../../helpers/assertions';

const SAMPLE_DATA = 'alerts-frames-windows/pagina-ejemplo';

Then('el frame {string} muestra el encabezado de la página de ejemplo', (frame) => {
  cy.datos(SAMPLE_DATA, 'encabezado').then((encabezado) => {
    expectText(framesPage.frameHeading(frame), encabezado);
  });
});
