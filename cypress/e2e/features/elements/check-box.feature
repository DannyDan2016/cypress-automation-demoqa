# language: es
@regression
Característica: Check Box
  Como usuario de DemoQA
  quiero marcar nodos de un árbol de carpetas
  para elegir varios elementos a la vez

  Antecedentes:
    Dado que estoy en la página "Check Box"

  @smoke @tc-elem-010
  Escenario: Expandir la raíz muestra sus nodos hijos
    Cuando expando el nodo raíz del árbol
    Entonces el árbol muestra los nodos hijos de la raíz

  @tc-elem-012
  Escenario: Marcar un nodo padre marca también sus hijos
    Dado que expandí el nodo raíz del árbol
    Cuando marco los nodos del caso "padre_desktop"
    Entonces el árbol queda como indica el caso "padre_desktop"

  @tc-elem-011
  Escenario: Marcar varios nodos los deja seleccionados
    Dado que expandí el nodo raíz del árbol
    Cuando marco los nodos del caso "varios_nodos"
    Entonces el árbol queda como indica el caso "varios_nodos"

  @negative @tc-elem-014
  Escenario: Desmarcar un nodo lo quita de la selección
    Dado que expandí el nodo raíz del árbol
    Y que marqué los nodos del caso "desmarcar_documents"
    Cuando desmarco los nodos del caso "desmarcar_documents"
    Entonces el árbol queda como indica el caso "desmarcar_documents"
