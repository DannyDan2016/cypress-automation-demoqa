import { accountApi } from '../api';

// Cookies en las que la UI del Book Store guarda la sesión (no usa localStorage)
const sessionCookies = ({ token, userId, username, expires }) => ({
  token,
  userID: userId,
  userName: username,
  expires,
});

/**
 * Inicia sesión en el Book Store sin pasar por el formulario: hace login por API
 * (POST /Account/v1/Login, el mismo endpoint que usa la UI) e inyecta las cookies de sesión.
 * cy.session la cachea por usuario y la valida con /Account/v1/Authorized.
 *
 *   cy.loginByApi({ userName, password })
 */
Cypress.Commands.add('loginByApi', ({ userName, password }) => {
  cy.session(
    ['book-store', userName],
    () => {
      const domain = new URL(Cypress.config('baseUrl')).hostname;
      accountApi.login({ userName, password }).then(({ status, body }) => {
        expect(status, 'login por API').to.equal(200);
        Object.entries(sessionCookies(body)).forEach(([name, value]) => {
          cy.setCookie(name, String(value), { domain });
        });
      });
    },
    {
      validate() {
        cy.getCookie('token').should('exist');
        accountApi.isAuthorized({ userName, password }).its('body').should('equal', true);
      },
    },
  );
});
