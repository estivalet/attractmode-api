const attract = require('../../config/attractmode.config.js');

/**
 * Get romlist from AttractMode frontend.
 * @param {Request} req
 * @param {Response} res 
 */
exports.getRomlist = (req, res) => {
    const rlparser = require('../tools/romlist-parser');
    const emuparser = require('../tools/emulator-parser');
    
    let result = rlparser.parseRomlist(attract.HOME + '/romlists/' + req.params.romlist + '.txt');
    for(var i=0; i < result.length; i++) {
        config = emuparser.parseEmulatorConfig(attract.HOME + '/emulators/' + result[i].emulator + '.cfg');
        emuparser.checkAvailability(result[i], config);
        emuparser.addMetadata(result[i], config);
    }
    res.send(result);
};

exports.getCategories = (req, res) => {
    const parser = require('../tools/romlist-parser');
    res.send(parser.parseCategories(attract.HOME + '/romlists/' + 'GLOG_Categories.txt'));
};

async function parseRomlist(romlist) {
    const romlistParser = require('../tools/romlist-parser');
    return await romlistParser.parseRomlist(attract.HOME + '/romlists/' + romlist + '.txt');
};

async function getCollection (req, res) {
    let systems = [];
    const list = await parseRomlist(req.params.collection);
    for(var i=0; i < list.length; i++) {
        const list2 = await parseRomlist(list[i].name);
        systems.push(JSON.parse("{\"" + list[i].name + "\":" + list2.length + "}"));
    }
    res.send(systems);
};

exports.getCollection = getCollection;
