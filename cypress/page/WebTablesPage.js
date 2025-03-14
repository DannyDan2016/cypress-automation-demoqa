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
tablaCuerpo: () => cy.get(".rt-tbody"),
filaUsuario: (nombre) => cy.contains(".rt-tbody .rt-tr", nombre), // Buscar usuario por nombre en la tabla
botonEliminar: (nombre) => cy.contains(".rt-tbody .rt-tr", nombre).find('span[id^="delete-record-"]'),
mensajeNoDatos: () => cy.get(".rt-noData") // Mensaje cuando no hay datos en la tabla
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

// Método para verificar que un usuario fue eliminado
verificarUsuarioEliminado() {
this.elements.mensajeNoDatos().should("contain", "No rows found");
}
}

