var fs = require('fs');
var readline = require('readline');

exports.parseRomlist = function(filename) {
    // check if there is a favorites romlist ending in *.tag
    let favorites = [];
    if (fs.existsSync(filename.replace(".txt",".tag"))) {
        var lines = fs.readFileSync(filename.replace(".txt",".tag"), 'utf-8').split('\n').filter(Boolean);
        for(var i=0; i < lines.length; i++) {
            if(!lines[i].startsWith("#")) {
                var arr = lines[i].split(";");
                favorites.push(arr[0]);
            }
        }
    }

    // parse romlist
    let games = [];
    if (fs.existsSync(filename)) {
        var lines = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
        for(var i=0; i < lines.length; i++) {
            if(!lines[i].startsWith("#")) {
                var arr = lines[i].split(";");
                games.push({name:arr[0], title:arr[1], emulator: arr[2], favorite: favorites.indexOf(arr[0]) > -1});
            }
        }
    }
    return games;
};

exports.parseCategories = (filename) => {
   return fs.readFileSync(filename, 'utf8').trim().split(',');
};