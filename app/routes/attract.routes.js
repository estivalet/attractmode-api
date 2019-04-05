var express = require('express');
var router = express.Router();
var attract = require('../controllers/attract.controller.js');

router.get('/attract/romlist/:romlist', attract.getRomlist);

router.get('/attract/collection/:collection', attract.getCollection);

router.get('/attract/categories/all', attract.getCategories);

router.get('/system/:systemName/attract', attract.attract);

router.get('/attract/system/:systemName', attract.showSystem);

// example: http://localhost:3002/attract/offline/Consoles
router.get('/attract/offline/:category', attract.offline);

router.get('/box', attract.box);

router.get('/', attract.index);

router.post('/attract/game/status', attract.gameStatus);

module.exports = router;