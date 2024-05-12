const apiUrl = 'https://api.tvmaze.com/shows/83/episodes';
const btnRandom1 = document.querySelector('.btn-random-1');
const mainBox = document.querySelector('.contentBox');

let idsArray = [];
let idsArrayEpisode = [];

// extracting parameters from url
const urlSearchParams = new URLSearchParams(window.location.search);
const urlId = urlSearchParams.get("id");

if(btnRandom1){
    btnRandom1.addEventListener('click', () => {
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
            
            data.forEach(element => {
                idsArray.push({
                    id: element.id,
                    title: element.name,
                    image: element.image,
                    description: element.summary,
                    season: element.season,
                    episode: element.number
                });
                
            });
            
            idsArray.forEach((episode) => {
                if(urlId == episode.id){
                    createEpisodeBox(episode);
                }
            }) 
        })    
}

function createEpisodeBox(episode){
    const section = document.createElement('section');
    mainBox.appendChild(section);

    const contentBoxHeader = document.createElement('div');
    contentBoxHeader.className = ('contentBoxHeader');
    section.appendChild(contentBoxHeader); 

    const labelsBox = document.createElement('div');
    labelsBox.className = ('labelsBox');
    contentBoxHeader.appendChild(labelsBox);

    const h6Season = document.createElement('h6');
    const h6SeasonText = document.createTextNode('S' + episode.season);
    labelsBox.appendChild(h6Season);
    h6Season.appendChild(h6SeasonText);

    const h6Episode = document.createElement('h6');
    const h6EpisodeText = document.createTextNode('E' + episode.episode);
    labelsBox.appendChild(h6Episode);
    h6Episode.appendChild(h6EpisodeText);

    const contentBoxMain = document.createElement('div');
    contentBoxMain.className = ('contentBoxMain');
    section.appendChild(contentBoxMain); 

    const h1 = document.createElement('h1');
    const h1Text = document.createTextNode(episode.title);
    contentBoxMain.appendChild(h1); 
    h1.appendChild(h1Text);
    
    const contentBoxCard = document.createElement('div');
    contentBoxCard.className = ('contentBoxCard');
    contentBoxMain.appendChild(contentBoxCard); 

    const img = document.createElement('img');
    img.className = ('episodeImg');
    img.setAttribute('alt', episode.title);
    img.src = episode.image.medium;
    contentBoxCard.appendChild(img);

    const infoBox = document.createElement('div');
    infoBox.className = ('infoBox');
    contentBoxCard.appendChild(infoBox);

    const p = document.createElement('p');
    const pText = document.createTextNode(episode.description.slice(3, -4));
    infoBox.appendChild(p);
    p.appendChild(pText);

    const contentBoxButton = document.createElement('div');
    contentBoxButton.className = ('contentBoxButton');
    section.appendChild(contentBoxButton); 

    const button = document.createElement('button');
    button.className = ('btn-random-2');
    contentBoxButton.appendChild(button); 

    const span = document.createElement('span');
    const spanText = document.createTextNode('RANDOM EPISODE');
    button.appendChild(span); 
    span.appendChild(spanText);

    button.addEventListener('click', () => {
       
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach(element => {
                    idsArrayEpisode.push(element.id);
                });
                debugger
                // Generate a random index
                let randomIndex = Math.floor(Math.random() * idsArrayEpisode.length);
    
                // Select the random ID
                let randomID = idsArrayEpisode[randomIndex];

                window.location.href = `./episode.html?id=${randomID}`;
            })
    });
    
}
