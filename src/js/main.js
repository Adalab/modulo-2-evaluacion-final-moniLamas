'use strict';

// const results = document.querySelector('.js_results');
const input = document.querySelector('.js_input');
const button = document.querySelector('.js_btn');
const showResults = document.querySelector('.js_showResults');

let dataSeries = [];
let favourites = [];

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
    for (let i = 0; i < dataSeries.length; i++) {
        const newItem = document.createElement('li');
        newItem.classList.add('js_serie');
        const newTitle = document.createElement('h4');
        const img = document.createElement('img');
        showResults.appendChild(newItem);
        newTitle.innerHTML = dataSeries[i].show.name;
        newItem.appendChild(newTitle);
        newItem.class = 'js_serie';
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

function handleSearch(event) {
    event.preventDefault();
    getFromApi();
}

button.addEventListener('click', handleSearch);

//////////////////////////////////////////////
//Funciones para escuchar y guardar favoritos
function handleSerie(event) {
    event.currentTarget.classList.toggle('fav');
    const selectedSerie = parseInt(event.currentTarget.id);
    const objectClicked = dataSeries.find((serie) => {
        return serie.show.id === selectedSerie;
    });
    const favouritesFound = favourites.findIndex((fav) => {
        return fav.show.id === selectedSerie;
    });
    if (favouritesFound === -1) {
        favourites.push(objectClicked);
    } else {
        favourites.splice(favouritesFound, 1);
    }

    // classList.toggle('.fav');
    console.log(favourites);
}

function listenSeries() {
    //esta función se ejecutará tras pintar los resultados, para escuchar los eventos de la lista de resultados, esta lista es listSeries
    const listSeries = document.querySelectorAll('.js_serie');
    //listSeries es un array, vamos a recorrer el array con un blucle
    for (const serieEl of listSeries) {
        serieEl.addEventListener('click', handleSerie);
        //en la zona de resultados indico que se debe hacer dobleclick para guardar las favoritas
    }
}