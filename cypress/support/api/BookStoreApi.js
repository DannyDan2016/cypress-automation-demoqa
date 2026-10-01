// Service object de las colecciones del Book Store (/BookStore/v1).
const BASE_PATH = '/BookStore/v1';

const request = (options) => cy.request({ failOnStatusCode: false, ...options });
const bearer = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export class BookStoreApi {
  getBooks() {
    return request({ method: 'GET', url: `${BASE_PATH}/Books` });
  }

  addBooks(userId, isbns, token) {
    return request({
      method: 'POST',
      url: `${BASE_PATH}/Books`,
      headers: bearer(token),
      body: { userId, collectionOfIsbns: isbns.map((isbn) => ({ isbn })) },
    });
  }

  deleteBook(userId, isbn, token) {
    return request({
      method: 'DELETE',
      url: `${BASE_PATH}/Book`,
      headers: bearer(token),
      body: { userId, isbn },
    });
  }
}
