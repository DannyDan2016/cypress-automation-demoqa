class LoginPage {
    visitar() {
    cy.visit('/login');
    }
    ingresarCredenciales(usuario, clave) {
    cy.get('#userName').type(usuario);
    cy.get('#password').type(clave);
    }
    iniciarSesion() {
    cy.get('#login').click();
    }
}
export default new LoginPage();