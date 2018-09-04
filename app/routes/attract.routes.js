var express = require('express');
var router = express.Router();
var attract = require('../controllers/attract.controller.js');

router.get('/attract/romlist/:romlist', attract.getRomlist);

router.get('/attract/collection/:collection', attract.getCollection);

router.get('/attract/categories/all', attract.getCategories);

router.get('/system/:systemName/attract', attract.attract);

router.get('/attract/system/:systemName', attract.showSystem);

router.get('/', attract.index);

module.exports = router;