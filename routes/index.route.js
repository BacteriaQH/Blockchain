const express = require('express');

const AuthController = require('../controllers/auth.controller');
const PoW = require('../controllers/pow.controller');
const PoA = require('../controllers/poa.controller');
const PoS = require('../controllers/pos.controller');

const router = express.Router();

router.get('/register',AuthController.RegisterController.get).post('/register',AuthController.RegisterController.post);
router.get('/login',AuthController.LoginController.get).post('/login',AuthController.LoginController.post);
router.get('/pow', PoW.get).post('/pow',PoW.post);
router.get('/poa', PoA.get).post('/poa',PoW.post);
router.get('/pos', PoS.get).post('/pos',PoW.post);


module.exports = router;