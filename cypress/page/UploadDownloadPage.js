class UploadDownloadPage {
    visitar() {
    cy.visit('/upload-download');
    }
    subirArchivo(ruta) {
    cy.get('#uploadFile').attachFile(ruta);
    }
    descargarArchivo() {
    cy.get('#downloadButton').click();
    }
}
export default new UploadDownloadPage();