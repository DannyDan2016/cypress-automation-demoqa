# language: es
@regression
Característica: Dynamic Properties
  Como usuario de DemoQA
  quiero que los botones cambien de estado pasado un tiempo
  para comprobar elementos que dependen de temporizadores

  # El reloj del navegador se controla con cy.clock/cy.tick: no hay esperas reales de 5 s.

  Antecedentes:
    Dado que controlo el reloj del navegador
    Y que estoy en la página "Dynamic Properties"

  @tc-elem-090
  Escenario: Al cargar, los botones dinámicos están en su estado inicial
    Entonces los botones dinámicos están en su estado inicial

  @smoke @tc-elem-091 @tc-elem-092 @tc-elem-093
  Escenario: Al cumplirse el retardo los botones cambian de estado
    Cuando el reloj avanza el retardo de las propiedades dinámicas
    Entonces los botones dinámicos están en su estado final
