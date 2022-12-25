const express = require('express');
const app = express();
const port = 8080;
const host = '0.0.0.0';

// Create an Array of Song names
const songNames = [
    'My Way',
    'Strangers in the Night',
    'New York, New York',
    'Come Fly with Me',
    'Fly Me to the Moon',
    'The Way You Look Tonight',
    'I Get a Kick Out of You',
    'Summer Wind',
    'Jingle Bells',
    'It Was a Very Good Year',
    'Love and Marriage',
    'Witchcraft',
    'Chicago',
    'The Christmas Waltz',
    'The Lady is a Tramp',
    'Mack the Knife',
    'Come Dance with Me',
    'Put Your Dreams Away (For Another Day)',
    'Blue Moon'
];

const usedSongNames = [];

app.get('/', (req, res) => {
    if (songNames.length > 0) {
        const song = songNames[Math.floor(Math.random() * songNames.length)];

        usedSongNames.push(song);

        songNames.splice(songNames.indexOf(song), 1);

        res.send(song);
    } else {
        songNames = usedSongNames;
        usedSongNames = [];

        const song = songNames[Math.floor(Math.random() * songNames.length)];

        usedSongNames.push(song);

        songNames.splice(songNames.indexOf(song), 1);

        res.send(song);
    }
});

app.get('/birth_date', (req, res) => {
    res.send('December 12, 1915');
});

app.get('/birth_city', (req, res) => {
    res.send('Hoboken, New Jersey');
});

app.get('/wives', (req, res) => {
    res.send('Nancy Barbato, Ava Gardner, Mia Farrow, Barbara Marx');
});

app.get('/picture', (req, res) => {
    res.redirect('https://en.wikipedia.org/wiki/Frank_Sinatra#/media/File:Frank_Sinatra2,_Pal_Joey.jpg');
});

app.get('/public', (req, res) => {
    res.send('Everybody can see this page');
});

app.get('/protected', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send('Not authorized');
        return;
    }

    const [username, password] = new
    Buffer.from(authHeader.split(' ')[1],
    'base64').toString().split(':');

    if (username === 'admin' && password === 'admin') {
        res.send('Welcome, authenticated client');
    } else {
        res.status(401).send('Not authorized');
    }
});

app.listen(port, host, () => {
    console.log('Server listening on http://${host}:${port}');
});