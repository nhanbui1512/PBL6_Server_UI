const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

// Mảng lưu trữ tất cả các kết nối WebSocket
const clients = [];

// Hàm gửi dữ liệu đến tất cả các client
function broadcastData(data) {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

// Xử lý khi có kết nối mới
server.on('connection', (socket) => {
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
