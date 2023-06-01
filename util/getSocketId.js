const getSocketID = (io) => {
    let sockets = io.sockets.sockets;
    for (let [key, value] of sockets.entries()) {
        return key
    }
};

module.exports = getSocketID;