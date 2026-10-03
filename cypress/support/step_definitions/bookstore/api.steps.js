// Steps de la API del Book Store. La última respuesta queda en el alias @respuesta.
import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { accountApi, bookStoreApi } from '../../api';
import { expectContract } from '../../api/contract';
import { createTemporaryUser, forgetTemporaryUser } from '../../api/testUsers';

const API_DATA = 'bookstore/api';
const BOOKS_DATA = 'bookstore/libros';

const saveResponse = (response) => cy.wrap(response, { log: false }).as('respuesta');

const tryCreateUser = (contrasena) => {
  cy.datos(API_DATA).then(({ usuarios, contrasenas }) => {
    if (!(contrasena in contrasenas)) {
      throw new Error(`La contraseña "${contrasena}" no existe en ${API_DATA}.contrasenas.`);
    }
    createTemporaryUser({ prefix: usuarios.prefijo, password: contrasenas[contrasena] }).then(
      ({ response, user }) => {
        cy.wrap(user).as('usuario');
        saveResponse(response);
      },
    );
  });
};

When('creo un usuario temporal con la contraseña {string}', tryCreateUser);
When('intento crear un usuario temporal con la contraseña {string}', tryCreateUser);

When('genero un token con sus credenciales', () => {
  cy.get('@usuario').then((user) => {
    accountApi.generateToken(user).then(saveResponse);
  });
});

When('genero un token con una contraseña errónea', () => {
  cy.datos(API_DATA, 'contrasenas.erronea').then((password) => {
    cy.get('@usuario').then(({ userName }) => {
      accountApi.generateToken({ userName, password }).then(saveResponse);
    });
  });
});

When('borro su cuenta', () => {
  cy.get('@usuario').then(({ userId, token }) => {
    accountApi.deleteUser(userId, token).then((response) => {
      if (response.status === 204) forgetTemporaryUser(userId);
      saveResponse(response);
    });
  });
});

When('añado el libro {string} a su colección', (libro) => {
  cy.datos(BOOKS_DATA, `libros.${libro}.isbn`).then((isbn) => {
    cy.get('@usuario').then(({ userId, token }) => {
      bookStoreApi.addBooks(userId, [isbn], token).then(saveResponse);
    });
  });
});

When('borro el libro {string} de su colección', (libro) => {
  cy.datos(BOOKS_DATA, `libros.${libro}.isbn`).then((isbn) => {
    cy.get('@usuario').then(({ userId, token }) => {
      bookStoreApi.deleteBook(userId, isbn, token).then(saveResponse);
    });
  });
});

Then('la API responde con el estado {string}', (estado) => {
  cy.datos(API_DATA, `estados.${estado}`).then((codigo) => {
    cy.get('@respuesta').its('status').should('eq', codigo);
  });
});

Then('la respuesta cumple el contrato {string}', (contrato) => {
  cy.get('@respuesta').then(({ body }) => expectContract(contrato, body));
});

Then('la respuesta corresponde al usuario creado y sin libros', () => {
  cy.get('@usuario').then(({ userName }) => {
    cy.get('@respuesta').its('body').should('deep.include', { username: userName, books: [] });
  });
});

Then('el error de la API es {string}', (error) => {
  cy.datos(API_DATA, `errores.${error}`).then((esperado) => {
    cy.get('@respuesta').its('body').should('deep.equal', esperado);
  });
});

Then('el token se generó con éxito', () => {
  cy.datos(API_DATA, 'token').then(({ estado, resultado }) => {
    cy.get('@respuesta')
      .its('body')
      .should((body) => {
        expect(body.status).to.equal(estado);
        expect(body.result).to.equal(resultado);
        expect(body.token).to.be.a('string').and.not.be.empty;
      });
  });
});

Then('consultar su cuenta responde {string} con el error {string}', (estado, error) => {
  cy.datos(API_DATA).then(({ estados, errores }) => {
    cy.get('@usuario').then(({ userId, token }) => {
      accountApi.getUser(userId, token).should((response) => {
        expect(response.status).to.equal(estados[estado]);
        expect(response.body).to.deep.equal(errores[error]);
      });
    });
  });
});

const userBooks = () =>
  cy.get('@usuario').then(({ userId, token }) =>
    accountApi.getUser(userId, token).then((response) => {
      expect(response.status, 'consulta del usuario').to.equal(200);
      expectContract('usuario', response.body);
      return response.body.books.map((book) => book.isbn);
    }),
  );

Then('su colección contiene el libro {string}', (libro) => {
  cy.datos(BOOKS_DATA, `libros.${libro}.isbn`).then((isbn) => {
    userBooks().should('include', isbn);
  });
});

Then('su colección está vacía', () => {
  userBooks().should('be.empty');
});
