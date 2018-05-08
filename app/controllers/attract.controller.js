const attract = require('../../config/attractmode.config.js');

/**
 * Get romlist from AttractMode frontend.
 * @param {Request} req
 * @param {Response} res 
 */
exports.getRomlist = (req, res) => {
    const fct = require('../tools/romlist-parser');
    const emuparser = require('../tools/emulator-parser');
    
    let promise = fct.parseRomlist(attract.HOME + '/romlists/' + req.params.romlist + '.txt');
    return promise.then(result => {
        // Check availability
        for(var i=0; i < result.length; i++) {
            config = emuparser.parseEmulatorConfig(attract.HOME + '/emulators/' + result[i].emulator + '.cfg');
            emuparser.checkAvailability(result[i], config);
        }
        // Return the game list.
        res.send(result);
    });

};



