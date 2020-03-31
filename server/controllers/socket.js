const socket = require("socket.io");

module.exports = {
  getRoom: (req, res) => {
    res.sendStatus(req.sessionId);
  }
};
