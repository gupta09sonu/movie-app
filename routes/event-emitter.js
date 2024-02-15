const express = require('express');

const router = express.Router();

const EventEmitter = require('events');


const event = new EventEmitter()

let counter = 0;
event.on('emit1', () => {
    counter++;
    console.log("api called count :", counter);
    console.log('Hello => number 1');
    setImmediate(() => {
        console.log('Running before the timeout => number 3');
    });
    setTimeout(() => {
        console.log('The timeout running last => number 4');
    }, 0);
    process.nextTick(() => {
        console.log('Running at next tick => number 2');
    });


})

// create api usuing router service

router.get('/', (req, res) => {
    res.status(200).send("from root of event emmiter");
});

router.get('/event1', (req, res) => {
    res.status(200).json({
        name: 'sonu',
        age: 30,
        address: "Indore"
    });
    event.emit('emit1');
})

module.exports = router;