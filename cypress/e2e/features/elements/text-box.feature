# language: es
@regression
Característica: Text Box
  Como usuario de DemoQA
  quiero enviar mis datos de contacto
  para verlos reflejados en la salida del formulario

  Antecedentes:
    Dado que estoy en la página "Text Box"

  Esquema del escenario: Enviar datos válidos los muestra en la salida
    Cuando completo Text Box con el caso "<caso>"
    Y envío el formulario de Text Box
    Entonces la salida de Text Box coincide con el caso "<caso>"

    @smoke @tc-elem-001
    Ejemplos: Datos completos
      | caso   |
      | valido |

    @tc-elem-005
    Ejemplos: Unicode y HTML se muestran como texto literal
      | caso                  |
      | caracteres_especiales |

  @negative @tc-elem-002
  Esquema del escenario: Un email con formato inválido se marca y no genera salida
    Cuando completo Text Box con el caso "<caso>"
    Y envío el formulario de Text Box
    Entonces el email de Text Box se marca como inválido
    Y Text Box no muestra ninguna salida

    Ejemplos:
      | caso              |
      | email_sin_dominio |
      | email_sin_arroba  |
      | email_sin_usuario |
