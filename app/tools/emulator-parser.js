var fs = require('fs');

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
