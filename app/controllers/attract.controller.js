const Romlist = require('../models/romlist.model.js');

/**
 * Get romlist from AttractMode frontend.
 * @param {Request} req
 * @param {Response} res 
 */
exports.getRomlist = (req, res) => {
    const fct = require('../tools/romlist-parser');
    const emuparser = require('../tools/emulator-parser');
    
    let promise = fct.parseRomlist(req.params.romlist + '.txt');
    return promise.then(result => {

        // Check what roms are available.
        for(var i=0; i < result.length; i++) {
            config = emuparser.parseEmulatorConfig(result[i].emulator + ".cfg");
            result[i].available = true;
        }

        // Return the game list.
        res.send(result);
    });

};

