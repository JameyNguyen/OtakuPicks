import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import videoSource from "../videos/1593469541316.mp4"

function CatalogPage() {

  useEffect(() => {
    const animeCard = (anime) => `
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
  
    const loadAnimes = (data) => {
      const cardContainer = document.getElementById("animeCatalog");
      cardContainer.innerHTML = ""; // Clear existing content to avoid duplication
      let currentRow = document.createElement("div");
      currentRow.classList.add("row");
  
      data.forEach((anime, index) => {
        const cardHtml = animeCard(anime);
        const cardElement = document.createElement("div");
        cardElement.innerHTML = cardHtml;
  
        if (index % 3 === 0 && index !== 0) {
          cardContainer.appendChild(currentRow);
          currentRow = document.createElement("div");
          currentRow.classList.add("row");
        }
        currentRow.appendChild(cardElement.firstElementChild);
      });
  
      if (currentRow.childElementCount > 0) {
        cardContainer.appendChild(currentRow);
      }
    };
  
    const importAnimeData = () => {
      fetch("/data/data.json")
        .then((response) => response.json())
        .then((data) => loadAnimes(data))
        .catch((error) => console.error("Error loading anime data:", error));
    };
  
    importAnimeData();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
        <div className="container px-4 px-lg-5">
          <Link className="navbar-brand" to="/">Otaku Picks</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/animeguessr">AnimeGuessr</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/catalog">Our Picks</Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About Us</Link>
              </li>
                            <li className="nav-item">
                              <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/loginsignup">Login</Link>
                            </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="masthead">
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.5,
          }}
        >
          <source src={videoSource} type="video/mp4" />
          Browser does not support the video tag.
        </video>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Our Top Picks</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="album py-5 bg-body-tertiary text-center">
          <div
            id="animeCatalog"
            className="row row-cols-auto justify-content-center"
            style={{ gap: "20px" }}
          >
            {/* Anime cards will be inserted here */}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-top">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <ul className="list-inline text-center">
                <li className="list-inline-item">
                  <a href="#!">
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                    </span>
                  </a>
                </li>
              </ul>
              <div className="small text-center text-muted fst-italic">
                Otaku Picks 2024
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CatalogPage;
