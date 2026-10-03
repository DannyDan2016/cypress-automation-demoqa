// Preparación y limpieza de usuarios temporales del Book Store (compartido por API y UI).
// El usuario del escenario queda en el alias @usuario: { userName, password, userId, token }.
import { After, Given } from '@badeball/cypress-cucumber-preprocessor';
import { accountApi, bookStoreApi } from '../../api';
import { createTemporaryUser, deleteTemporaryUsers } from '../../api/testUsers';

const API_DATA = 'bookstore/api';
const BOOKS_DATA = 'bookstore/libros';

// Las precondiciones se verifican con expect: si la API falla al preparar, el escenario
// debe fallar aquí y no más adelante con un error confuso.
const createUser = () =>
  cy.datos(API_DATA).then(({ usuarios, contrasenas, estados }) => {
    createTemporaryUser({ prefix: usuarios.prefijo, password: contrasenas.valida }).then(
      ({ response, user }) => {
        expect(response.status, 'alta del usuario temporal').to.equal(estados.creado);
        cy.wrap(user).as('usuario');
      },
    );
  });

const startApiSession = () => {
  cy.get('@usuario').then((user) => {
    accountApi.generateToken(user).then(({ body }) => {
      expect(body.token, 'token del usuario temporal').to.be.a('string');
      cy.wrap({ ...user, token: body.token }).as('usuario');
    });
  });
};

const addBookToCollection = (libro) => {
  cy.datos(API_DATA, 'estados.creado').then((creado) => {
    cy.datos(BOOKS_DATA, `libros.${libro}.isbn`).then((isbn) => {
      cy.get('@usuario').then(({ userId, token }) => {
        bookStoreApi.addBooks(userId, [isbn], token).then((response) => {
          expect(response.status, `alta del libro ${isbn} en la colección`).to.equal(creado);
        });
      });
    });
  });
};

Given('que existe un usuario temporal', createUser);

Given('que existe un usuario temporal con sesión en la API', () => {
  createUser();
  startApiSession();
});

Given('que existe un usuario temporal con el libro {string} en su colección', (libro) => {
  createUser();
  startApiSession();
  addBookToCollection(libro);
});

Given('que su colección contiene el libro {string}', addBookToCollection);

// Se ejecuta tras cada escenario (también si falla); sin usuarios pendientes no hace nada
After(() => {
  deleteTemporaryUsers();
});
