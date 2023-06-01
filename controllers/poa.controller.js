const { getLastBlock } = require("../services/block.service");

const PoA = {
  get: async (req, res) => {
    const lastBlock = await getLastBlock();
    res.render("poa", { title: "PoA", lastBlock });
  },
};

module.exports = PoA;