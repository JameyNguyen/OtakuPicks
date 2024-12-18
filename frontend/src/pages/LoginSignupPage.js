import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import "../styles/custom.css";
import videoSource from "../videos/1720911083706.gif";

function LoginSignupPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [isLogin, setIsLogin] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/login" : "/signup"; // Determine API endpoint
    const payload = isLogin
      ? { email: formData.email, userpassword: formData.password } // Login expects username and password
      : {
          username: formData.username,
          email: formData.email,
          userpassword: formData.password,
        }; // Signup expects username, email, and userpassword

    try {
      console.log(payload)
        const response = await fetch(`http://localhost:8081${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setResponseMessage(
          isLogin ? "Login successful! 🎉" : "Signup successful! 🎉"
        );
      } else {
        setResponseMessage(result.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Unable to connect to the server. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
    <div className="menu-container" style={{zIndex:2}}>
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
      {/* Hero Section with Background GIF */}
      <header
        className="hero-section"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={videoSource}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.7,
          }}
          alt="Background Animation"
        />
        <div
          className="overlay"
          style={{
            position: "absolute",
            zIndex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        ></div>

        {/* Form Container */}
        <div
          className="form-container"
          style={{
            position: "relative",
            zIndex: 2,
            backgroundColor: "white",
            padding: "3rem",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h1 className="form-title" style={{ marginBottom: "1.5rem" }}>
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </h1>

          <form onSubmit={handleSubmit}>
            {/* Show username input only in Signup mode */}
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.8rem",
                  margin: "0.5rem 0",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.5rem 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              style={{
                display: "block",
                width: "100%",
                padding: "0.8rem",
                margin: "0.5rem 0",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              required
            />
            <button
              type="submit"
              className="submit-button"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.8rem",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                marginTop: "1rem",
                width: "100%",
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <p style={{ marginTop: "1rem", color: responseMessage.includes("🎉") ? "green" : "red" }}>
              {responseMessage}
            </p>
          )}

          {/* Toggle between Login and Signup */}
          <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
            {isLogin ? "New here?" : "Already have an account?"}{" "}
            <span
              onClick={toggleForm}
              style={{ color: "#007bff", cursor: "pointer", fontWeight: "bold" }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </header>

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "1rem 0", backgroundColor: "#f8f9fa" }}>
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          © {new Date().getFullYear()} Otaku Picks | <Link to="/about">About Us</Link>
        </p>
      </footer>
    </>
  );
}

export default LoginSignupPage;
