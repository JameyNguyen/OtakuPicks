import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import backgroundImage from "../images/flip_flappers.jpg";

function AnimeGuessr() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [guessesMade, setGuessesMade] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [background, setBackground] = useState("");
  // for search----
  const [userGuess, setUserGuess] = useState("");
  const [dropdownResults, setDropDownResults] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [anime, setAnime] = useState("");
  // ----

  // Upon game start, get a background and its info
  const fetchBackground = async () => {
    try {
      console.log("Fetching background...");
      const response = await fetch("http://localhost:8081/background");
      console.log("Fetch response:", response);
      const data = await response.json();
      console.log("Fetch data:", data);
  
      if (data && data[0] && data[0].filename) {
        setBackground(`../images/${data[0].filename}`);
        console.log(data[0].filename);
        setAnime(data[0].anime);
        console.log(data[0].anime);
      } else {
        console.error("Invalid data structure:", data);
      }
    } catch (error) {
      console.error("Error fetching background:", error);
    }
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const shareResults = () => {
    navigator.clipboard.writeText(`I took ${score} tries in AnimeGuessr! Can you beat me?`);
    alert("Results copied to clipboard!");
  };

  const checkAnimeGuess = async () => {
    setGuessesMade(guessesMade + 1);
    setFeedback(userGuess == anime ? "Correct!" : `Incorrect, try again! Current points: ${19-guessesMade}`);
    if (userGuess == anime) {
      setScore(score + 1);
      setGameFinished(true); 
    }
  };

  // fetches near matches for dropdown
  const fetchAnimeMatches = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setDropDownResults([]); // Clear dropdown if input is empty
      return;
    }
    try {
      const response = await fetch(`http://localhost:8081/anime?q=${searchTerm}`);
      if (!response.ok) {
        throw new Error("Error fetching anime");
      }
      const results = await response.json();
      console.log(results);
      setDropDownResults(results);
    } catch (err) {
      setFeedback("Failed to fetch anime");
      console.error(err);
    }
  }

  const handleDropdownSelect = (selectedAnime) => {
    setUserGuess(selectedAnime);
    setDropDownResults([]);
  }

  const startGame = async () => {
    setGameStarted(true);
    setGameFinished(false);
    setScore(0);
    setHintsUsed(0);
    setGuessesMade(0);
    setFeedback("")
    await fetchBackground();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (userGuess!="") {
        checkAnimeGuess();
      }
    }
  }

  return (
    <div className="anime-guessr-container" 
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover",
      }}>
    {/* Menu Button */}
      <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          MENU
        </button>
        {menuOpen && (
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item-menu"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/animeguessr">AnimeGuessr</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/catalog">Our Picks</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/loginsignup">Login</Link></li>
          </ul>
        )}
      </div>

      {!gameStarted ? (
        <div className="landing">
          <h1 className="title">AnimeGuessr</h1>
          <button className="play-button" onClick={startGame}>Play</button>
        </div>
      ) : gameFinished ? (
        <div className="end-result">
          <h1>You got it!</h1>
          <p>Your Score: {Math.max(0, 21-guessesMade)}</p>
          <button className="share-button" onClick={shareResults}>Share Results</button>
        </div>
      ) : (
        <div className="anime-guessr-container" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover"}}>
          <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          MENU
        </button>
        {menuOpen && (
          <ul className="navbar-nav ms-auto py-4 py-lg-0">
            <li className="nav-item-menu"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/animeguessr">AnimeGuessr</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/catalog">Our Picks</Link></li>
            <li className="nav-item-menu"><Link className="nav-link" to="/about">About Us</Link></li>
          </ul>
        )}
      </div>
          <div className="game">
            <h1 className="game-title">Guess the Anime!</h1>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => {
                setUserGuess(e.target.value)
                fetchAnimeMatches(e.target.value)
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter anime name"
              className="guess-input"
            />
            {dropdownResults.length > 0 && (
              <ul className="dropdown">
                {dropdownResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() => handleDropdownSelect(result.name)}
                    className="dropdown-item"
                  >
                    {result.name}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={checkAnimeGuess} className="guess-button">Submit Guess</button>
            <p className="feedback">{feedback}</p>
          </div>
        </div>
      )}
    </div>
    
  );
}

export default AnimeGuessr;
