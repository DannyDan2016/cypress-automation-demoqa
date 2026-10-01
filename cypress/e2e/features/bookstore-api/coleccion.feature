# language: es
@regression
Característica: Book Store API - Colección
  Como usuario autenticado del Book Store
  quiero añadir y quitar libros de mi colección
  para mantener mi lista de lectura

  Antecedentes:
    Dado que existe un usuario temporal con sesión en la API

  @smoke @tc-api-017
  Escenario: Añadir un libro a la colección
    Cuando añado el libro "git_pocket_guide" a su colección
    Entonces la API responde con el estado "creado"
    Y la respuesta cumple el contrato "libros-anadidos"
    Y su colección contiene el libro "git_pocket_guide"

  @tc-api-022
  Escenario: Borrar un libro de la colección
    Dado que su colección contiene el libro "git_pocket_guide"
    Cuando borro el libro "git_pocket_guide" de su colección
    Entonces la API responde con el estado "sin_contenido"
    Y su colección está vacía
