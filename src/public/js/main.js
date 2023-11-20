import { createStore } from 'https://cdn.skypack.dev/redux';

const createRow = (data) => {
    let colorRow = '';
    let colorLabel = '';
    switch (Number(data.id_label)) {
        case 1: // Benign
            colorRow = 'table-success';
            colorLabel = 'gradient-4';
            break;
        case 0: // attack
            colorRow = 'table-info';
            colorLabel = 'gradient-1';
            break;
        case 2: // C&C
            colorRow = 'table-active';
            colorLabel = 'gradient-9';
            break;
        case 3: // C&C
            colorRow = 'table-active';
            colorLabel = 'gradient-9';
            break;
        case 4: // C&C
            colorRow = 'table-active';
            colorLabel = 'gradient-9';
            break;
        case 5: // C&C
            colorRow = 'table-active';
            colorLabel = 'gradient-9';
            break;
        case 6: // DDoS
            colorRow = 'table-danger';
            colorLabel = 'gradient-2';
            break;
        case 7: // FileDownload
            colorRow = 'table-warning';
            colorLabel = 'gradient-3';
            break;
        case 10: // PartOfAHorizontalPortScan
            colorRow = 'table-primary';
            colorLabel = 'gradient-3';
        default:
            colorRow = 'table-active';
            colorLabel = 'gradient-9';
            break;
    }
    return `<tr class='${colorRow}'><td>${data.time}</td> <td>${data.ts}</td> <td> ${data.idresp_p} </td> <td>${data.idorig_p}</td><td>${data.orig_ip_bytes}</td>  <td>${data.conn_state}</td><td>${data.proto}</td>   <td>${data.resp_ip_bytes}</td>   <td><span class="label ${colorLabel} btn-rounded" >${data.label}</span> </td> </tr>`;
};
let samples = [
    // {
    //     time: '8:00 20/11/2023',
    //     ts: '1545466932.337732',
    //     idresp_p: 6667,
    //     idorig_p: 54582,
    //     orig_ip_bytes: 60,
    //     conn_state: 'S0',
    //     proto: 'tcp',
    //     resp_ip_bytes: 563,
    //     id_label: 1,
    //     label: 'Benign',
    // },
    // {
    //     time: '8:00 20/11/2023',
    //     ts: '1545466932.337732',
    //     idresp_p: 6667,
    //     idorig_p: 54582,
    //     orig_ip_bytes: 60,
    //     conn_state: 'S0',
    //     proto: 'udp',
    //     resp_ip_bytes: 563,
    //     id_label: 4,
    //     label: 'Benign',
    // },
    // {
    //     time: '8:00 20/11/2023',
    //     ts: '1545466932.337732',
    //     idresp_p: 6667,
    //     idorig_p: 54582,
    //     orig_ip_bytes: 60,
    //     conn_state: 'S0',
    //     proto: 'tcp',
    //     resp_ip_bytes: 563,
    //     id_label: 6,
    //     label: 'Benign',
    // },
];

function reducer(state = samples, action) {
    switch (action.type) {
        case 'Search':
            let result = [];
            const searchValue = action.searchValue;
            if (samples.length > 0) {
                samples.map((item) => {
                    if (
                        item.proto === searchValue ||
                        item.ts.includes(searchValue) ||
                        item.idresp_p === searchValue ||
                        item.idorig_p === searchValue ||
                        item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                        item.conn_state.includes(searchValue)
                    ) {
                        result.unshift(item);
                    }
                });
            }
            return result;
        default:
            return state;
    }
}

const store = createStore(reducer);

store.subscribe(() => {
    const table = document.getElementById('table');
    table.innerHTML = store
        .getState()
        .map((item) => {
            return createRow(item);
        })
        .join('');
});

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    if (e.target.value === '' && connection.readyState === 3) {
        // nếu không search nữa
        connection = connectWS();
        return render();
    }
    connection.close(); // ngat ket noi
    store.dispatch({ type: 'Search', searchValue: e.target.value });
});

function render() {
    const table = document.getElementById('table');
    table.innerHTML = samples
        .map((item) => {
            return createRow(item);
        })
        .join('');
}

render();

function connectWS() {
    const webSocket = new WebSocket('ws://localhost:3000');

    webSocket.addEventListener('open', (ws) => {
        console.log('Connected to server socket');
    });

    webSocket.addEventListener('message', (res) => {
        const data = JSON.parse(res.data);
        samples.unshift(data);

        const table = document.getElementById('table');
        table.innerHTML = samples
            .map((item) => {
                return createRow(item);
            })
            .join('');
    });

    return webSocket;
}

var connection = connectWS();
console.log(samples);

function convertData(data) {
    const result = [
        [
            'time',
            'ts',
            'resp_ip_bytes',
            'orig_ip_bytes',
            'idresp_p',
            'idorig_p',
            'conn_state',
            'proto',
            'label',
        ],
    ];
    data.map((item) => {
        result.push([
            item.time,
            item.ts,
            item.resp_ip_bytes,
            item.orig_ip_bytes,
            item.idresp_p,
            item.idorig_p,
            item.conn_state,
            item.proto,
            item.label,
        ]);
    });

    return result;
}

function convertToCSV(data) {
    // Chuẩn bị dữ liệu CSV
    const csvContent = 'data:text/csv;charset=utf-8,' + data.map((row) => row.join(',')).join('\n');

    // Tạo đối tượng URL
    const encodedUri = encodeURI(csvContent);

    // Tạo phần tử <a> để tải về
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'exported_data.csv');

    // Thêm phần tử vào DOM và kích hoạt sự kiện click để tải về
    document.body.appendChild(link);
    link.click();

    // Loại bỏ phần tử <a> sau khi đã sử dụng
    document.body.removeChild(link);
}

const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', () => {
    convertToCSV(convertData(samples));
});
