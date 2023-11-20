function getCurrentTime() {
    const currentDate = new Date();

    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based
    var year = currentDate.getFullYear();

    // Get the current time
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    const timeStr = `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    return timeStr;
}

module.exports = getCurrentTime;
