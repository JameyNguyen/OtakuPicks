var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

// Server
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use("../images", express.static("images")); // Serve images statically

const port = "8081";
const host = "localhost";
const multer = require('multer');
const path = require('path');

// MySQL
const mysql = require("mysql2");
const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "otaku",
    password: "picks",
    database: "otakupicks",
});

db.connect((err) => {
    if (err) {
        console.error("database connection failed:", err.stack);
        return;
    }
    console.log("Connected to MySQL");
});

// Set up multer for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/"); // Save images in the 'images' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
 });
const upload = multer({ storage: storage });

// Create "images" folder if it doesn't exist
const fs = require("fs");
if (!fs.existsSync("images")) {
    fs.mkdirSync("images");
}

// post anime
app.post("/anime", upload.single("image"), (req,res) => {
    const { name, studio, director, year } = req.body;
    const image = req.file ? `../images/${req.file.filename}` : null;
    try {
        const query = "INSERT INTO (name, studio_name, director_name, year, image_filename)"; 
        db.query(query, [name, studio, director, year, image], (err, results) => {
            if (err) {
                console.log(err);
                res.status(500).send({error:"Error adding anime"+err});
            } else {
                res.status(201).send("Anime added successfully");
            }
        });
    } catch (err) {
        // Handle synchronous errors
        console.error("Error in POST /anime:", err);
        res.status(500).send({ error: "An unexpected error occurred: " + err.message });
    }
});

// Get anime with search term
app.get("/anime", (req, res) => {
    const searchTerm = req.query.q;
    const query = "SELECT name FROM anime WHERE LOWER(name) LIKE LOWER(?)";
    try {
        db.query(query, [`%${searchTerm}%`], (err, result) => {
            if (err) {
                console.error("Error performing search:", err);
                return res.status(500).send({ error: "Error performing search" });
            }
            return res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred in GET by search"+err });
        res.status(500).send({ error: "An unexpected error occured in GET by search"+err });
    }
})

// Get anime by full name
app.get("/anime/:name", (req, res) => {
    const name = req.params.name;
    const query = "SELECT * FROM anime WHERE name = ?";
    try {
        db.query(query, [`%{name}%`], (err, result) => {
            if (err) {
                console.error("Anime not found:", err);
                return res.status(404).send({ error: "Anime not found" });
            }
            return res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred in GET by name"+err });
        res.status(500).send({ error: "An unexpected error occurred in GET by name"+err });
    }
})

//Get random background
app.get("/background", (req, res) => {
    try {
        db.query("SELECT * FROM background ORDER BY RAND() LIMIT 1", (err, result) => {
            console.log("background fetched!")
            return res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }       
})

//Get hint from a specific anime
app.get("/name/:hint", (req, res) => {
    const { hint } = req.params.hint
    const { animeName } = req.params.name;
    if (hint.equals(studio)) {
        const query = "SELECT studio_name FROM anime WHERE name = ?";
    } else if (hint.equals(director)) {
        const query = "SELECT director_name FROM anime WHERE name = ?";
    } else if (hint.equals(year)) {
        const query = "SELECT year FROM anime WHERE name = ?";
    } else {
        res.status(404).send({ error: 'Hint not found'});
    }
    try {
        db.query(query, [ animeName ], (err, result)=>{
            if (err) {
                console.log({error:"Error fetching studio hint"});
                return res.status(500).send({ error: "Error fetching studio hint :"+err });
            } else if (result.length>0) {
                console.log(result);
                res.json({ studio: result });
            } else {
                res.status(404).send({ error: 'Studio not found' });
            }
        });
    } catch (err) {
        console.error("Error fetching studio hint:", err);
        res.status(500).send({ error: 'Error fetching studio hint:'+ err });
    }
})

// Login User
app.post("/login", (req, res) => {
    const { email, userpassword } = req.body;
  
    // Validate input
    if (!email || !userpassword) {
        return res.status(400).json({ error: "Email and password are required." });
    }
  
    // Query to check email and password in the database
    const query = "SELECT email FROM users WHERE email = ? AND userpassword = ?";
  
    db.query(query, [email, userpassword], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "An internal server error occurred." });
      }
  
      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ error: "Invalid email or password." });
      }
  
      // Login success
      res.status(200).json({ message: "Login successful", email: email });
    });
  });

  // Signup new users
  app.post("/signup", (req, res) => {
    const { username, email, userpassword } = req.body;

    // Check for missing input fields
    if (!username || !email || !userpassword) {
        return res.status(400).send({ error: "Username, email, and password are required." });
    }

    // Insert user into the database
    const query = "INSERT INTO users (username, email, userpassword) VALUES (?, ?, ?)";
    try {
        db.query(query, [username, email, userpassword], (err, result) => {
            if (err) {
                // Check for duplicate email error
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(409).send({ error: "Email is already registered." });
                }
                console.error("Database error during sign-up:", err);
                return res.status(500).send({ error: "An error occurred. Please try again." });
            }
            // Successfully inserted
            res.status(201).send({ message: "User signed up successfully!" });
        });
    } catch (error) {
        console.error("Error in /signup:", error);
        res.status(500).send({ error: "An unexpected error occurred." });
    }
});

app.put("/update", (req, res) => {
    const id = req.params.id;
    const query = `
        UPDATE user
        SET user = ?, password = ?
        WHERE id = ?
    `;
    try {
        db.query(query, [user, password], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({err:"Error updating info"});
            } else if (result.affectedRows === 0) {
                res.status(404).send({err:"User not found"});
            } else {
                res.status(200).send("Info updated successfully");
            }
        });
    } catch {
        // Handle synchronous errors
        console.error("Error in UPDATE /update:", err);
        res.status(500).send({ error: "An unexpected error occurred in UPDATE: " + err.message });
    }
});

app.delete("/delete", (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM user WHERE id = ?";
    try {
        db.query(query, [id], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({err:"Error deleting account"});
            } else if (result.affectedRows === 0) {
                res.status(404).send({err:"User not found"});
            } else {
                res.status(200).send("Account deleted successfully");
            }
        });
    } catch (err) {
         // Handle synchronous errors
        console.error("Error in DELETE /delete:", err);
        res.status(500).send({ error: "An unexpected error occurred in DELETE: " + err.message });
    }
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port)
})