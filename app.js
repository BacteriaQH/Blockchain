const express = require('express');
const { createServer } = require("http");
const {Server} = require('socket.io');

const cookieParser = require('cookie-parser');

require('dotenv').config();
const router = require('./routes/index.route');
const connetDB = require('./config/db');
const { shuffleArr } = require("./util/random");
const { getLastBlock, createBlock } = require("./services/block.service");
const { updateCoinForUser } = require("./services/user.service");
const randomPoS = require("./util/radomPoS");
const PORT = process.env.PORT || 5000;

connetDB();

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer);

let socketIdArr = [];
io.on("connection", (socket) => {
  socket.on("join mine", () => {
    socketIdArr.push(socket.id);
    if (socketIdArr.length >= 2) {
      const selectedNode = shuffleArr(socketIdArr)[0];
      console.log("selectedNode: ", selectedNode);
      socketIdArr = [];
      socket.to(selectedNode).emit("choosen", { socketId: selectedNode });
    }
  });
  socket.on("mined", async (data) => {
    const lastBlock = await getLastBlock();
    if (Number(data.block.index) === lastBlock.index + 1) {
      if (data.block.prevHash === lastBlock.hash) {
        const nBlock = await createBlock(data.block);
        const uUser = await updateCoinForUser(data.user.email, 1);
        socket.broadcast.emit("lastest hash", {
          hash: nBlock.hash,
          index: nBlock.index,
        });
        io.to(data.socketId).emit("last hash", { block: nBlock, user: uUser });
      } else {
        io.to(data.socketId).emit("Previous hash is not valid!");
      }
    } else {
      io.to(data.socketId).emit("Index is not valid!");
    }
  });

  socket.on("join mine pos", (data) => {
    socketIdArr.push(data);
    console.log("socketIdArr: ", socketIdArr);
    if (socketIdArr.length >= 2) {
      const selectedNode = randomPoS(socketIdArr);
      console.log("selectedNode: ", selectedNode);
      io.to(selectedNode.socketId).emit("choosen pos");
    }
  });
  socket.on("mined pos", async (data) => {
    const lastBlock = await getLastBlock();
    if (Number(data.block.index) === lastBlock.index + 1) {
      if (data.block.prevHash === lastBlock.hash) {
        const nBlock = await createBlock(data.block);
        const uUser = await updateCoinForUser(data.user.email, 1);
        socket.broadcast.emit("lastest hash pos", {
          hash: nBlock.hash,
          index: nBlock.index,
        });
        io.to(data.socketId).emit("last hash pos", {
          block: nBlock,
          user: uUser,
        });
      } else {
        io.to(data.socketId).emit("Previous hash is not valid!");
      }
    } else {
      io.to(data.socketId).emit("Index is not valid!");
    }
  });
});
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.get('/', (req, res) => {
    res.render('main', { title: 'Home' });
})

app.use('/', router);
httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})