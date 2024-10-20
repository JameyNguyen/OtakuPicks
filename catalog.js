const animeCard = (anime) => {
    return `
        <div class="col">
            <div class="card shadow-sm h-100 rounded-0 d-flex flex-column" style="max-width: 350px">
                <img src="${anime.image}" class="bd-placeholder-img card-img-top" style="max-height: 400px; min-width: 200px; object-fit: contain;" alt="Anime image"/>
                <div class="card-body">
                    <p class="card-text">${anime.text}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <!-- Button can be added here if needed -->
                        </div>
                        <small class="text-body-secondary">${anime.smallText}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
};



// Example data
const animeList = [
    { image: './images/K-On.jpg', text: 'K-On!', smallText: 'Enter text' },
    { image: './images/Toradora.jpg', text: 'Toradora!', smallText: 'Enter text' },
    { image: './images/Bakemonogatari.jpg', text: 'Bakemonogatari', smallText: 'Enter text' },
    { image: './images/Frieren.jpg', text: 'Sousou no Frieren', smallText: 'Enter text' },
    { image: './images/Eva.jpg', text: 'Neon Genesis Evangelion', smallText: 'Enter text' },
    { image: './images/VEG.jpg', text: 'Violet Evergarden', smallText: 'Enter text' },
];


function importAnimeData(callback)
{
    fetch("data/data.json")
    .then(response => response.json())
    .then(animes => loadAnimes(animes, callback)) // get the animes
    .catch(error => console.log("BIG PROBLEM: " + error))
}

function loadAnimes(data, callback)
{
    const cardContainer = document.getElementById('animeCatalog');

    let currentRow = document.createElement('div');
    currentRow.classList.add('row');
    
    data.forEach((anime, index) => {
        /* Create a card element and div using an anime constant class defined above */
        let cardHtml = animeCard(anime);
        let cardElement = document.createElement('div');

        cardElement.innerHTML = cardHtml;

        if (index % 3 === 0 && index !== 0)
        {
            // At index 3, 6, 9, ... you are at the end of the row and u want to start a new row after this
            cardContainer.appendChild(currentRow);
            currentRow = document.createElement('div');
            currentRow.classList.add('row');
        }
        currentRow.appendChild(cardElement.firstElementChild); // This gets the first child (the card)
    });

    if (currentRow.childElementCount > 0)
    {
        cardContainer.appendChild(currentRow);
    }

    if (callback)
    {
        callback();
    }
}

document.addEventListener('DOMContentLoaded', () =>
{
    importAnimeData();
})
