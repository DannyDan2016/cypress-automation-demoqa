import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { checkBoxPage } from '../../pages';
import { expectTexts } from '../../helpers/assertions';

const DATA = 'elements/check-box';

const expandRoot = () => {
  cy.datos(DATA, 'arbol.raiz').then((raiz) => {
    checkBoxPage.expand(raiz);
  });
};
const toggleNodes = (caso, lista) => {
  cy.datos(DATA, `casos.${caso}.${lista}`).then((nodos) => {
    nodos.forEach((nodo) => checkBoxPage.toggle(nodo));
  });
};

When('expando el nodo raíz del árbol', expandRoot);
Given('que expandí el nodo raíz del árbol', expandRoot);

When('marco los nodos del caso {string}', (caso) => toggleNodes(caso, 'marcar'));
Given('que marqué los nodos del caso {string}', (caso) => toggleNodes(caso, 'marcar'));
When('desmarco los nodos del caso {string}', (caso) => toggleNodes(caso, 'desmarcar'));

Then('el árbol muestra los nodos hijos de la raíz', () => {
  cy.datos(DATA, 'arbol.hijosRaiz').then((hijos) => {
    hijos.forEach((hijo) => checkBoxPage.node(hijo).should('be.visible'));
  });
});

// Comprueba solo las expectativas que el caso declara en el YAML
Then('el árbol queda como indica el caso {string}', (caso) => {
  cy.datos(DATA, `casos.${caso}.esperado`).then((esperado) => {
    (esperado.marcados ?? []).forEach((nodo) => {
      checkBoxPage.checkbox(nodo).should('have.attr', 'aria-checked', 'true');
    });
    (esperado.desmarcados ?? []).forEach((nodo) => {
      checkBoxPage.checkbox(nodo).should('have.attr', 'aria-checked', 'false');
    });
    if (esperado.resultado) {
      expectTexts(checkBoxPage.selectedItems, esperado.resultado);
    }
    if (esperado.sinResultado) {
      checkBoxPage.result.should('not.exist');
    }
  });
});
