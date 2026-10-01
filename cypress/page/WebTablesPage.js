/// <reference types="cypress" />

export class WebTablesPage {
// Definición de selectores como funciones para mejor reutilización
elements = {
btnAgregar: () => cy.get("#addNewRecordButton"), // Botón para agregar nuevo usuario
inputNombre: () => cy.get("#firstName"),
inputApellido: () => cy.get("#lastName"),
inputEmail: () => cy.get("#userEmail"),
inputEdad: () => cy.get("#age"),
inputSalario: () => cy.get("#salary"),
inputDepartamento: () => cy.get("#department"),
botonEnviar: () => cy.get("#submit"),
inputBusqueda: () => cy.get("#searchBox"),
// Tras el rediseño, DemoQA usa una <table> HTML (antes react-table con .rt-*)
tablaCuerpo: () => cy.get(".web-tables-wrapper table tbody"),
filasTabla: () => cy.get(".web-tables-wrapper table tbody tr"),
filaUsuario: (nombre) => cy.contains(".web-tables-wrapper table tbody tr", nombre), // Buscar usuario por nombre en la tabla
botonEliminar: (nombre) => cy.contains(".web-tables-wrapper table tbody tr", nombre).find('span[id^="delete-record-"]')
};

// Método para abrir el formulario de agregar un nuevo usuario
abrirFormularioNuevoRegistro() {
this.elements.btnAgregar().click();
}

// Método para llenar el formulario de nuevo usuario y enviarlo
llenarFormulario(datos) {
this.elements.inputNombre().clear().type(datos.nombre);
this.elements.inputApellido().clear().type(datos.apellido);
this.elements.inputEmail().clear().type(datos.email);
this.elements.inputEdad().clear().type(datos.edad);
this.elements.inputSalario().clear().type(datos.salario);
this.elements.inputDepartamento().clear().type(datos.departamento);
this.elements.botonEnviar().click();
}

// Método para verificar que un usuario esté en la tabla
verificarRegistroEnTabla(nombre) {
this.elements.filaUsuario(nombre).should("exist");
}

// Método para buscar un usuario en la tabla
buscarUsuario(nombre) {
this.elements.inputBusqueda().clear().type(nombre);
}

// Método para eliminar un usuario de la tabla
eliminarRegistro(nombre) {
this.elements.botonEliminar(nombre).click();
}

// Método para verificar que un usuario fue eliminado: con la búsqueda aplicada,
// la tabla queda sin filas (la nueva DemoQA ya no muestra "No rows found")
verificarUsuarioEliminado() {
this.elements.filasTabla().should("not.exist");
}
}

