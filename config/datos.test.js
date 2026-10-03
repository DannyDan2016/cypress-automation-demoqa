// Pruebas unitarias del cargador de datos y de la resolución de ambiente (node:test).
// Ejecutar con: npm run test:unit
const { test, describe, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const { crearCargadorDatos, fusionar } = require('./datos');
const { resolverAmbiente } = require('./ambientes');

describe('fusionar', () => {
  test('combina objetos en profundidad y el override gana', () => {
    const base = { a: { b: 1, c: 2 }, lista: [1, 2], x: 'comun' };
    const override = { a: { c: 3 }, lista: [9], x: 'qa' };
    assert.deepEqual(fusionar(base, override), { a: { b: 1, c: 3 }, lista: [9], x: 'qa' });
  });

  test('no modifica los objetos de entrada', () => {
    const base = { a: { b: 1 } };
    fusionar(base, { a: { b: 2 } });
    assert.deepEqual(base, { a: { b: 1 } });
  });
});

describe('crearCargadorDatos', () => {
  let raiz;
  const escribir = (relativa, contenido) => {
    const ruta = path.join(raiz, relativa);
    fs.mkdirSync(path.dirname(ruta), { recursive: true });
    fs.writeFileSync(ruta, contenido);
  };

  beforeEach(() => {
    raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'datos-'));
    escribir(
      'comun/area/pagina.yaml',
      'casos:\n  valido:\n    nombre: Ana\n    email: ana@example.com\n',
    );
    escribir('qa/area/pagina.yaml', 'casos:\n  valido:\n    email: ana+qa@example.com\n');
  });

  afterEach(() => fs.rmSync(raiz, { recursive: true, force: true }));

  test('aplica el override del ambiente sobre comun', () => {
    const { obtener } = crearCargadorDatos({ ambiente: 'qa', raiz });
    assert.deepEqual(obtener({ archivo: 'area/pagina', clave: 'casos.valido' }), {
      nombre: 'Ana',
      email: 'ana+qa@example.com',
    });
  });

  test('sin override del ambiente devuelve los valores comunes', () => {
    const { obtener } = crearCargadorDatos({ ambiente: 'prod', raiz });
    assert.equal(
      obtener({ archivo: 'area/pagina', clave: 'casos.valido.email' }),
      'ana@example.com',
    );
  });

  test('una clave inexistente indica archivo, fuentes, tramo y claves disponibles', () => {
    const { obtener } = crearCargadorDatos({ ambiente: 'qa', raiz });
    assert.throws(
      () => obtener({ archivo: 'area/pagina', clave: 'casos.invalido.email' }),
      (error) => {
        assert.match(
          error.message,
          /La clave "casos\.invalido\.email" no existe en "area\/pagina"/,
        );
        assert.match(error.message, /comun\/area\/pagina\.yaml \+ \S*qa\/area\/pagina\.yaml/);
        assert.match(error.message, /No se encontró "invalido" en "casos"/);
        assert.match(error.message, /Claves disponibles: valido/);
        return true;
      },
    );
  });

  test('un archivo inexistente indica las rutas buscadas', () => {
    const { obtener } = crearCargadorDatos({ ambiente: 'qa', raiz });
    assert.throws(
      () => obtener({ archivo: 'area/otra' }),
      /No existe el archivo de datos "area\/otra"/,
    );
  });

  test('rechaza nombres de archivo con rutas relativas', () => {
    const { obtener } = crearCargadorDatos({ ambiente: 'qa', raiz });
    assert.throws(() => obtener({ archivo: '../secreto' }), /Nombre de archivo de datos inválido/);
  });

  test('informa del archivo cuando el YAML es inválido', () => {
    escribir('comun/area/rota.yaml', 'clave: [sin cerrar\n');
    const { obtener } = crearCargadorDatos({ ambiente: 'qa', raiz });
    assert.throws(
      () => obtener({ archivo: 'area/rota' }),
      /YAML inválido en .*comun\/area\/rota\.yaml/,
    );
  });
});

describe('resolverAmbiente', () => {
  test('usa --expose TEST_ENV antes que la variable de entorno', () => {
    const ambiente = resolverAmbiente({ expose: { TEST_ENV: 'QA' } }, { TEST_ENV: 'dev' });
    assert.equal(ambiente.nombre, 'qa');
  });

  test('usa prod por defecto', () => {
    assert.equal(resolverAmbiente({}, {}).nombre, 'prod');
  });

  test('rechaza ambientes desconocidos', () => {
    assert.throws(() => resolverAmbiente({}, { TEST_ENV: 'uat' }), /TEST_ENV="uat" no es válido/);
  });
});
