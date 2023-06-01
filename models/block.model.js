const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema(
  {
    index: Number,
    prevHash: {
      type: String,
      default:
        "0000000000000000000000000000000000000000000000000000000000000000",
    },
    timeStamp: Date,
    data: String,
    hash: String,
    nonce: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Block', blockSchema);