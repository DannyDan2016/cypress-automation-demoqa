import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { alertsPage } from '../../pages';
import { expectText } from '../../helpers/assertions';
import { stubAlert, stubConfirm, stubPrompt } from '../../helpers/browser';

const DATA = 'alerts-frames-windows/alerts';
// Margen con el que se comprueba que la alerta temporizada aún no ha aparecido
const MARGIN_MS = 100;

When('abro la alerta simple', () => {
  stubAlert();
  alertsPage.openAlert();
});

When('abro la alerta temporizada', () => {
  stubAlert();
  alertsPage.openTimerAlert();
});

When('el reloj avanza hasta justo antes del retardo de la alerta', () => {
  cy.datos(DATA, 'alertas.temporizada.retardoMs').then((retardo) => {
    cy.tick(retardo - MARGIN_MS);
  });
});

When('el reloj completa el retardo de la alerta', () => {
  cy.tick(MARGIN_MS);
});

Then('todavía no se ha mostrado ninguna alerta', () => {
  cy.get('@alert').should('not.have.been.called');
});

Then('el navegador muestra la alerta {string}', (alerta) => {
  cy.datos(DATA, `alertas.${alerta}.mensaje`).then((mensaje) => {
    cy.get('@alert').should('have.been.calledOnceWith', mensaje);
  });
});

When('respondo {string} al cuadro de confirmación', (respuesta) => {
  cy.datos(DATA, `confirmacion.respuestas.${respuesta}.acepta`).then((acepta) => {
    stubConfirm(acepta);
    alertsPage.openConfirm();
  });
});

Then('la página muestra el resultado de la confirmación {string}', (respuesta) => {
  cy.datos(DATA, 'confirmacion').then(({ mensaje, respuestas }) => {
    cy.get('@confirm').should('have.been.calledOnceWith', mensaje);
    expectText(alertsPage.confirmResult, respuestas[respuesta].resultado);
  });
});

When('respondo al prompt con el caso {string}', (caso) => {
  cy.datos(DATA, `prompt.casos.${caso}.respuesta`).then((respuesta) => {
    stubPrompt(respuesta);
    alertsPage.openPrompt();
  });
});

Then('la página muestra el resultado del prompt {string}', (caso) => {
  cy.datos(DATA, 'prompt').then(({ mensaje, casos }) => {
    cy.get('@prompt').should('have.been.calledOnceWith', mensaje);
    expectText(alertsPage.promptResult, casos[caso].resultado);
  });
});
