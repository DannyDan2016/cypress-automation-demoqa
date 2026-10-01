# language: es
@regression
Característica: Radio Button
  Como usuario de DemoQA
  quiero elegir una única opción
  para ver confirmada mi selección

  Antecedentes:
    Dado que estoy en la página "Radio Button"

  @smoke @tc-elem-020
  Esquema del escenario: Seleccionar una opción habilitada muestra su mensaje
    Cuando selecciono la opción "<opcion>" de Radio Button
    Entonces la opción "<opcion>" queda seleccionada con su mensaje

    Ejemplos:
      | opcion        |
      | si            |
      | impresionante |

  @negative @tc-elem-021
  Escenario: La opción "No" no se puede seleccionar
    Entonces la opción "no" de Radio Button está deshabilitada
