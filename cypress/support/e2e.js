// Se carga automáticamente antes de cada spec (opción `supportFile`).
import './commands';

// DemoQA carga scripts de terceros (Google Tag Manager, anuncios) que a veces lanzan
// errores ajenos a la aplicación. Solo se ignoran esos errores conocidos: cualquier
// otra excepción no capturada debe hacer fallar el test.
const ERRORES_TERCEROS_CONOCIDOS = /ResizeObserver loop|Script error|googletag|adsbygoogle/i;

Cypress.on('uncaught:exception', (err) => {
  if (ERRORES_TERCEROS_CONOCIDOS.test(err.message)) {
    return false;
  }
});
