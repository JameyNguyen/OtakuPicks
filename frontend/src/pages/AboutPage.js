import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import videoSource from "../videos/1720911083706.gif";

function AboutPage() {

  useEffect(() => {
    const expandState = { expand: false };

    const toggleExpand = (id) => {
      const element = document.getElementById(id);
      element.classList.toggle('expand');
      expandState.expand = !expandState.expand;
      document.body.style.overflow = expandState.expand ? 'hidden' : 'auto';
      console.log(expandState.expand ? "stop scrolling" : "keep scrolling");
    };

    document.getElementById('jamey').addEventListener('click', () => toggleExpand('jamey'));
    document.getElementById('henry').addEventListener('click', () => toggleExpand('henry'));

    const importAuthorData = async () => {
      try {
        const response = await fetch("data/authors.json");
        const authors = await response.json();
        loadAuthors(authors);
      } catch (error) {
        console.error("BIG PROBLEM: ", error);
      }
    };

    const loadAuthors = (data) => {
      data.forEach(author => {
        const card = document.getElementById(author.id);
        card.innerHTML = `
          <div class="author-container">
            <img src="${author.picture}" alt="${author.name}'s picture" class="author-picture">
            <div class="author-info">
              <h2 class="author-name">${author.name}</h2>
              <h3 class="author-title">Junior Computer Science Student</h3>
              <p class="author-bio">${author.biography}</p>
              <div class="author-contact">
                <button class="email-button">
                  <a href="mailto:${author.email}">Email ${author.name}</a>
                </button>
                <small class="text-muted">At ${author.email}. Last updated: 10/20/2024. </small>
              </div>
            </div>
          </div>`;
      });
    };

    importAuthorData();
  }, []);

  return (
    <>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>About The Authors of Otaku Picks</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <script src="https://use.fontawesome.com/releases/v6.3.0/js/all.js" crossOrigin="anonymous"></script>
        <link href="https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800" rel="stylesheet" />
        <link href="styles/styles.css" rel="stylesheet" />
        <link href="styles/custom.css" rel="stylesheet" />
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
          <div className="container px-4 px-lg-5">
            <Link className="navbar-brand" to="/">Otaku Picks</Link>            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              Menu
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto py-4 py-lg-0">
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">Home</Link></li>
                <li className="nav-item">
                  <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/animeguessr">AnimeGuessr</Link>
                </li>
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/catalog">Our Picks</Link></li>
                <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">About Us</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <header className="masthead" style={{ backgroundImage: "url('assets/img/about-bg.jpg')", position: "relative", overflow: "hidden" }}>
          <img src={videoSource} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} alt="Description of GIF" />
          <div className="container position-relative px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <div className="page-heading">
                  <h1>About Us</h1>
                  <span className="subheading">Meet the Authors!</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="container marketing" style={{ paddingTop: "75px" }}>
          <div className="row">
            <div className="col-lg-4 smallAbout" id="jamey"></div>
            <div className="col-lg-4 smallAbout" id="henry" style={{ textAlign: "right", marginLeft: "auto" }}>
              <img src="pictures/Henry.jpg" width="280" height="280" alt="Henry" />
            </div>
          </div>
        </div>
        <footer className="border-top">
          <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
              <div className="col-md-10 col-lg-8 col-xl-7">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <a href="https://github.com/JameyNguyen/OtakuPicks">
                      <span className="fa-stack fa-lg">
                        <i className="fas fa-circle fa-stack-2x">Our Github</i>
                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                      </span>
                    </a>
                  </li>
                </ul>
                <div className="small text-center text-muted fst-italic">Otaku Picks 2024</div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </>
  );
}

export default AboutPage;
