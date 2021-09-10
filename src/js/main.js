'use strict';

const results = document.querySelector('.js_results');
const input = document.querySelector('.js_input');
const btn = document.querySelector('.js_btn');




function handleSearch(event) {
    event.preventDefault();
    let search = input.value;
    let dataResults = [];

    fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            console.log(data[0].show.name);
            let title = document.querySelector('.js_title');
            title.innerHTML = data[0].show.name;
            let img = document.createElement('img');
            document.body.append(img);
            img.style = 'width: 160px';
            img.src = data[0].show.image.medium;
            img.alt = `Foto de ${title}`;
        })

}

btn.addEventListener('click', handleSearch);