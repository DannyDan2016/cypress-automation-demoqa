import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { profilePage } from '../../pages';
import { expectText } from '../../helpers/assertions';
import { stubAlert } from '../../helpers/browser';

const BOOKS_DATA = 'bookstore/libros';

const book = (libro) => cy.datos(BOOKS_DATA, `libros.${libro}`);

Given('que inicié sesión en el Book Store con ese usuario', () => {
  cy.get('@usuario').then((user) => {
    cy.loginByApi(user);
  });
});

When('elimino el libro {string} desde el perfil y confirmo', (libro) => {
  book(libro).then(({ isbn }) => {
    stubAlert();
    profilePage.deleteBook(isbn);
  });
});

Then('el perfil muestra el nombre del usuario', () => {
  cy.get('@usuario').then(({ userName }) => {
    expectText(profilePage.userNameValue, userName);
  });
});

Then('el perfil lista el libro {string}', (libro) => {
  book(libro).then(({ titulo }) => {
    profilePage.bookRow(titulo).should('be.visible');
  });
});

Then('el perfil ya no lista el libro {string}', (libro) => {
  book(libro).then(({ titulo }) => {
    profilePage.bookRow(titulo).should('not.exist');
  });
});

Then('el Book Store avisa {string}', (aviso) => {
  cy.datos(BOOKS_DATA, `avisos.${aviso}`).then((mensaje) => {
    cy.get('@alert').should('have.been.calledOnceWith', mensaje);
  });
});
