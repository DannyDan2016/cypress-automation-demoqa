class ProfilePage {
    visitar() {
    cy.visit('/profile');
    }
    eliminarLibro(libro) {
    cy.contains('.rt-tr', libro).within(() => {
        cy.get('.text-danger').click();
    });
    }
}
export default new ProfilePage();