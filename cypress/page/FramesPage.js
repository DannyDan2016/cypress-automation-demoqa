class FramesPage {
    visitar() {
    cy.visit('/frames');
    }
    verificarContenidoFrame() {
    cy.get('#frame1').then(($iframe) => {
        const body = $iframe.contents().find('body');
        cy.wrap(body).should('contain.text', 'This is a sample page');
    });
    }
}
export default new FramesPage();