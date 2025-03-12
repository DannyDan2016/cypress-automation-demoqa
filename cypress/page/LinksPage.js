class LinksPage {
    visitar() {
    cy.visit('/links');
    }
    hacerClickEnLink(link) {
    cy.contains('a', link).click();
    }
}
export default new LinksPage();