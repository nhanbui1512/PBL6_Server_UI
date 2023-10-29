const express = require('express');
const Websocket = require('ws');
const app = express();
const server = require('http').createServer(app);
const wss = new Websocket.Server({ server: server });
const path = require('path');
const hbs = require('express-handlebars');

const routes = require('./routes');

// config websocket
wss.on('connection', (ws) => {
    console.log('A new client connected');
    ws.send('Welcome new client');
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
