const axios = require('axios');

function sendRequestToServer() {
    // Gửi request đến server
    axios
        .post(
            'http://127.0.0.1:5000/predict',
            {
                ts: 1545466932.337732,
                idresp_p: 6667,
                idorig_p: 54582,
                orig_ip_bytes: 60,
                conn_state: 'S0',
                history: 'S',
                orig_pkts: 1,
                proto: 'tcp',
                duration: '-',
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt kiểu nội dung là form-data
                },
            },
        )
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error.message);
        });
}

setInterval(() => {
    sendRequestToServer();
}, 2000);
