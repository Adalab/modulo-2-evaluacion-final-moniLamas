'use strict';

const input = document.querySelector('.js_input');
const button = document.querySelector('.js_btn');
const showResults = document.querySelector('.js_showResults');
const showFavorites = document.querySelector('.js_showFav');
const resetBtnFav = document.querySelector('js_btnReset');

let dataSeries = [];
let favorites = [];

/////////////////////////////////////
//Funciones para escuchar el input, crear response.json y pintar los resultados en la zona de resultados con imagen y título.

function getFromApi() {
    let search = input.value;
    fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
        .then(response => response.json())
        .then((data) => {
            dataSeries = data;
            renderSearch();
        })
}

function renderSearch() {
    showResults.innerHTML = ''; // vacia el contenido del contenedor
    for (let i = 0; i < dataSeries.length; i++) {
        const newItem = document.createElement('li');
        const newTitle = document.createElement('h4');
        const img = document.createElement('img');
        newItem.classList.add('js_serie');
        showResults.appendChild(newItem);
        newTitle.innerHTML = dataSeries[i].show.name;
        newItem.appendChild(newTitle);
        newItem.id = dataSeries[i].show.id;
        newItem.appendChild(img);
        img.style = 'width: 160px';
        img.alt = `Imagen de ${dataSeries[i].show.name}`

        if (dataSeries[i].show.image === null) {
            img.src = 'https://via.placeholder.com/160x224.png';
        } else {
            img.src = dataSeries[i].show.image.medium;
        }
    }
    listenSeries(); //función para escuchar la selección de favoritas
}

///////////////////////////////////////
//Función para pintar los favoritos en su sección
function renderFavourite() {
    showFavorites.innerHTML = '';
    for (let i = 0; i < favorites.length; i++) {
        const newItem = document.createElement('li');
        const newTitle = document.createElement('h4');
        const img = document.createElement('img');
        // newItem.classList.add('js_serie');
        showFavorites.appendChild(newItem);
        newTitle.innerHTML = favorites[i].show.name;
        newItem.appendChild(newTitle);
        newItem.id = favorites[i].show.id;
        newItem.appendChild(img);
        img.style = 'width: 120px';
        img.alt = `Imagen de ${favorites[i].show.name}`

        if (favorites[i].show.image === null) {
            img.src = 'https://via.placeholder.com/120.png';
        } else {
            img.src = favorites[i].show.image.medium;
        }
    }

}

function handleSearch(event) {
    event.preventDefault();
    getFromApi();
}

button.addEventListener('click', handleSearch);

//////////////////////////////////////////////
//Funciones para escuchar y guardar favoritos
function handleSerie(event) {
    //añado clase para que destaque la sección de favoritas en los resultados
    event.currentTarget.classList.toggle('fav');
    //creo un nuevo array de las selecionadas parseando datos de string a número
    const selectedSerie = parseInt(event.currentTarget.id);
    //busco el objeto que contiene el elemento clicado en dataSeries(datos del json)
    const objectClicked = dataSeries.find((serie) => {
        return serie.show.id === selectedSerie;
    });
    // busco si la seleccionada está en el array de favoritos.
    const favoritesFound = favorites.findIndex((fav) => {
        return fav.show.id === selectedSerie;
    });
    //si la paleta no está en favoritos findIndex me ha devuelto -1
    if (favoritesFound === -1) {
        // añado al array de favoritos
        favorites.push(objectClicked);
        // si el findIndex me ha devuelto un número mayor o igual a 0 es que sí está en el array de favoritos
        // quiero sacarlo de array de favoritos
        // para utilizar splice necesito el índice del elemento que quiero borrar
        // y quiero borrar un solo elemento por eso colocamos 1
    } else {
        favorites.splice(favoritesFound, 1);
    }
    renderFavourite();
    setInLocalStorage();

}


function listenSeries() {
    //esta función se ejecutará tras pintar los resultados, para escuchar los eventos de la lista de resultados, esta lista es listSeries
    const listSeries = document.querySelectorAll('.js_serie');
    //listSeries es un array, vamos a recorrer el array con un blucle
    for (const serieEl of listSeries) {
        serieEl.addEventListener('click', handleSerie);
    }
}

///////////////////////////////////
// LocalStorage
function setInLocalStorage() {
    //parseo el array de favorites en string
    const stringFavorites = JSON.stringify(favorites);
    //guardo estos datos en local
    localStorage.setItem('favorites', stringFavorites);
}

//Buscar en localStorage para no hacer petición al servidor cada vez que cargue la página
function getLocalStorage() {
    //obtenemos lo que hay en el LS
    const localStorageFav = localStorage.getItem('favorites');
    //comprobar si son datos válidos, si es la primera vez que entro será null
    if (localStorageFav === null) {
        //al no tener datos, llamo a la Api
        getFromApi();
    } else {
        //si hay datos, los parseo a un array y lo guard oen la variable global
        const arrayFav = JSON.parse(localStorageFav);
        favorites = arrayFav;
        //cada vez que modifico el array vuelvo a pintar 
        renderFavourite();
    }
}



/////////////////
//Función para escuchar el click del botón de 
// me dá un error en el addEventListener y me resetea el localStorage al recargar la página. No me ha dado tiempo a encontrar la solución

// function handleResetFav(event) {
//     event.preventDefault();
//     favorites = [];
//     localStorage.removeItem('favorites');
//     renderFavourite();
// }

// resetBtnFav.addEventListener('click', handleResetFav);

getLocalStorage();