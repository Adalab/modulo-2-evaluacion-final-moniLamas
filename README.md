# modulo-2-evaluacion-final-moniLamas
## Evaluación final del módulo 2 de Moni Lamas

Desarrollar una aplicación web de búsqueda de series de TV, que nos permite marcar y desmarcar las series como favoritas y guardarlas en local storage.

### Preview 
He diseñado y desarrollado __Tv browser. Tu buscador de series__

![Tv browser](./docs/assets/images/preview.png "Tv browoser").

### 1. Estructura básica
En primer lugar hay que realizar una estructura básica sobre este modelo. No hay que preocuparse por las medidas, colores ni tipografía hasta un hito posterior.
La aplicación de búsqueda de series consta de dos partes:
  1. Un campo de texto y un botón para buscar series por su título.
  2. Un listado de resultados de búsqueda donde aparece el cartel de la serie y el título.
  
### 2. Búsqueda
  - Al hacer clic sobre el botón de Buscar, la aplicación debe conectarse al API abierto de TVMaze para búsqueda de series. Os recomendamos echar un vistazo al JSON que devuelve una petición de búsqueda para ver qué datos son los que necesitamos: https://api.tvmaze.com/search/shows?q=girls
  - Para construir la URL de búsqueda hay que recoger el texto que ha introducido la usuaria en el campo de búsqueda.
  - Por cada show contenido en el resultado de la búsqueda hay que pintar una tarjeta donde mostramos una imagen de la serie y el título.
  - Mostrar siempre una imagen de la serie aunque el objeto no contenga una url
  - Para pintar la información en la página se puede elegir entre hacerlo de forma básica con innerHTML o manipulando de forma avanzada el DOM.
  
### 3. Favoritos
Una vez aparecen los resultados de búsqueda, la usuaria puede indicar cuáles son nuestras series favoritas. Para ello, al hacer clic sobre una serie debe pasar lo siguiente:
  - El color de fondo y el de fuente se intercambian, indicando que es una serie favorita.
  - Hay que mostrar un listado en la parte izquierda de la pantalla, debajo del formulario de búsqueda, con las series favoritas. Os recomendamos crear un variable o constante de tipo array en JS para almacenar las series favoritas.
  - Las series favoritas deben seguir apareciendo a la izquierda aunque la usuaria realice otra búsqueda.
  
### 4. Almacenamiento local
Hay que almacenar el listado de favoritos en el localStorage. De esta forma, al recargar la página el listado de favoritos se debe mostrarse.

### 5. BONUS: Borrar favoritos
Como bonus, os proponemos la opción de borrar favoritos. Al hacer clic sobre el icono de una 'x' al lado de cada favorito, hay que borrar el favorito clicado de la lista y del localStorage.
Para terminar de rematar nuestra app de series, nos gustaría poder añadir/quitar como favorito al hacer clic sobre una serie del lado de la derecha. Y que, si realizamos una nueva búsqueda y sale una serie que ya es favorita, aparezca ya resaltada en los resultados de búsqueda (con colores de fondo y texto intercambiados).
Y ya sería fantástico si al final de la lista de favoritos hay un botón para borrarlos todos los favoritos a la vez.

### 6. BONUS: Afinar la maquetación
Una vez terminada la parte de interacción, podemos centrarnos en la parte de maquetación donde tenéis libertad para decidir los estilo. En cualquier caso os dejamos una propuesta gráfica.
