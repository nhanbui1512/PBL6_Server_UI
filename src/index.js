const express = require('express');
const Websocket = require('ws');
const path = require('path');
const hbs = require('express-handlebars');

const routes = require('./routes');
const sendData = require('./app/controllers/dataController');

const app = express();
const server = require('http').createServer(app);
const wss = new Websocket.Server({ server: server });

// data from file csv
const fs = require('fs');
const { parse } = require('csv-parse');
var result = [];

// config websocket
wss.on('connection', (ws, req) => {
    fs.createReadStream('./data_test.csv') // read data from file .csv
        .pipe(parse({ delimiter: ',', from_line: 2 }))
        .on('data', function (row) {
            result.push(row);
        })
        .on('error', function (error) {
            console.log(error.message);
        })
        .on('end', function () {
            sendData(ws, result);
        });

    ws.on('message', (message) => {
        console.log(`received ${message}`);
        ws.send('Got your message its' + message);
    });
});

// config static files
app.use(express.static(path.join(__dirname, '/public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);

// config JSON
app.use(express.json());

// config view engine
app.engine(
    'hbs',
    hbs.engine({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource/views'));

// config route
routes(app);

// start server
server.listen(3000, () => {
    console.log(`server is listening in port 3000`);
});

module.exports = wss;
