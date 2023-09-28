const apiUrl = 'https://api.tvmaze.com/shows/83/episodes';
const btnRandom = document.querySelector('.btn-random');
const mainBox = document.querySelector('.box');

let idsArray = [];

// extracting parameters from url
const urlSearchParams = new URLSearchParams(window.location.search);
const urlId = urlSearchParams.get("id");

if(btnRandom){
    btnRandom.addEventListener('click', () => {
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    idsArray.push(element.id);
                });
                
                // Generate a random index
                let randomIndex = Math.floor(Math.random() * idsArray.length);
    
                // Select the random ID
                let randomID = idsArray[randomIndex];

                window.location.href = `./episode.html?id=${randomID}`;
            })
    })
}

if(mainBox){
    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.forEach(element => {
                idsArray.push({
                    id: element.id,
                    title: element.name,
                    image: element.image,
                    description: element.summary.slice(3, -4),
                    season: element.season,
                    episode: element.number
                });
                
            });
            
            //console.log(idsArray)
            idsArray.forEach((episode) => {
                //console.log(episode)
                if(urlId == episode.id){
                    createEpisodeBox(episode);
                }
            })
        })
    
}

function createEpisodeBox(episode){
    const section = document.createElement('section');
    mainBox.appendChild(section);

    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode(episode.title);
    section.appendChild(h1); 
    h1.appendChild(h1Text);
    

    const mainDiv = document.createElement('div');
    mainDiv.className = ('contentBox');
    section.appendChild(mainDiv); 

    const img = document.createElement('img');
    img.className = ('episodeImg');
    img.setAttribute('alt', episode.title);
    img.src = episode.image.medium;
    mainDiv.appendChild(img);

    const subDiv = document.createElement('div');
    subDiv.className = ('infoBox');
    mainDiv.appendChild(subDiv);

    const p = document.createElement('p');
    const pText = document.createTextNode(episode.description);
    subDiv.appendChild(p);
    p.appendChild(pText);

    const infoDiv = document.createElement('div');
    infoDiv.className = ('cardsBox');
    subDiv.appendChild(infoDiv);

    const h6Season = document.createElement('h6');
    const h6SeasonText = document.createTextNode('S' + episode.season);
    infoDiv.appendChild(h6Season);
    h6Season.appendChild(h6SeasonText);

    const h6Episode = document.createElement('h6');
    const h6EpisodeText = document.createTextNode('E' + episode.episode);
    infoDiv.appendChild(h6Episode);
    h6Episode.appendChild(h6EpisodeText);
}
