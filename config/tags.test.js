// Pruebas unitarias de la resolución de tags de Cucumber (node:test).
// Ejecutar con: npm run test:unit
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const { resolverTags, TAGS_POR_DEFECTO } = require('./tags');

describe('resolverTags', () => {
  test('excluye @known-bug por defecto', () => {
    assert.equal(resolverTags({}, {}), TAGS_POR_DEFECTO);
  });

  test('una variable TAGS vacía cuenta como no indicada', () => {
    assert.equal(resolverTags({}, { TAGS: '  ' }), TAGS_POR_DEFECTO);
  });

  test('--expose tags tiene prioridad sobre TAGS', () => {
    assert.equal(resolverTags({ expose: { tags: '@smoke' } }, { TAGS: '@regression' }), '@smoke');
  });
});
