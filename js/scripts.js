/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})


/*
* Javascript to link to different pages on the blog's main homepage.
*/

/*
* This is javascript for Jamey on the About page.
*/
let expand = false;
document.getElementById('jamey').addEventListener('click', function()
{
    let jamey = document.getElementById('jamey')
    jamey.classList.toggle('expand')
    if (!expand)
    {
        document.body.style.overflow = 'hidden';
        expand = true;
        console.log("stop scrolling")
    }
    else
    {
        expand = false;
        document.body.style.overflow = 'auto';
        console.log("keep scrolling")
        console.log()
    }
});

/*
* This is javascript for Henry on the About page.
*/
document.getElementById('henry').addEventListener('click', function()
{
    //document.querySelector('.smallAbout').classList.toggle('expand')
    //this.document.classList.toggle('expand')
    let henry = document.getElementById('henry')
    henry.classList.toggle('expand')
    if (!expand)
    {
        document.body.style.overflow = 'hidden';
        expand = true;
        console.log("stop scrolling")
    }
    else
    {
        expand = false;
        document.body.style.overflow = 'auto';
        console.log("keep scrolling")
        console.log()
    }
});

window.onload = function()
{
    importAuthorData();
    //importAnimeData();
}

/*
* Used for loading author data in the about us page.
*/ 
function importAuthorData()
{
    fetch("data/authors.json")
    .then(response => response.json())
    .then(authors => loadAuthors(authors)) // get the authors dict
    .catch(error => console.log("BIG PROBLEM: " + error))
}

function loadAuthors(data)
{
    data.forEach(author => {
        let card = document.getElementById(author.id)
        card.innerHTML = 
        `<img src="${author.picture}" width="50%" height="50%">
            <h2 class="fw-normal">${author.name}</h2>
            <p><strong>${author.name}</strong> is a junior computer science student.<br>${author.biography}</p>
            <div>
                <small class="text-body-secondary">Email: ${author.email} <br> Date: 09/17/2024</small>
              </div>`
    });
}

/*
* This is used for the 'catalog.html' page to load anime data in.
*/
function importAnimeData()
{
    fetch("data/data.json")
    .then(response => response.json())
    .then(animes => loadAnimes(animes)) // get the animes
    .catch(error => console.log("BIG PROBLEM: " + error))
}

function loadAnimes(data)
{
    data.forEach(anime => {

    });
}