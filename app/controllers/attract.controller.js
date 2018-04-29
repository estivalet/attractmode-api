const Romlist = require('../models/romlist.model.js');

/**
 * Get romlist from AttractMode frontend.
 * @param {Request} req
 * @param {Response} res 
 */
exports.getRomlist = (req, res) => {
    const fct = require('../tools/romlist-parser');
    let promise = fct.myfunction('Atari 2600.txt');
    return promise.then(result => {
        console.log(result);
       res.send(result);
    });

};
