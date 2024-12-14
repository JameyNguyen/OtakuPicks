window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;

    window.addEventListener('scroll', function () {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove('is-visible'); // Fixed this line
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
});

// Define `animeCard` outside of an IIFE for global access
const animeCard = (anime) => {
    return `
        <div class="col">
            <div class="card shadow-sm h-100 rounded-0 d-flex flex-column" style="max-width: 350px">
                <img src="${anime.image}" class="bd-placeholder-img card-img-top" style="max-height: 400px; min-width: 200px; object-fit: contain;" alt="Anime image"/>
                <div class="card-body">
                    <p class="card-text">${anime.text}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group"></div>
                        <small class="text-body-secondary">${anime.smallText}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
};

function importAnimeData(callback) {
    fetch("data/data.json")
        .then(response => response.json())
        .then(animes => loadAnimes(animes, callback)) // get the animes
        .catch(error => console.log("BIG PROBLEM: " + error));
}

function loadAnimes(data, callback) {
    const cardContainer = document.getElementById('animeCatalog');
    let currentRow = document.createElement('div');
    currentRow.classList.add('row');

    data.forEach((anime, index) => {
        // Create a card element using `animeCard`
        let cardHtml = animeCard(anime);
        let cardElement = document.createElement('div');
        cardElement.innerHTML = cardHtml;

        if (index % 3 === 0 && index !== 0) {
            // Add row to container and create a new row
            cardContainer.appendChild(currentRow);
            currentRow = document.createElement('div');
            currentRow.classList.add('row');
        }
        currentRow.appendChild(cardElement.firstElementChild); // Append card to row
    });

    if (currentRow.childElementCount > 0) {
        cardContainer.appendChild(currentRow);
    }

    if (callback) {
        callback();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    importAnimeData();
});
