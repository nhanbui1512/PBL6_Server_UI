const sendData = (ws, req) => {
  setInterval(() => {
    ws.send("du lieu bang");
  }, 1000);
};

module.exports = sendData;
