import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import FrierenImage from "../images/Frieren.jpg";
import ToradoraImage from "../images/Toradora.jpg";
import VEGImage from "../images/VEG.jpg";
import videoSource from "../videos/frierencarriage.gif";

function JameyPage() {
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
        <img
          src={videoSource}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
          alt="Frieren traveling in a carriage"  // descriptive alt text
        />
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>My Peak Animes fr </h1>
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
              <p>I chose Frieren, Toradora, and Violet Evergarden for my favorite animes that I would recommend to others.</p>
              <p>I enjoyed these animes in particular because it felt like the character interactions were meaningful and I liked seeing character growth.</p>
              <img src={VEGImage} style={{ width: '100%' }} alt="Violet Evergarden" />
              <p>Violet Evergarden stood out to me because it doesn't feel generic or forced, and I thought that the show was beautiful in its art and storytelling. Most of all, I think it was really hard to not sympathize with Violet.</p>
              <img src={ToradoraImage} style={{ width: '100%' }} alt="Toradora" />
              <p>I really liked Toradora because unlike many romcom animes, the show has meaningful events happen and it drives character growth. I also just liked the character interactions.</p>
              <img src={FrierenImage} style={{ width: '100%' }} alt="Frieren" />
              <p>Frieren was a breath of fresh air for me and it doesn't overly play on clichés. The premise is simplistic but unique, and I loved how it showcases Frieren's weakness as a person as she goes through grief and loss.</p>
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

export default JameyPage;
