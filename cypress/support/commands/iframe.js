/**
 * Devuelve el <body> de un iframe del mismo origen, esperando a que tenga contenido.
 *
 *   cy.iframeBody('#frame1').find('#sampleHeading')
 */
Cypress.Commands.add('iframeBody', (selector) =>
  cy
    .get(selector)
    .its('0.contentDocument.body')
    .should('not.be.empty')
    .then((body) => cy.wrap(body)),
);
