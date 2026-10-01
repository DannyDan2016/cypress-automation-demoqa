# language: es
@regression
Característica: Practice Form
  Como estudiante
  quiero registrarme con el formulario de práctica
  para recibir la confirmación de los datos enviados

  Antecedentes:
    Dado que estoy en la página "Practice Form"

  @smoke @tc-form-001
  Escenario: Enviar el formulario completo muestra la confirmación con todos los datos
    Cuando envío el Practice Form con el caso "completo"
    Entonces el modal de confirmación muestra los datos del caso "completo"

  @negative @tc-form-003
  Escenario: Enviar el formulario vacío marca los campos obligatorios
    Cuando envío el Practice Form con el caso "vacio"
    Entonces el Practice Form marca como inválidos los campos del caso "vacio"
    Y no se muestra el modal de confirmación
