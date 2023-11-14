const express = require('express');
const Websocket = require('ws');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('fs');

const routes = require('./routes');

const app = express();
const server = require('http').createServer(app);
const wss = new Websocket.Server({ server: server });
const clients = [];

// Hàm gửi dữ liệu đến tất cả các client
function broadcastData(data) {
    clients.map((client) => {
        client.send(data);
    });
}

// Xử lý khi có kết nối mới
wss.on('connection', (socket) => {
    console.log('Client đã kết nối.');

    // Thêm kết nối mới vào danh sách
    clients.push(socket);
    // Xử lý khi kết nối bị đóng
    socket.on('close', () => {
        console.log('Kết nối đã đóng.');
        // Xóa kết nối đó từ danh sách
        const index = clients.indexOf(socket);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

// Hàm setInterval để liên tục gửi dữ liệu đến tất cả các client
setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    const message = `Dữ liệu từ server: ${currentTime}`;
    broadcastData(message);
}, 1000); // Gửi dữ liệu mỗi giây

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
