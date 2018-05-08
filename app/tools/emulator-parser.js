var fs = require('fs');
const attract = require('../../config/attractmode.config.js');

/**
 * Parse attract mode emulator config file.
 * @param {*} filename 
 */
exports.parseEmulatorConfig = function(filename) {
    let config = {};
    config["artwork"] = [];
    config["romext"] = [];

    var data = fs.readFileSync(filename, "utf-8");

    for(var i=0; i < data.split('\n').length; i++) {
        line = data.split('\n')[i];
        if (line.startsWith("executable")) {
            config["executable"] = line.substring("executable".length).trim();
        } else if (line.startsWith("args")) {
            config["args"] = line.substring("args".length).trim();
        } else if (line.startsWith("rompath")) {
            config["rompath"] = line.substring("rompath".length).trim();
        } else if (line.startsWith("romext")) {
            romexts = line.substring("romext".length).trim().split(";");
            for(var e=0; e < romexts.length; e++) {
                config["romext"].push(romexts[e]);
            }
        } else if (line.startsWith("artwork")) {
            var artwork = {};
            var type = line.substring("artwork".length).trim();
            type = type.substring(0,type.indexOf(' ',line.substring("artwork".length)));
            artwork["type"] = type.trim();

            var path = line.substring(line.indexOf(type.trim())+type.length);
            artwork["path"] = path.trim();

            config["artwork"].push(artwork);
        }
    }
    return config;
}

/**
 * Check availability of roms and medias configured for Attract Mode.
 * @param {*} name 
 * @param {*} config 
 */
exports.checkAvailability = (romlistEntry, config) => {
    this.checkMediaAvailability(romlistEntry, config);
    this.checkGameAvailability(romlistEntry, config);
};

/**
 * Loop through all artwork.
 * @param {*} romlistEntry 
 * @param {*} config 
 */
exports.checkMediaAvailability = (romlistEntry, config) => {
    var artworks = [];
    var artexts = [ '.jpg', '.png', '.mp4', '.flv'];
    for(i=0; i < config["artwork"].length; i++) {
        var artpath = attract.GLOG + "/" + config["artwork"][i].path.replace(/[..]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/");
        for(j=0; j < artexts.length; j++) {
            var filename = artpath + "/" + romlistEntry.name + artexts[j];
            if(fs.existsSync(filename)) {
                var artwork = {};
                artwork["type"] = config["artwork"][i].type;
                artwork["filename"] = romlistEntry.name + artexts[j];
                artworks.push(artwork);
                break;
            }
        }
    }
    romlistEntry.artwork = artworks;
};

/**
 * Loop through all rom extensions and check if it is available.
 * @param {*} romlistEntry 
 * @param {*} config 
 */
exports.checkGameAvailability = (romlistEntry, config) => {
    var rompath = attract.GLOG + "/" + config["rompath"].replace(/[..]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/");
    for(i=0; i < config["romext"].length || !romlistEntry.available; i++) {
        romlistEntry.available = fs.existsSync(rompath + "/" + romlistEntry.name + config["romext"][i]);
    }
};