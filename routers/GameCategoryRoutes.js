const express = require('express');
const router =express.Router();
const GameCategoryController =require('../controller/GameCategoryController');

router.post('/postGame',GameCategoryController.postGame);
router.get('/getAllGame',GameCategoryController.getAllGame);
router.get('/getGameById',GameCategoryController.getGameById);
router.put('/updateGameById',GameCategoryController.updateGameById);
router.delete('/delGameById',GameCategoryController.deleteById);

module.exports =router;