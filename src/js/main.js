'use strict';

const results = document.querySelector('.js_results');
const input = document.querySelector('.js_input');
const button = document.querySelector('.js_btn');
const showResults = document.querySelector('.js_showResults');

let dataSeries = [];

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
        const newTitle = document.createElement('h4');
        const img = document.createElement('img');
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
}

function handleSearch(event) {
    event.preventDefault();
    getFromApi();
}

button.addEventListener('click', handleSearch);

//////////////////////////////////////////////////////
//Funciones para escuchar y guardar favoritos
function handleSerie(event) {
    console.log(event.currentTarget.id);
}

function listenSeries() {
    const listSeries = document.querySelectorAll('.js_showResults');
    for (const serieEl of listSeries) {
        serieEl.addEventListener('click', handleSerie);
    }
}