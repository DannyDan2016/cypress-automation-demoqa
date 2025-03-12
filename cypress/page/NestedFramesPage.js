class NestedFramesPage {
    visitar() {
    cy.visit('/nestedframes');
    }
    verificarContenidoFrames() {
    cy.get('#frame1').then(($iframe) => {
    const body = $iframe.contents().find('body');
    cy.wrap(body).within(() => {
    cy.get('iframe').then(($nestedIframe) => {
    const nestedBody = $nestedIframe.contents().find('body');
    cy.wrap(nestedBody).should('contain.text', 'Child Iframe');
    });
        });
    });
    }
}
export default new NestedFramesPage();