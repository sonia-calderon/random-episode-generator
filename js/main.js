const apiUrl = 'https://api.tvmaze.com/shows/83/episodes';
const btnRandom = document.querySelector('.btn-random');

btnRandom.addEventListener('click', () => {
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        })
})

