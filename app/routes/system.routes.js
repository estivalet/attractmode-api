module.exports = (app) => {
    const system_controller = require('../controllers/system.controller.js');

    app.post('/system/send/:systemName', system_controller.sendSystemToRetropie);
}

