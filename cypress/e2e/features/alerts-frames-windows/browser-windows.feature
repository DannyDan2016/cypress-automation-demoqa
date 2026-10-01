# language: es
@regression
Característica: Browser Windows
  Como usuario de DemoQA
  quiero abrir contenido en pestañas y ventanas nuevas
  para consultarlo sin perder la página actual

  # Cypress no controla pestañas ni ventanas nuevas: se sustituye window.open por un stub,
  # se comprueba qué URL se pidió abrir y después se visita esa página en la misma pestaña.

  Antecedentes:
    Dado que estoy en la página "Browser Windows"

  @smoke @tc-afw-002
  Escenario: New Window abre la página de ejemplo
    Cuando abro una "ventana" desde Browser Windows
    Entonces se pide abrir la página de ejemplo en un destino nuevo
    Y la página de ejemplo muestra su encabezado

  @tc-afw-001
  Escenario: New Tab abre la página de ejemplo
    Cuando abro una "pestana" desde Browser Windows
    Entonces se pide abrir la página de ejemplo en un destino nuevo
    Y la página de ejemplo muestra su encabezado
