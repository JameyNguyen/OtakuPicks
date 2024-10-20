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

// Append cards to the container

document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('animeCatalog');
    // Create a new row
    let currentRow = document.createElement('div');
    currentRow.classList.add('row'); // Use Bootstrap's row class

    animeList.forEach((anime, index) => {
        // Create the card element
        const cardHtml = animeCard(anime);
        const cardElement = document.createElement('div');
        cardElement.innerHTML = cardHtml;
        
        // If it's the first card in a row, add the row to the container
        if (index % 3 === 0 && index !== 0) {
            // Append the current row to the container and start a new row
            cardContainer.appendChild(currentRow);
            currentRow = document.createElement('div');
            currentRow.classList.add('row');
        }
        
        // Append the card to the current row
        currentRow.appendChild(cardElement.firstElementChild); // This gets the first child (the card)
        
        console.log(anime.text);
    });

    // Append the last row if it has cards
    if (currentRow.childElementCount > 0) {
        cardContainer.appendChild(currentRow);
    }
});
