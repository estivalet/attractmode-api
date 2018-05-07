var fs = require('fs');
var readline = require('readline');

exports.parseRomlist = function(filename) {
    let games = [];
    let rd = readline.createInterface({
        input: fs.createReadStream(filename),
        console: false
    });

    return new Promise(function(resolve,reject) {
        rd.on('line', function(line) {
            if(!line.startsWith("#")) {
                var arr = line.split(";");
                games.push({
                            name:arr[0]
                        , title:arr[1]
                        , emulator: arr[2]
                        });
            }
        });

        rd.on('close', function() {
            var json = JSON.stringify(games);
            resolve(games);
        });
        // on 'error' call reject(error)
    });
};
