const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Reklamları oku
app.get('/ads', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json'));
    res.json(data.ads);
});

// Reklam ekle
app.post('/ads', (req, res) => {
    const data = JSON.parse(fs.readFileSync('data.json'));
    const newAd = {
        id: data.ads.length + 1,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        clicks: 0
    };
    data.ads.push(newAd);
    fs.writeFileSync('data.json', JSON.stringify(data));
    res.json(newAd);
});

app.listen(port, () => {
    console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});