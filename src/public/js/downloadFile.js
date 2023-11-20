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

// Ví dụ về một mảng dữ liệu
const dataArray = [
    ['Name', 'Age', 'Country'],
    ['John Doe', 25, 'USA'],
    ['Jane Doe', 30, 'Canada'],
    ['Bob Smith', 22, 'UK'],
];

const downloadBtn = document.getElementById('download-btn');

// downloadBtn.addEventListener('click', () => {
//     convertToCSV(dataArray);
// });
