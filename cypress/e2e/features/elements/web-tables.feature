# language: es
@regression
Característica: Web Tables
  Como usuario de DemoQA
  quiero gestionar los registros de una tabla
  para mantener la información de los empleados al día

  Antecedentes:
    Dado que estoy en la página "Web Tables"

  @smoke @tc-elem-031
  Escenario: Registrar un empleado lo añade a la tabla
    Cuando registro en Web Tables el caso "alta_valida"
    Entonces la tabla muestra la fila del caso "alta_valida"

  @tc-elem-037
  Escenario: Buscar por nombre filtra la tabla
    Dado que registré en Web Tables el caso "alta_valida"
    Cuando busco en Web Tables según la búsqueda "por_nombre_registrado"
    Entonces la tabla muestra solo las filas de la búsqueda "por_nombre_registrado"

  @tc-elem-036
  Escenario: Eliminar un registro lo quita de la tabla
    Dado que registré en Web Tables el caso "alta_valida"
    Cuando elimino de Web Tables la fila del caso "alta_valida"
    Entonces la tabla ya no muestra la fila del caso "alta_valida"
