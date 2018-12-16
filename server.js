const express = require('express')
const app = express()

const rpio = require('rpio');
const INT11 = 11;
const INT12 = 12;
const INT13 = 13;
const INT15 = 15;

function init() {
    rpio.open(INT11, rpio.OUTPUT);
    rpio.open(INT12, rpio.OUTPUT);
    rpio.open(INT13, rpio.OUTPUT);
    rpio.open(INT15, rpio.OUTPUT);
}

function close(){
    rpio.close(INT11);
    rpio.close(INT12);
    rpio.close(INT13);
    rpio.close(INT15);
}

function forward(){
    init();
    rpio.write(INT11, rpio.HIGH);
    rpio.write(INT12, rpio.LOW);
    rpio.write(INT13, rpio.LOW);
    rpio.write(INT15, rpio.HIGH);
}

function back(){
    init();
    rpio.write(INT11, rpio.LOW);
    rpio.write(INT12, rpio.HIGH);
    rpio.write(INT13, rpio.HIGH);
    rpio.write(INT15, rpio.LOW);
}

function left(){
    init();
    rpio.write(INT11, rpio.HIGH);
    rpio.write(INT12, rpio.LOW);
    rpio.write(INT13, rpio.LOW);
    rpio.write(INT15, rpio.LOW);
}

function right(){
    init();
    rpio.write(INT11, rpio.LOW);
    rpio.write(INT12, rpio.LOW);
    rpio.write(INT13, rpio.LOW);
    rpio.write(INT15, rpio.HIGH);
}

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/car/forward', function (req, res) {
    console.log("/car/forward");
    forward();
    res.end("");
})
app.get('/car/back', function (req, res) {
    console.log("/car/back");
    back();
    res.end("");
})
app.get('/car/left', function (req, res) {
    console.log("/car/left");
    left();
    res.end("");
})
app.get('/car/right', function (req, res) {
    console.log("/car/right");
    right();
    res.end("");
})
app.get('/car/stop', function (req, res) {
    console.log("/car/stop");
    close();
    res.end("");
})
app.use(express.static("public")).listen(3000, () => console.log('car server listening on port 3000'))