'use strict';

const results = document.querySelector('.js_results');
const input = document.querySelector('.js_input');
const btn = document.querySelector('.js_btn');
const showResults = document.querySelector('.js_showResults');



function handleSearch(event) {
    event.preventDefault();
    let search = input.value;

    fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
        .then(response => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const newItem = document.createElement('li');
                const newTitle = document.createElement('h4');
                newTitle.innerHTML = data[i].show.name;
                newItem.appendChild(newTitle);
                showResults.appendChild(newItem);
                let img = document.createElement('img');
                newItem.appendChild(img);
                img.style = 'width: 160px';
                img.src = data[i].show.image.medium;
                img.alt = `Imagen de ${data[i].show.name}`;
            }

        })

}


btn.addEventListener('click', handleSearch);