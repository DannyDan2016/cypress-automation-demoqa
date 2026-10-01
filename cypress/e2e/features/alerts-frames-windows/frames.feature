# language: es
@regression
Característica: Frames
  Como usuario de DemoQA
  quiero ver contenido incrustado en iframes
  para consultar otra página sin salir de la actual

  Antecedentes:
    Dado que estoy en la página "Frames"

  Esquema del escenario: Cada iframe muestra la página de ejemplo
    Entonces el frame "<frame>" muestra el encabezado de la página de ejemplo

    @smoke @tc-afw-020
    Ejemplos: Frame grande
      | frame  |
      | grande |

    @tc-afw-021
    Ejemplos: Frame pequeño
      | frame   |
      | pequeno |
