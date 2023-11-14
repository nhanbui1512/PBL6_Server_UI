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
    return `<tr class='${colorRow}'> <td>${data.ts}</td> <td> ${data.idresp_p} </td> <td>${data.idorig_p}</td><td>${data.orig_ip_bytes}</td>  <td>${data.conn_state}</td><td>${data.proto}</td>   <td>${data.resp_ip_bytes}</td>   <td><span class="label ${colorLabel} btn-rounded" >${data.label}</span> </td> </tr>`;
};
let samples = [
    {
        ts: '1545466932.337732',
        idresp_p: 6667,
        idorig_p: 54582,
        orig_ip_bytes: 60,
        conn_state: 'S0',
        proto: 'tcp',
        resp_ip_bytes: 563,
        id_label: 1,
        label: 'Benign',
    },
    {
        ts: '1545466932.337732',
        idresp_p: 6667,
        idorig_p: 54582,
        orig_ip_bytes: 60,
        conn_state: 'S0',
        proto: 'udp',
        resp_ip_bytes: 563,
        id_label: 4,
        label: 'Benign',
    },
    {
        ts: '1545466932.337732',
        idresp_p: 6667,
        idorig_p: 54582,
        orig_ip_bytes: 60,
        conn_state: 'S0',
        proto: 'tcp',
        resp_ip_bytes: 563,
        id_label: 6,
        label: 'Benign',
    },
];

function reducer(state = samples, action) {
    switch (action.type) {
        case 'Search':
            let result = [];
            if (samples.length > 0) {
                samples.map((item) => {
                    if (item.proto === action.searchValue) {
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
    if (e.target.value === '') {
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

const connection = connectWS();
