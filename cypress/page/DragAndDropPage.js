class DragAndDropPage {
    visitar() {
    cy.visit('/droppable');
    }
    arrastrarElemento() {
    cy.get('#draggable').trigger('mousedown', { which: 1 });
    cy.get('#droppable').trigger('mousemove').trigger('mouseup', { force: true });
    }
}
export default new DragAndDropPage();