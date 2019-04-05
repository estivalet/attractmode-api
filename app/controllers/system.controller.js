var request = require('request');
var async = require('async');
const System = require('../models/system.model.js');

exports.sendSystemToRetropie = (req, res) => {
    async.parallel({
        // Get romlist from AttractMode API for the selected system.
        romlist: function(callback) {
            request.get({
                url: 'http://localhost:3002/attract/romlist/' + req.params.systemName,
            }, function(error, response, body){
                if(error) {
                    callback(true, '{"error":"' + error + '"}');
                } else {
                    callback(null, JSON.parse(body));
                }
            });    
        },
        // Get all retropie's systems details information (rompath, collection, required bios, other configuration)
        retropie: function(callback) {
            System.find()
            .then(system => {
                console.log('--->' + system);
                callback(null, system);
            }).catch(err => {
                callback(true, '{"error":"' + err + '"}');
            });
        }
    }, function(err, results){
        // Get rom files and respective systems (emulators) to send via FTP.
        var files = [];
        var systems = [];
        for(var i=0; i < results.romlist.length; i++) {
            if(!req.body.favorites) {
                if(results.romlist[i].filename) {
                    files.push(results.romlist[i].filename);
                    systems.push(results.romlist[i].emulator);
                } else {
                    console.log('game not found--> ' + results.romlist[i].name + " for " + results.romlist[i].emulator);
                }
            }
            else if(req.body.favorites == 'on' && results.romlist[i].favorite) {
                if(results.romlist[i].filename) {
                    files.push(results.romlist[i].filename);
                    systems.push(results.romlist[i].emulator);
                } else {
                    console.log('game not found--> ' + results.romlist[i].name + " for " + results.romlist[i].emulator);
                }
            }
        }
        // Prepare data to send to FTP service.
        var postData={
            files: JSON.stringify(files),
            systems: JSON.stringify(systems),
            systemName: req.params.systemName,
            //destFolder: results.retropie.folder,
            retropieMap: JSON.stringify(results.retropie),
            host: req.body.host,
            port: req.body.port,
            username: req.body.username,
            password: req.body.password,
            wheel: req.body.wheel,
            box: req.body.box,
            cart: req.body.cart,
            shot: req.body.shot,
            video: req.body.video,
            overwrite: req.body.overwrite
        };
        // Call backend Java to perform FTP to retropie because I was not able do it
        // using nodejs.
        request.put({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url: 'http://localhost:4567/retropie/ftp',
            method: 'put',
            body:require('querystring').stringify(postData)
        }, function(error, response, body){
            console.log('errro-->' , error);
            res.send('{"message":"OK"}');
        });    
    });
};