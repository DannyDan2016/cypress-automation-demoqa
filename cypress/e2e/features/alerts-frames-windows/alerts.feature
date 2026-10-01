# language: es
@regression
Característica: Alerts
  Como usuario de DemoQA
  quiero responder a los diálogos nativos del navegador
  para que la página reaccione a mi respuesta

  Antecedentes:
    Dado que estoy en la página "Alerts"

  @smoke @tc-afw-010
  Escenario: La alerta simple muestra su mensaje
    Cuando abro la alerta simple
    Entonces el navegador muestra la alerta "simple"

  @tc-afw-011
  Escenario: La alerta temporizada solo aparece al cumplirse su retardo
    Dado que controlo el reloj del navegador
    Cuando abro la alerta temporizada
    Y el reloj avanza hasta justo antes del retardo de la alerta
    Entonces todavía no se ha mostrado ninguna alerta
    Cuando el reloj completa el retardo de la alerta
    Entonces el navegador muestra la alerta "temporizada"

  Esquema del escenario: La respuesta al cuadro de confirmación se refleja en la página
    Cuando respondo "<respuesta>" al cuadro de confirmación
    Entonces la página muestra el resultado de la confirmación "<respuesta>"

    @tc-afw-012
    Ejemplos: Aceptar
      | respuesta |
      | aceptar   |

    @negative @tc-afw-013
    Ejemplos: Cancelar
      | respuesta |
      | cancelar  |

  @tc-afw-014
  Escenario: El nombre introducido en el prompt se muestra en la página
    Cuando respondo al prompt con el caso "nombre_valido"
    Entonces la página muestra el resultado del prompt "nombre_valido"
