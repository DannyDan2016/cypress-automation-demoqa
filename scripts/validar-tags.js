#!/usr/bin/env node
// Valida los tags de los .feature (equivalente a --strict-markers de pytest):
//   - Solo se permiten los tags declarados abajo; una errata (@smoek) rompe el lint.
//   - Cada escenario (sumando los tags de la característica, del escenario y de sus
//     Ejemplos) debe tener @smoke o @regression y al menos un @tc-<area>-NNN.
//   - Cada .feature debe empezar con "# language: es".
// Uso: node scripts/validar-tags.js [carpeta]   (por defecto cypress/e2e)
const fs = require('node:fs');
const path = require('node:path');

const TAGS_DECLARADOS = {
  '@smoke': 'Camino crítico: se ejecuta en cada PR',
  '@regression': 'Regresión completa (nocturna)',
  '@negative': 'Caso negativo o de error',
  '@known-bug':
    'Defecto real del sitio: comprueba el comportamiento correcto y se excluye por defecto',
};
const TAG_CASO = /^@tc-(nav|elem|form|afw|wid|int|bs|api)-\d{3}$/;
const PRIORIDADES = ['@smoke', '@regression'];

const ESCENARIO = /^(Escenario|Ejemplo|Esquema del escenario|Plantilla del escenario):/;
const EJEMPLOS = /^(Ejemplos|Escenarios):/;
const CARACTERISTICA = /^(Característica|Necesidad del negocio|Requisito):/;

function buscarFeatures(carpeta) {
  return fs.readdirSync(carpeta, { withFileTypes: true }).flatMap((entrada) => {
    const ruta = path.join(carpeta, entrada.name);
    if (entrada.isDirectory()) return buscarFeatures(ruta);
    return entrada.name.endsWith('.feature') ? [ruta] : [];
  });
}

function validarArchivo(ruta) {
  const errores = [];
  const lineas = fs.readFileSync(ruta, 'utf8').split(/\r?\n/);
  const archivo = path.relative(process.cwd(), ruta).replaceAll('\\', '/');

  if (lineas[0]?.trim() !== '# language: es') {
    errores.push(`${archivo}:1 debe empezar con "# language: es"`);
  }

  let pendientes = [];
  let tagsCaracteristica = [];
  let escenario = null;
  let total = 0;

  const cerrarEscenario = () => {
    if (!escenario) return;
    const tags = new Set([...tagsCaracteristica, ...escenario.tags]);
    const donde = `${archivo}:${escenario.linea} "${escenario.nombre}"`;
    if (!PRIORIDADES.some((tag) => tags.has(tag))) {
      errores.push(`${donde} no tiene @smoke ni @regression`);
    }
    if (![...tags].some((tag) => TAG_CASO.test(tag))) {
      errores.push(`${donde} no tiene un tag de caso @tc-<area>-NNN`);
    }
    total += 1;
    escenario = null;
  };

  lineas.forEach((linea, indice) => {
    const texto = linea.trim();
    if (texto.startsWith('@')) {
      for (const tag of texto.split(/\s+/)) {
        if (!(tag in TAGS_DECLARADOS) && !TAG_CASO.test(tag)) {
          errores.push(`${archivo}:${indice + 1} tag no declarado: ${tag}`);
        }
        pendientes.push(tag);
      }
      return;
    }
    if (CARACTERISTICA.test(texto)) {
      tagsCaracteristica = pendientes;
    } else if (ESCENARIO.test(texto)) {
      cerrarEscenario();
      escenario = {
        linea: indice + 1,
        nombre: texto.split(':').slice(1).join(':').trim(),
        tags: pendientes,
      };
    } else if (EJEMPLOS.test(texto) && escenario) {
      escenario.tags.push(...pendientes);
    } else {
      return;
    }
    pendientes = [];
  });
  cerrarEscenario();

  return { errores, total };
}

const carpeta = path.resolve(process.argv[2] ?? 'cypress/e2e');
const features = buscarFeatures(carpeta);
const resultados = features.map(validarArchivo);
const errores = resultados.flatMap((resultado) => resultado.errores);
const escenarios = resultados.reduce((suma, resultado) => suma + resultado.total, 0);

if (errores.length) {
  console.error(`Tags inválidos en las features (${errores.length}):`);
  errores.forEach((error) => console.error(`  - ${error}`));
  console.error(`Tags declarados: ${Object.keys(TAGS_DECLARADOS).join(' ')} y @tc-<area>-NNN.`);
  process.exit(1);
}
console.log(`Tags OK: ${features.length} features, ${escenarios} escenarios.`);
