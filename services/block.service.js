const Block = require('../models/block.model');


const createGenesisBlock = async () => {
    try {
        const genesisBlock = await Block.create({
            index: 0,
            nonce: 0,
            timeStamp: Date.now(),
            data: 'Genesis Block',
            hash: '0000000000000000000000000000000000000000000000000000000000000000',
            nonce: 0,
        });
        return genesisBlock;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const createBlock = async (data) => {
    try {
        const block = await Block.create(data);
        return block;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getLastBlock = async () => {
    try {
        const allBlock = await Block.find();
        return allBlock[allBlock.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    createGenesisBlock,
    createBlock,
    getLastBlock
}