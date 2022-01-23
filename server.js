const express = require("express");
const rateLimit = require("express-rate-limit");
const db = require('better-sqlite3')('Attractions.db');
const app = express();
const PORT = 212;
const requests = require("./requests.json");
const fs = require("fs");

const limiter = rateLimit({
    windowMs: 60000, // 1 Minute
    max: 3, // limit each IP to 3 requests per windowMs
    message: "Too many requests, please try again after 1 minute."
});

app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log("Listening at: http://localhost:" + PORT);
    backupDB();
});

/**
 * Handles a GET request and returns all of the attraction in JSON format.
 */
app.get("/data", (req, res) => {
    const data = db.prepare(`SELECT * FROM Attractions`).all();
    for (let i = 0; i < data.length; i++) {
        data[i].type = JSON.parse(JSON.parse(data[i].type));
        data[i].category = JSON.parse(JSON.parse(data[i].category));
    }
    res.json(data);
});

app.post("/request", limiter, (req, res) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req?.body?.email)) {
        res.json({
            message: "Email was invalid!"
        });
    } else {
        if (req.body.name && req.body.question) {
            requests[Date.now()] = {
                name: req.body.name,
                email: req.body.email,
                question: req.body.question,
                suggestion: req.body.suggestion
            };
            fs.writeFileSync("./requests.json", JSON.stringify(requests));
            res.json({
                message: "Request was successful!"
            });
        } else {
            res.json({
                message: "Invalid data was send!"
            });
        }
    }
});

/**
 * Redirects client to a generic 404 page if they manage to get to a bad URL.
 */
app.all('*', (req, res) => {
    res.status(404).redirect('http://localhost:' + PORT + "/404.html");
});

/**
 * Backs up the DataBase every 5 minutes.
 */
function backupDB() {
    db.backup(`./backups/backup-${Date.now()}.db`)
        .then(() => {
            console.log('backup complete!');
        })
        .catch((err) => {
            console.log('backup failed:', err);
        });
}

setInterval(backupDB, 300000);