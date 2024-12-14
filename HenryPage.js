import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import MonogatariImage from "../images/GTaspwbbkAAg8Ry.jpeg";
import EvangelionImage from "../images/IMG_20190713_180025.jpg";
import KOnImage from "../images/GSfrPp_WgAE8bBT.jpeg";
import videoSource from "../videos/Nadeko playing.webm";

function HenryPage() {
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
            </ul>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="smallmastHead" style={{ position: 'relative', overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '550px',
            objectFit: 'cover',
            opacity: 0.5,
          }}
        >
          <source src={videoSource} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>Henry's Blog</h1>
                <h2 className="subheading">Top recent anime</h2>
                <span className="meta">
                  Posted by
                  <a href="about.html!">Henry</a>
                  on October 20, 2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <img src={MonogatariImage} style={{ width: '100%' }} alt="Monogatari" />
              <p>Monogatari's new season? Very cool. </p>
              <img src={EvangelionImage} style={{ width: '100%' }} alt="Evangelion" />
              <p>I like Evangelion because big robots. </p>
              <img src={KOnImage} style={{ width: '100%' }} alt="K-On" />
              <p>I like K-On because I like music. </p>
            </div>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-top">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <ul className="list-inline text-center">
                <li className="list-inline-item">
                  <a href="#!">
                    {/* Uncomment and add your social media icons */}
                    {/* <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                    </span> */}
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    {/* <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x"></i>
                      <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                    </span> */}
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!">
                    <span className="fa-stack fa-lg">
                      <i className="fas fa-circle fa-stack-2x"></i>
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

      {/* Bootstrap core JS */}
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      {/* Core theme JS */}
      <script src="../js/scripts.js"></script>
    </div>
  );
}

export default HenryPage;
