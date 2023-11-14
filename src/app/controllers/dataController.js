const axios = require('axios');

async function sendRequestToServer({
    ts,
    idresp_p,
    idorig_p,
    orig_ip_bytes,
    resp_ip_bytes,
    conn_state,
    history,
}) {
    try {
        const response = await axios.post(
            'http://127.0.0.1:5000/predict',
            {
                ts: ts,
                idresp_p: idresp_p,
                idorig_p: idorig_p,
                orig_ip_bytes: orig_ip_bytes,
                conn_state: conn_state,
                resp_ip_bytes: resp_ip_bytes,
                history: history,
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt kiểu nội dung là form-data
                },
            },
        );

        return response.data;
    } catch (error) {
        throw error;
    }
}

const sendData = (ws, data) => {
    let i = 0;
    return setInterval(async () => {
        try {
            const res = await sendRequestToServer({
                ts: data[i][1],
                idresp_p: data[i][6],
                idorig_p: data[i][4],
                orig_ip_bytes: data[i][18],
                resp_ip_bytes: data[i][20],
                conn_state: data[i][12],
                history: data[i][16],
            });

            ws.send(
                JSON.stringify({
                    ts: data[i][1],
                    idresp_p: data[i][6],
                    idorig_p: data[i][4],
                    orig_ip_bytes: data[i][18],
                    resp_ip_bytes: data[i][20],
                    conn_state: data[i][12],
                    history: data[i][16],
                    proto: data[i][7],
                    label: res.label,
                    id_label: res.id_label,
                }),
            ); // send to client UI through websocket
            i++;
        } catch (error) {
            console.log(error.message);
        }
    }, 1000);
};

module.exports = sendData;
