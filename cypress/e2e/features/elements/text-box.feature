# language: es
@regression
Característica: Text Box
  Como usuario de DemoQA
  quiero enviar mis datos de contacto
  para verlos reflejados en la salida del formulario

  Antecedentes:
    Dado que estoy en la página "Text Box"

  @smoke @tc-elem-001
  Escenario: Enviar el formulario con datos válidos
    Cuando completo Text Box con el caso "valido"
    Y envío el formulario de Text Box
    Entonces la salida de Text Box coincide con el caso "valido"
