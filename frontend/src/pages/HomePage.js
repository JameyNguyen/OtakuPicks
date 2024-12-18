import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import videoSource from "../videos/g8dzu9.webm"

function HomePage() {
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
      <header className="masthead" style={{ position: "relative", overflow: "hidden" }}>
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
          <source src={videoSource} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Otaku Picks</h1>
                <span className="subheading">An anime-centric blog hosted by Jamey and Henry</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* Post Preview */}
            <div className="post-preview">
            <Link className="nav-link" to="/jamey">
                <h2 className="post-title">Jamey's Top Picks</h2>
                <h3 className="post-subtitle">my peak animes</h3>
              </Link>
              <p className="post-meta">
                Top picks by <Link className="nav-link" to="/jamey">Jamey's Top Picks</Link> ...
              </p>
            </div>
            {/* Divider */}
            <hr className="my-4" />
            {/* Post Preview */}
            <div className="post-preview">
            <Link className="nav-link" to="/henry">
                <h2 className="post-title">Henry's blog!</h2>
              </Link>
              <p className="post-meta">
                Top picks by <Link className="nav-link" to="/henry"></Link> ...
              </p>
            </div>
          </div>
        </div>
      </div>

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
              <div className="small text-center text-muted fst-italic">Otaku Picks 2024</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
