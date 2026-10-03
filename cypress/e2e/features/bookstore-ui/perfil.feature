# language: es
@regression
Característica: Book Store - Perfil
  Como lector registrado
  quiero ver y gestionar mi colección desde el perfil
  para saber qué libros tengo guardados

  # El alta por UI tiene reCAPTCHA v3: el usuario y su colección se preparan por API, la
  # sesión se inyecta con cookies (cy.session) y un hook borra el usuario al terminar.

  Antecedentes:
    Dado que existe un usuario temporal con el libro "git_pocket_guide" en su colección
    Y que inicié sesión en el Book Store con ese usuario
    Y que estoy en la página "Profile"

  @smoke @tc-bs-014
  Escenario: El perfil muestra el usuario y la colección preparada por API
    Entonces el perfil muestra el nombre del usuario
    Y el perfil lista el libro "git_pocket_guide"

  @tc-bs-017
  Escenario: Eliminar un libro desde el perfil lo quita de la colección
    Cuando elimino el libro "git_pocket_guide" desde el perfil y confirmo
    Entonces el Book Store avisa "libro_eliminado"
    Y el perfil ya no lista el libro "git_pocket_guide"
    Y su colección está vacía
