const five = require('johnny-five');
const express = require('express');
const cors = require('cors');
const board = new five.Board();

board.on('ready', () => {
    const app = express();
    app.use(cors());

    let analogInput = new five.Pin({
        pin: "A0"
    });

    let vccPin = new five.Pin({
        pin: 7
    });

    vccPin.high();

    analogInput.read(function(error, value){
        if(value == 1023){
            vccPin.low();
        }
        if( value == 0 ){
            vccPin.high();
        }
        console.log(value);
    });

    app.get('/', (req, res) => res.send('Ready!'));
    app.listen(8080, () => console.log('Server on: localhost:8080'));
});