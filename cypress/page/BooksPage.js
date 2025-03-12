class BooksPage {
    visitar() {
    cy.visit('/books');
    }
    buscarLibro(libro) {
    cy.get('#searchBox').type(libro);
    }
    seleccionarLibro(libro) {
    cy.contains('.rt-tr', libro).click();
    }
}
export default new BooksPage();