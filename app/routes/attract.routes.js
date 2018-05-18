module.exports = (app) => {
    const attract = require('../controllers/attract.controller.js');

    app.get('/attract/romlist/:romlist', attract.getRomlist);

    app.get('/attract/collection/:collection', attract.getCollection);

    app.get('/attract/categories/all', attract.getCategories);
}