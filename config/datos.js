// Cargador de datos de prueba en YAML (se ejecuta en Node, dentro de setupNodeEvents).
//
// Cada archivo lógico (p. ej. "elements/text-box") se compone de:
//   data/comun/<archivo>.yaml     valores compartidos por todos los ambientes
//   data/<ambiente>/<archivo>.yaml  overrides opcionales del ambiente (ganan en el merge)
//
// El merge es profundo: los objetos se combinan clave a clave; los arrays y los escalares
// del override reemplazan a los de `comun`. Se usa el esquema YAML 1.2 por defecto de
// js-yaml (sin claves de merge `<<`; "yes"/"no" son texto, no booleanos).
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

const RAIZ_POR_DEFECTO = path.resolve(__dirname, '..', 'data');
const NOMBRE_VALIDO = /^[a-z0-9][a-z0-9-]*(\/[a-z0-9][a-z0-9-]*)*$/;

const esObjeto = (valor) => valor !== null && typeof valor === 'object' && !Array.isArray(valor);

function fusionar(base, override) {
  if (!esObjeto(base) || !esObjeto(override)) {
    return override === undefined ? base : override;
  }
  const resultado = { ...base };
  for (const [clave, valor] of Object.entries(override)) {
    resultado[clave] = fusionar(base[clave], valor);
  }
  return resultado;
}

function crearCargadorDatos({ ambiente, raiz = RAIZ_POR_DEFECTO }) {
  const cache = new Map();
  const relativa = (ruta) => path.relative(path.resolve(raiz, '..'), ruta).replaceAll('\\', '/');

  function leer(ruta) {
    if (!fs.existsSync(ruta)) return undefined;
    try {
      const contenido = yaml.load(fs.readFileSync(ruta, 'utf8')) ?? {};
      if (!esObjeto(contenido)) {
        throw new Error('la raíz del documento debe ser un mapa (clave: valor)');
      }
      return contenido;
    } catch (error) {
      throw new Error(`YAML inválido en ${relativa(ruta)}: ${error.message}`, { cause: error });
    }
  }

  function cargar(archivo) {
    if (typeof archivo !== 'string' || !NOMBRE_VALIDO.test(archivo)) {
      throw new Error(
        `Nombre de archivo de datos inválido: "${archivo}". Usa rutas como "elements/text-box".`,
      );
    }
    if (!cache.has(archivo)) {
      const rutaComun = path.join(raiz, 'comun', `${archivo}.yaml`);
      const rutaAmbiente = path.join(raiz, ambiente, `${archivo}.yaml`);
      const comun = leer(rutaComun);
      const propio = leer(rutaAmbiente);
      if (comun === undefined && propio === undefined) {
        throw new Error(
          `No existe el archivo de datos "${archivo}": se buscó ${relativa(rutaComun)} y ${relativa(rutaAmbiente)}.`,
        );
      }
      const fuentes = [comun && rutaComun, propio && rutaAmbiente].filter(Boolean).map(relativa);
      cache.set(archivo, { datos: fusionar(comun ?? {}, propio ?? {}), fuentes });
    }
    return cache.get(archivo);
  }

  /**
   * Devuelve el valor de `clave` (ruta con puntos, p. ej. "casos.valido.entrada") dentro del
   * archivo de datos `archivo`, o el archivo completo si no se indica clave. Si la clave no
   * existe lanza un error que dice archivo, ambiente, tramo que falla y claves disponibles.
   */
  function obtener({ archivo, clave } = {}) {
    const { datos, fuentes } = cargar(archivo);
    if (clave === undefined || clave === null || clave === '') return datos;

    let actual = datos;
    const recorrido = [];
    for (const segmento of String(clave).split('.')) {
      const contenedor = recorrido.length ? `"${recorrido.join('.')}"` : 'la raíz';
      if (
        actual === null ||
        typeof actual !== 'object' ||
        !Object.prototype.hasOwnProperty.call(actual, segmento)
      ) {
        const disponibles =
          actual !== null && typeof actual === 'object'
            ? Object.keys(actual).join(', ') || '(ninguna)'
            : `(${contenedor} no es un mapa)`;
        throw new Error(
          `La clave "${clave}" no existe en "${archivo}" (ambiente ${ambiente}; ` +
            `fuentes: ${fuentes.join(' + ')}). No se encontró "${segmento}" en ${contenedor}. ` +
            `Claves disponibles: ${disponibles}.`,
        );
      }
      actual = actual[segmento];
      recorrido.push(segmento);
    }
    // cy.task no admite `undefined` como resultado
    return actual === undefined ? null : actual;
  }

  return { obtener };
}

module.exports = { crearCargadorDatos, fusionar };
