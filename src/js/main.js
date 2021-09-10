'use strict';

const results = document.querySelector('.js_results');
const input = document.querySelector('.js_input');
const button = document.querySelector('.js_btn');
const showResults = document.querySelector('.js_showResults');

let dataSeries = [];

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
        // const id = dataSeries[i].show.id;
        showResults.appendChild(newItem);
        newTitle.innerHTML = dataSeries[i].show.name;
        newItem.appendChild(newTitle);
        newItem.appendChild(img);
        img.style = 'width: 160px';
        img.alt = `Imagen de ${dataSeries[i].show.name}`
        img.id = dataSeries[i].show.id;

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