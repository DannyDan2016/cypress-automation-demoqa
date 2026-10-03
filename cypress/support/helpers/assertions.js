// Helpers de aserción reutilizables por los steps. Todos son "web-first": se apoyan en
// `should` con callback, así que Cypress reintenta hasta que se cumplen o vence el timeout.

const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const textsOf = ($elements) => [...$elements].map((element) => normalize(element.textContent));

/** El texto del elemento (normalizando espacios) es exactamente `expected`. */
export function expectText(chainable, expected) {
  return chainable.should(($element) => {
    expect(normalize($element.text())).to.equal(normalize(String(expected)));
  });
}

/** Los textos de los elementos, en orden, son exactamente `expected`. */
export function expectTexts(chainable, expected) {
  return chainable.should(($elements) => {
    expect(textsOf($elements)).to.deep.equal(expected.map((text) => normalize(String(text))));
  });
}

/** Los textos de los elementos son `expected`, sin importar el orden. */
export function expectTextsInAnyOrder(chainable, expected) {
  return chainable.should(($elements) => {
    expect(textsOf($elements)).to.have.members(expected.map((text) => normalize(String(text))));
  });
}

/**
 * Filas de dos columnas (etiqueta | valor) cuyo contenido es exactamente el mapa `expected`
 * (p. ej. la tabla Label/Values de un modal de confirmación).
 */
export function expectKeyValueRows(chainable, expected) {
  const normalized = Object.fromEntries(
    Object.entries(expected).map(([key, value]) => [normalize(key), normalize(String(value))]),
  );
  return chainable.should(($rows) => {
    const actual = Object.fromEntries(
      [...$rows].map((row) =>
        [...row.cells].slice(0, 2).map((cell) => normalize(cell.textContent)),
      ),
    );
    expect(actual).to.deep.equal(normalized);
  });
}

/** El campo no supera la validación nativa de HTML5 (`validity.valid === false`). */
export function expectInvalid(chainable) {
  return chainable.should(($field) => {
    expect($field[0].validity.valid, `${$field[0].id || 'campo'} inválido`).to.equal(false);
  });
}

/** El campo supera la validación nativa de HTML5. */
export function expectValid(chainable) {
  return chainable.should(($field) => {
    expect($field[0].validity.valid, `${$field[0].id || 'campo'} válido`).to.equal(true);
  });
}
