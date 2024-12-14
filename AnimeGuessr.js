import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/styles.css"
import "../styles/custom.css";
import landingPageBackground from "../images/K-On school background.jpg";

function AnimeGuessr() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [guessesMade, setGuessesMade] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const [background, setBackground] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [feedback, setFeedback] = useState("");


  const fetchBackground = async () => {
    try {
      const response = await fetch("/getBackground");
      const data = await response.json();
      setBackground(data.backgroundUrl); // Assume API returns { backgroundUrl: "url-to-image" }
    } catch (error) {
      console.error("Error fetching background:", error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const shareResults = () => {
    navigator.clipboard.writeText(`I scored ${score} in AnimeGuessr! Can you beat me?`);
    alert("Results copied to clipboard!");
  };

  const questions = [
    { image: "path-to-anime-image1.jpg", options: ["Naruto", "One Piece", "Bleach", "Fairy Tail"], answer: "Naruto" },
    { image: "path-to-anime-image2.jpg", options: ["Attack on Titan", "Demon Slayer", "Jujutsu Kaisen", "Tokyo Ghoul"], answer: "Demon Slayer" },
  ];

  // API call to check the anime guess
 const checkAnimeGuess = async () => {
    try {
      setGuessesMade(guessesMade + 1); // Increment guesses
      const response = await fetch("/getAnime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeName: userGuess }),
      });
      const data = await response.json();
      setFeedback(data.correct ? "Correct!" : "Incorrect, try again!");
      if (data.correct) {
        setScore(score + 1);
        setGameFinished(true); // End game on correct guess
      }
    } catch (error) {
      console.error("Error checking guess:", error);
    }
  };

  // Start the game and fetch the first background
  const startGame = async () => {
    setGameStarted(true);
    setGameFinished(false); // Reset for new game
    setScore(0);
    setHintsUsed(0);
    setGuessesMade(0);
    await fetchBackground();
  };

  const handleAnswer = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Game Over! Your score: ${score + 1}`);
      setGameStarted(false);
      setScore(0);
      setCurrentQuestion(0);
    }
  };

  return (
    <div 
  className="anime-guessr-container"
  style={{
    backgroundImage: `url(${background || landingPageBackground})`, // Use the imported variable directly
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
    {/* Menu Button */}
    <div className="menu-container">
        <button className="menu-button" onClick={toggleMenu}>
          MENU
        </button>
        {!menuOpen && 
        (
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
        )}
      </div>

      {!gameStarted ? (
        <div className="landing">
          <h1 className="title">AnimeGuessr</h1>
          <button className="play-button" onClick={startGame}>
            Play
          </button>
        </div>
      ) : gameFinished ? (
        <div className="end-result">
          <h1>AnimeGuessr</h1>
          <h2>Kimi no Nawa</h2> {/* Replace with the actual anime name */}
          <p>Stats:</p>
          <p>Hints: {hintsUsed}</p>
          <p>Guesses: {guessesMade}</p>
          <p>Score: {score}</p>
          <button className="share-button" onClick={shareResults}>
            Share
          </button>
        </div>
      ) : (
        <div className="game">
          <h1 className="game-title">AnimeGuessr</h1>
          <input
            type="text"
            placeholder="Enter your guess"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="guess-input"
          />
          <button onClick={checkAnimeGuess} className="submit-button">
            Submit
          </button>
          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      )}
    </div>
  );
}

export default AnimeGuessr;
