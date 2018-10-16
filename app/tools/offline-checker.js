/**
 * Run it offline to check available games/media for all Attract Mode systems
 * 
 * First need to run csv-parser to parse systems from google spreadsheet. It will
 * generate a systems.json file with the systems to be processed.
 */
const fs = require('fs');

const attract = require('../../config/attractmode.config.js');
const rlparser = require('./romlist-parser.js');
const emuparser = require('./emulator-parser.js');

let rawdata = fs.readFileSync('systems.json');  
let systems = JSON.parse(rawdata);  

for(var r=0; r < systems.length; r++) {
    // Check only the systems that I have added a category in the spreadsheet.
    if(systems[r]["category"] != "") {
        console.log("Processing "  + systems[r]["system"]);
        // Replace "&" for Game & Watch for example.
        let path = attract.HOME + '/romlists/' + systems[r]["system"].replace(/&amp;/g, "&") + '.txt';
        if (fs.existsSync(path)) {
            let result = rlparser.parseRomlist(path);
            let available = 0;
            let favorite = 0;
            let artworks = {};
            for(var i=0; i < result.length; i++) {
                config = emuparser.parseEmulatorConfig(attract.HOME + '/emulators/' + result[i].emulator + '.cfg');
                if(!Object.keys(config).length) {
                    continue;
                }
                emuparser.checkAvailability(result[i], config);
                emuparser.addMetadata(result[i], config);
                if(result[i].available) {
                    available++;
                }
                if(result[i].favorite) {
                    favorite++;
                }
                for(var j=0; j < result[i].artwork.length; j++) {
                    if(!artworks[result[i].artwork[j].type]) {
                        if(result[i].artwork[j].available) {
                            artworks[result[i].artwork[j].type] = 1;
                        } else {
                            artworks[result[i].artwork[j].type] = 0;
                        }
                    } else {
                        if(result[i].artwork[j].available) {
                            artworks[result[i].artwork[j].type]++;
                        }
                    }
                }
            }

            //console.log(systems[r]["system"]);

            systems[r].games = result.length;
            systems[r].available = available;
            systems[r].favorite = favorite;
            systems[r].artworks = artworks;

            //for(var i=0; i < Object.keys(artworks).length; i++) {
                //systems[r].artworks.push(systems[r][Object.keys(artworks)[i]], artworks[Object.keys(artworks)[i]]);
            //}

            //console.log(systems[r]);
        }
}
}

let data = JSON.stringify(systems, null, 2);  
fs.writeFileSync('totals.json', data); 
