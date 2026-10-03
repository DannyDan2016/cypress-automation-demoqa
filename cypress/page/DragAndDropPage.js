class DragAndDropPage {
  visitar() {
    cy.visit('/droppable');
  }
  arrastrarElemento() {
    cy.get('#draggable').trigger('mousedown', { which: 1 });
    cy.get('#droppable').trigger('mousemove');
    cy.get('#droppable').trigger('mouseup', { force: true });
  }
}
export default new DragAndDropPage();
