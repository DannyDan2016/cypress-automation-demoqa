# language: es
@regression
Característica: Buttons
  Como usuario de DemoQA
  quiero interactuar con botones mediante distintos tipos de clic
  para comprobar que cada uno se reconoce por separado

  Antecedentes:
    Dado que estoy en la página "Buttons"

  Esquema del escenario: Cada tipo de clic muestra su propio mensaje
    Cuando hago un "<tipo>" sobre su botón
    Entonces se muestra el mensaje del "<tipo>"

    @smoke @tc-elem-050
    Ejemplos: Doble clic
      | tipo       |
      | doble_clic |

    @tc-elem-051
    Ejemplos: Clic derecho
      | tipo         |
      | clic_derecho |

    @tc-elem-052
    Ejemplos: Clic simple en el botón dinámico
      | tipo          |
      | clic_dinamico |
