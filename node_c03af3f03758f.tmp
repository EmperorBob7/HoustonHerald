const express = require("express");
const app = express();
const PORT = 212;

app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log("Listening at: http://houstonherald:" + PORT)
});

app.all('*', (req, res) => {
    res.status(404).redirect('http://houstonherald:' + PORT + "/404.html");
});