const { createGenesisBlock } = require("../services/block.service");
const { createUser, findUserByEmail } = require("../services/user.service");
const { hashPassword, comparePassword } = require("../util/hash");

const AuthController = {
    RegisterController : {
        get: (req, res) => {
            res.render('register', {title: 'Register'});
        },
        post: async (req, res) => {
            const body = req.body;
            const hashP = await hashPassword(body.password);
            const user = await createUser({...body, password: hashP});
            return res.status(200).json({code: 200, message: 'Account created successfully!'});
        }
    },
    LoginController : {
        get: (req, res) => {
            res.render('login', {title: 'Login'});
        },
        post: async(req, res) => {
            const body = req.body;
            // const nBlock = await createGenesisBlock();
            // console.log(nBlock);
            // console.log('Tao block thanh cong!')
            const user = await findUserByEmail(body.email);
            if(!user){
                return res.status(400).json({code: 400, message: 'User not found!'});
            }else{
                const compare = await comparePassword(body.password, user.password);
                if(!compare){
                    return res.status(400).json({code: 400, message: 'Wrong password!'});
                }else{
                    return res.status(200).json({code: 200, message: 'Login success!', user: {...user._doc, password: undefined}});
                }
            }
        }
    }
}

module.exports = AuthController;