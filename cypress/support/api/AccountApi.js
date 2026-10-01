// Service object de la cuenta del Book Store (/Account/v1). Devuelve la respuesta completa
// de cy.request sin fallar por el código HTTP: las verificaciones las hacen los steps.
const BASE_PATH = '/Account/v1';

const request = (options) => cy.request({ failOnStatusCode: false, ...options });
const bearer = (token) => (token ? { Authorization: `Bearer ${token}` } : {});

export class AccountApi {
  createUser({ userName, password }) {
    return request({ method: 'POST', url: `${BASE_PATH}/User`, body: { userName, password } });
  }

  generateToken({ userName, password }) {
    return request({
      method: 'POST',
      url: `${BASE_PATH}/GenerateToken`,
      body: { userName, password },
    });
  }

  isAuthorized({ userName, password }) {
    return request({
      method: 'POST',
      url: `${BASE_PATH}/Authorized`,
      body: { userName, password },
    });
  }

  // Endpoint que usa la UI para iniciar sesión (no aparece en Swagger)
  login({ userName, password }) {
    return request({ method: 'POST', url: `${BASE_PATH}/Login`, body: { userName, password } });
  }

  getUser(userId, token) {
    return request({ method: 'GET', url: `${BASE_PATH}/User/${userId}`, headers: bearer(token) });
  }

  deleteUser(userId, token) {
    return request({
      method: 'DELETE',
      url: `${BASE_PATH}/User/${userId}`,
      headers: bearer(token),
    });
  }
}
