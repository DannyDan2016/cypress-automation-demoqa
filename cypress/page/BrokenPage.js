class BrokenPage {
    visitar() {
    cy.visit('/broken');
    }
    verificarImagenRota() {
    cy.get('img').each(($img) => {
        cy.wrap($img).should('be.visible');
    });
    }
}
export default new BrokenPage();