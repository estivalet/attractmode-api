module.exports = (app) => {
    const attract = require('../controllers/attract.controller.js');

    app.get('/attract/romlist/:romlist', attract.getRomlist);
}