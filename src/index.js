const express = require('express');
const Websocket = require('ws');
const path = require('path');
const hbs = require('express-handlebars');
const fs = require('fs');
const { parse } = require('csv-parse');

const routes = require('./routes');

const requestAPI = require('./app/controllers/dataController');

const app = express();
const server = require('http').createServer(app);
const wss = new Websocket.Server({ server: server });
const getCurrentTime = require('./app/services');
const clients = [];
var result = [];

fs.createReadStream('./data_test.csv') // read data from file .csv
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', function (row) {
        result.push(row);
    })
    .on('error', function (error) {
        console.log(error.message);
    })
    .on('end', function () {
        let i = 0;
    });

// Hàm gửi dữ liệu đến tất cả các client
function broadcastData(data) {
    clients.map((client) => {
        if (client.readyState === Websocket.OPEN) {
            client.send(data);
        }
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

let i = 0;
// Hàm setInterval để liên tục gửi dữ liệu đến tất cả các client
setInterval(async () => {
    try {
        const res = await requestAPI({
            ts: result[i][1],
            idresp_p: result[i][6],
            idorig_p: result[i][4],
            orig_ip_bytes: result[i][18],
            resp_ip_bytes: result[i][20],
            conn_state: result[i][12],
            history: result[i][16],
        });

        const currentTime = getCurrentTime();
        broadcastData(
            JSON.stringify({
                time: currentTime,
                ts: result[i][1],
                idresp_p: result[i][6],
                idorig_p: result[i][4],
                orig_ip_bytes: result[i][18],
                resp_ip_bytes: result[i][20],
                conn_state: result[i][12],
                history: result[i][16],
                proto: result[i][7],
                label: res.label,
                id_label: res.id_label,
            }),
        );
        i++;
    } catch (error) {
        console.log(error.message);
    }
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
