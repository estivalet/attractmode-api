var fs = require('fs');
const attract = require('../../config/attractmode.config.js');

/**
 * Parse attract mode emulator config file.
 * @param {*} filename 
 */
exports.parseEmulatorConfig = function(filename) {
    let config = {};

    if (!fs.existsSync(filename)) {
        console.log("WARNING " + filename + " not found!");
        return config;
    }
    var data = fs.readFileSync(filename, "utf-8");

    config["artwork"] = [];
    config["romext"] = [];

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
    checkMediaAvailability(romlistEntry, config);
    checkGameAvailability(romlistEntry, config);
};

/**
 * Add metadata information if available under database folder inside rompath.
 * @param {*} romlistEntry 
 * @param {*} config 
 */
exports.addMetadata  = (romlistEntry, config) => {
    var metadataFile = attract.GLOG + "/" + config["rompath"].replace(/[..]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/") + "/metadata/" + romlistEntry.name + ".json";
    if(fs.existsSync(metadataFile)) {
        var json = JSON.parse(fs.readFileSync(metadataFile, "utf-8"));
        romlistEntry.description = json.description;
        romlistEntry.genre = json.genre;
        romlistEntry.publisher = json.publisher;
        romlistEntry.pcStatus = json.pcStatus;
    }
}

exports.updateMetadata  = (data, config) => {
    var dir = attract.GLOG + "/" + config["rompath"].replace(/[..]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/") + "/metadata/";
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    var metadataFile = dir + data.game + ".json";
    console.log("file-->" + metadataFile);
    var json = {};
    if(fs.existsSync(metadataFile)) {
        var json = JSON.parse(fs.readFileSync(metadataFile, "utf-8"));
        console.log("JSON");
        console.log(json);
    }
    json["name"] = data.game;
    json["pcStatus"] = data.PCStatus;
    console.log("JSON2");
    console.log(json);
    fs.writeFileSync(metadataFile, JSON.stringify(json));
}

/**
 * Loop through all artwork.
 * @param {*} romlistEntry 
 * @param {*} config 
 */
checkMediaAvailability = (romlistEntry, config) => {
    var artworks = [];
    var artexts = [ '.jpg', '.png', '.mp4', '.flv'];
    for(i=0; i < config["artwork"].length; i++) {
        var artpath = attract.GLOG + "/" + config["artwork"][i].path.replace(/[.][.]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/");
        var artwork = {};
        artwork["type"] = config["artwork"][i].type;
        for(j=0; j < artexts.length; j++) {
            artwork["available"] = fs.existsSync(artpath + "/" + romlistEntry.name + artexts[j]);
            if(artwork["available"]) {
                artwork["filename"] = artpath + "/" + romlistEntry.name + artexts[j];
                break;
            }
        }
        artworks.push(artwork);
    }
    romlistEntry.artwork = artworks;
};

/**
 * Loop through all rom extensions and check if it is available.
 * @param {*} romlistEntry 
 * @param {*} config 
 */
checkGameAvailability = (romlistEntry, config) => {
    var rompath;
    if(!config["rompath"].startsWith(attract.GLOG)) {
        rompath = attract.GLOG + "/" + config["rompath"].replace(/[.][.]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/");
    } else {
        rompath = config["rompath"].replace(/[..]/g,"").replace(/\\\\/g,"").replace(/\\/g,"/");
    }
    for(i=0; i < config["romext"].length; i++) {
        romlistEntry.available = fs.existsSync(rompath + "/" + romlistEntry.name + config["romext"][i]);
        if (romlistEntry.available) {
            romlistEntry.filename = rompath + "/" + romlistEntry.name + config["romext"][i];
            break;
        }
    }
};