const express = require("express");
const path = require("node:path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/encrypt", (req, res) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";

    const plaintext = req.query.plaintext || "";
    const shift = parseInt(req.query.shift) || 0;

    const normalizedShift = shift < 0
        ? alphabet.length - (Math.abs(shift) % alphabet.length)
        : shift % alphabet.length;

    let result = "";

    for (const letter of plaintext) {
        let index = alphabet.indexOf(letter.toLowerCase());

        if (index === -1) {
            result += letter;
        } else {
            const shiftedIndex = (index + normalizedShift) % alphabet.length;
            result += alphabet.charAt(shiftedIndex);
        }
    }

    res.set("Content-Type", "text/plain");
    res.send(result);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
