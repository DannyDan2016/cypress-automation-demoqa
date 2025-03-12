class ModalDialogsPage {
    visitar() {
    cy.visit('/modal-dialogs');
    }
    abrirModalPequeno() {
    cy.get('#showSmallModal').click();
    }
    cerrarModal() {
    cy.get('#closeSmallModal').click();
    }
}
export default new ModalDialogsPage();