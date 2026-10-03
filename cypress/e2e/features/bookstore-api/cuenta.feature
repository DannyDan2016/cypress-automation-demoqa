# language: es
@regression
Característica: Book Store API - Cuenta
  Como cliente de la API del Book Store
  quiero gestionar cuentas de usuario
  para operar con colecciones de libros

  # Cada escenario crea usuarios con nombre único y un hook los borra al terminar.

  @smoke @tc-api-004
  Escenario: Crear un usuario con una contraseña válida
    Cuando creo un usuario temporal con la contraseña "valida"
    Entonces la API responde con el estado "creado"
    Y la respuesta cumple el contrato "usuario-creado"
    Y la respuesta corresponde al usuario creado y sin libros

  @negative @tc-api-005
  Esquema del escenario: Rechazar una contraseña que no cumple la política
    Cuando intento crear un usuario temporal con la contraseña "<contrasena>"
    Entonces la API responde con el estado "solicitud_incorrecta"
    Y la respuesta cumple el contrato "mensaje"
    Y el error de la API es "politica_contrasena"

    Ejemplos:
      | contrasena    |
      | corta         |
      | sin_mayuscula |
      | sin_digito    |
      | sin_especial  |

  @smoke @tc-api-008
  Escenario: Generar un token para un usuario existente
    Dado que existe un usuario temporal
    Cuando genero un token con sus credenciales
    Entonces la API responde con el estado "ok"
    Y la respuesta cumple el contrato "token"
    Y el token se generó con éxito

  @tc-api-026
  Escenario: Borrar un usuario impide volver a consultarlo
    Dado que existe un usuario temporal con sesión en la API
    Cuando borro su cuenta
    Entonces la API responde con el estado "sin_contenido"
    Y consultar su cuenta responde "no_autorizado" con el error "usuario_no_encontrado"

  # Defecto real (verificado el 2026-10-01): con una contraseña errónea GenerateToken responde
  # 200 con token null y status "Failed" en lugar de 401. Se comprueba el comportamiento
  # correcto; @known-bug lo excluye del run por defecto (npm run test:known-bugs lo ejecuta).
  @negative @known-bug @tc-api-009
  Escenario: Generar un token con una contraseña errónea se rechaza como no autorizado
    Dado que existe un usuario temporal
    Cuando genero un token con una contraseña errónea
    Entonces la API responde con el estado "no_autorizado"
