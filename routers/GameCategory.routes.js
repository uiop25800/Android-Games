const express = require('express');
const router =express.Router();
const GameCategoryController =require('../controller/GameCategoryController');

router.post('/postGame',GameCategoryController.postGame);

module.exports =router;