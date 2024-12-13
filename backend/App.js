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

// login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ error: "Username and password are required." });
    }
    const query = "SELECT id FROM user WHERE user = ? AND password = ?";
    try {
        db.query(query, [username, password], (err, results) => {
            if (err) {
                console.error("Database error during login:", err);
                return res.status(500).send({ error: "An error occurred in Query. Please try again." });
            }
            if (results.length === 0) {
                return res.status(401).send({ error: "Invalid username or password." });
            }
        });
    } catch (err) {
        // Handle synchronous errors
        console.error("Error in GET /contact/login", err);
        res.status(500).send({ error: "An unexpected error occurred in Login: " + err.message });
    }
})

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
app.get("/anime/search", (req, res) => {
    const searchTerm = req.query.q;
    const query = "SELECT name FROM anime WHERE LOWER(name) LIKE LOWER(?)";
    try {
        db.query(query, [`%{searchTerm}%`], (err, result) => {
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

// Get anime name by full name
app.get("/anime/name", (req, res) => {
    const { name } = req.query;
    const query = "SELECT name FROM anime WHERE name = ?";
    const searchName = `%{name}%`;
    try {
        db.query(query, [searchName], (err, result) => {
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

//Get background
app.get("/background", (req, res) => {
    try {
        db.query("SELECT * FROM background", (err, result) => {
            return res.status(200).send(result);
        });
    } catch (err) {
        console.error({ error: "An unexpected error occurred"+err });
        res.status(500).send({ error: "An unexpected error occurred"+err });
    }       
})
//Get hint
app.get("/anime/studio", (req, res) =>{
    const { animeName } = req.params;
    const query = "SELECT studio_name FROM anime WHERE name = ?";
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

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port)
})