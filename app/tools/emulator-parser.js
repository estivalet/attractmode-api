var fs = require('fs');
fs.readFile("../../Atari 2600.cfg", "utf-8", function(error, data) {
    var json = {};
    json["artwork"] = [];
    for(var i=0; i < data.split('\n').length; i++) {
        line = data.split('\n')[i];
        if (line.startsWith("executable")) {
            json["executable"] = line.substring("executable".length).trim();
        } else if (line.startsWith("args")) {
            json["args"] = line.substring("args".length).trim();
        } else if (line.startsWith("rompath")) {
            json["rompath"] = line.substring("rompath".length).trim();
        } else if (line.startsWith("romext")) {
            json["romext"] = line.substring("romext".length).trim();
        } else if (line.startsWith("artwork")) {
            var artwork = {};
            var type = line.substring("artwork".length).trim();
            type = type.substring(0,type.indexOf(' ',line.substring("artwork".length)));
            artwork["type"] = type.trim();

            var path = line.substring(line.indexOf(type.trim())+type.length);
            artwork["path"] = path.trim();

            json["artwork"].push(artwork);
        }
    }
    console.log(json);
});
