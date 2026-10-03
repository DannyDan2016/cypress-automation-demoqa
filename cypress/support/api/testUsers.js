// Usuarios temporales del Book Store: cada escenario crea los suyos por API con un nombre
// único y el hook After los borra. La BD de DemoQA es pública y compartida: nunca se usa un
// usuario fijo (evita colisiones y basura entre ejecuciones).
import { accountApi } from './index';

const pendingCleanup = [];

const uniqueUserName = (prefix) => `${prefix}${Date.now()}_${Cypress._.random(10000, 99999)}`;

/**
 * Intenta crear un usuario con un nombre único. Produce `{ response, user }`; si la API lo
 * crea (201) se registra para borrarlo al terminar el escenario.
 */
export function createTemporaryUser({ prefix, password }) {
  const user = { userName: uniqueUserName(prefix), password };
  return accountApi.createUser(user).then((response) => {
    if (response.status === 201) {
      user.userId = response.body.userID;
      pendingCleanup.push(user);
    }
    return { response, user };
  });
}

/** El usuario ya se borró dentro del escenario: no hay que limpiarlo. */
export function forgetTemporaryUser(userId) {
  const index = pendingCleanup.findIndex((user) => user.userId === userId);
  if (index >= 0) pendingCleanup.splice(index, 1);
}

/** Borra por API los usuarios temporales pendientes (al borrar el usuario se van sus libros). */
export function deleteTemporaryUsers() {
  pendingCleanup.splice(0).forEach((user) => {
    accountApi.generateToken(user).then(({ body }) => {
      if (body.token) {
        accountApi.deleteUser(user.userId, body.token);
      }
    });
  });
}
