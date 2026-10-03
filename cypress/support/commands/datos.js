/**
 * Lee datos de prueba (entradas y valores esperados) de los YAML de `data/`.
 *
 *   cy.datos('elements/text-box')                         archivo completo
 *   cy.datos('elements/text-box', 'casos.valido.entrada')  una clave (ruta con puntos)
 *
 * El merge `data/comun` + `data/<ambiente>` se hace en Node (tarea `datos`, ver
 * config/datos.js). Si el archivo o la clave no existen, el test falla con un mensaje que
 * indica archivo, ambiente, tramo de la clave que falla y claves disponibles.
 */
Cypress.Commands.add('datos', (archivo, clave) => {
  Cypress.log({ name: 'datos', message: clave ? `${archivo} → ${clave}` : archivo });
  return cy.task('datos', { archivo, clave }, { log: false });
});
