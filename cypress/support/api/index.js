// Instancias de los service objects de la API, compartidas por steps y comandos
import { AccountApi } from './AccountApi';
import { BookStoreApi } from './BookStoreApi';

export const accountApi = new AccountApi();
export const bookStoreApi = new BookStoreApi();
