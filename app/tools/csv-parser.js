const fs = require('fs'); 
const csv = require('csv-parser');

let systems = [];

/** parse my google spreadsheet with systems */
fs.createReadStream("c:/users/luisoft/Desktop/systems.csv")
    .pipe(csv())
    .on('data', function(data){
        try {
            
            if(data["Based On"]) {

                console.log(data.System + " is based on " + data["Based On"]);

                var obj = systems.find(function (obj) { return obj.system == data["Based On"]; });


                if (obj) {
                    // main system found
                    console.log("system found " + obj.system + " adding based on");
                    let json_sub = {
                        system: data["System"],
                        category: data["Category"],
                    }            
                    obj["subsystems"].push(json_sub);
                    console.log(obj);
                    systems.push(json_sub);
                } else {
                    // main system not found
                    console.log(data["Based On"] + " not found");
                    let json_main = {
                        system: data["Based On"],
                        subsystems: []
                    }            
                    let json_sub = {
                        system: data["System"],
                        category: data["Category"],
                    }            
                    json_main["subsystems"].push(json_sub);
                    systems.push(json_main);
                    systems.push(json_sub);
                }
        
            } else {
                var obj = systems.find(function (obj) { return obj.system == data["System"]; });

                if(!obj) {
                    // system not added yet.
                    let json = {
                        system: data["System"],
                        category: data["Category"],
                        favorite: data["Favourite"],
                        subsystems: []
                    }         
                    console.log("Adding " + data["System"]);
                    systems.push(json);
                } else {
                    console.log("Updting " + data["System"]);
                    obj.category = data["Category"];
                    obj.favorite = data["Favourite"];

                }

            }
        }
        catch(err) {
            //error handler
            console.log(err);
        }
    })
    .on('end',function() {
        //some final operation
        let data = JSON.stringify(systems, null, 2);  
        fs.writeFileSync('systems.json', data); 
        /*
        for(var s=0; s < systems.length; s++) {
            if(systems[s].system == 'Sega Game Gear') {
                console.log(systems[s]);
            }
        }*/
    });  