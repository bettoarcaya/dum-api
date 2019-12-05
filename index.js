const five = require('johnny-five');
const express = require('express');
const cors = require('cors');
const board = new five.Board();

board.on('ready', () => {
    let led = new five.Led(13);
    const app = express();
    app.use(cors());
    app.get('/', (req, res) => res.send('Ready!'));
    app.listen(8080, () => console.log('Server on: localhost:8080'));
});