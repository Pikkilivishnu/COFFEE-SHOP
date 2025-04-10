const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001; // Change from 5000 to 5001


app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
