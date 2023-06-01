const User = require('../models/user.model');


const createUser = async (user) => {
    try {
        const userS = await User.create(user);
        return userS;
    } catch (error) {
        console.log(error);
        return false;
    }
};
const findUserByEmail = async (email) => {
    try {
        const userS = await User.findOne({ email: email });
        return userS;
    } catch (error) {
        console.log(error);
        return false;
    }
};

const updateCoinForUser = async (email, coin) => {
    try {
        const uUser = User.findOneAndUpdate({ email: email }, {$inc: {coin: coin}}, {new: true});
        return uUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}
module.exports = {
    createUser,
    findUserByEmail,
    updateCoinForUser
}