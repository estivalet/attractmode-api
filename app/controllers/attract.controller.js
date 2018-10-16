var request = require('request');
var async = require('async');
const path = require("path");
const fs = require('fs');

const attract = require('../../config/attractmode.config.js');

/**
 * Get romlist from AttractMode frontend.
 * @param {Request} req
 * @param {Response} res 
 */
exports.getRomlist = (req, res) => {
    const rlparser = require('../tools/romlist-parser');
    const emuparser = require('../tools/emulator-parser');

    // Replace "&" for Game & Watch for example.
    let result = rlparser.parseRomlist(attract.HOME + '/romlists/' + req.params.romlist.replace(/&amp;/g, "&") + '.txt');
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.index = function(req, res) {
    async.parallel({
        categories: function(callback) {
            request.get({
                url: 'http://localhost:3002/attract/categories/all',
            }, function(error, response, body){
                if(error) {
                    callback(true, '{"error":"' + error + '"}');
                } else {
                    callback(null, body);
                }
            });    
        },
    }, function(err, results){
        if(err) {
            res.render('error', { message: JSON.parse(results.systems)});
        } else {
            res.render('amcp', 
                { 
                 categories: JSON.parse(results.categories) 
                });
        }
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.attract = function(req, res) {
    // Send a request to ATTRACTMODE API to read the romlist for the selected system and return it.
    console.log(req.params.systemName)
    request.get({
        url: 'http://localhost:3002/attract/romlist/' + req.params.systemName,
    }, function(error, response, body){
        var json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });    
};


/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.showSystem = function(req, res) {
    res.render('system', {name: req.params.systemName});
};

exports.offline = function(req, res) {
    try {
        let rawdata = fs.readFileSync(path.resolve(__dirname, '../../totals.json'));  
        var stats = fs.statSync(path.resolve(__dirname, "../../totals.json"));
        let systems = JSON.parse(rawdata);  
        const filtered = systems.filter(json => json.category == req.params.category);
        res.render('offline', { snapshot_date: stats.mtime, systems: filtered});
    } catch(error) {
        console.log(error);
        res.render('error', { message: error});
    }
};


exports.getCollection = getCollection;
