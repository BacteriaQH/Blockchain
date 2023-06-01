const { getLastBlock } = require("../services/block.service");

const PoS = {
    get: async(req, res) => {
        const lastBlock = await getLastBlock();
        res.render('pos', { title: 'PoS', lastBlock});
    },
    post: (req, res) => {
        res.json(req.body);
    }
}

module.exports = PoS;