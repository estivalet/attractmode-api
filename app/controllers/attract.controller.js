const Romlist = require('../models/romlist.model.js');
const attract = require('../../config/attractmode.config.js');

exports.checkAvailable = (config) => {
   // console.log('-->' + config["rompath"]);
};

/**
 * Get romlist from AttractMode frontend.
 * @param {Request} req
 * @param {Response} res 
 */
exports.getRomlist = (req, res) => {
    const fct = require('../tools/romlist-parser');
    const emuparser = require('../tools/emulator-parser');
    console.log(attract.HOME);
    
    let promise = fct.parseRomlist(attract.HOME + '/romlists/' + req.params.romlist + '.txt');
    return promise.then(result => {
        // Check what roms are available.
        for(var i=0; i < result.length; i++) {
            config = emuparser.parseEmulatorConfig(attract.HOME + '/emulators/' + result[i].emulator + '.cfg');
            this.checkAvailable(config);
            //result[i].available = true;
        }

        // Return the game list.
        res.send(result);
    });

};



