const { getLastBlock, createBlock } = require("../services/block.service");
const { updateCoinForUser } = require("../services/user.service");
const getSocketID = require("../util/getSocketId");

const PoW = {
    get: async(req, res) => {
        const lastBlock = await getLastBlock();
        return res.render('pow', { title: 'PoW', lastBlock});
    },
    post: async (req, res) => {
        const io = req.io;
        const socketId = getSocketID(io);
        console.log(socketId);
        const block = req.body.block;
        const user = req.body.user;
        const lastBlock = await getLastBlock();

        if(Number(block.index) === lastBlock.index + 1){
            if(block.prevHash === lastBlock.hash){
                const nBlock = await createBlock(block);
                const uUser = await updateCoinForUser(user.email, 1);
                io.emit('lastest hash', {hash: nBlock.hash, index: nBlock.index});
                return res.json({code: 200, message: 'Mined successfully!', block: nBlock, user: uUser});
            }else{
                return res.json({code: 400, message: 'Previous hash is not valid!'});
            }
        }else {
          return res.json({ code: 400, message: "Index is not valid!" });
        }
    }
}

module.exports = PoW;