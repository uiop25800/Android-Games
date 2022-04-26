const express = require('express');
const router =express.Router();
const UserController =require('../controller/UserController');

router.post('/Register',UserController.resigter);
router.post('/Login',UserController.login);

module.exports = router;