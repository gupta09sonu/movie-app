const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');

// create port and host
const port = 3000;
const host = '127.0.0.1';

//create express instance
const app = express();

// use body parser middleware to handle json
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// use the all api routes end points
app.use('/api', api);

// use all event-emmiter routes end points
app.use('/event-emmiter', require('./routes/event-emitter')); 


// listen the port
app.listen(port,host,()=>{
    console.log(`server is listening on http://${host}:${port}`);
});