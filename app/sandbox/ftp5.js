const testFolder = 'F:/EmuDreams/platforms/Atari 2600/games/';
const fs = require('fs');
let Client = require('ssh2-sftp-client');

const config = {
    host: 'retropie',
    port: '22',
    username: 'pi',
    password: 'raspberry'
};

function sendFile(sftp,filename) {
    console.log(filename);
    return sftp.connect(config).then(() => {
        return sftp.put(filename, "/home/pi/RetroPie/roms/atari2600/" + filename.substr(filename.lastIndexOf('/')+1));
    }).catch((err) => {
        console.log(err, 'catch error');
    });
};

let sftp = new Client();
var i = 0;
var promises = [];

var files = []
fs.readdirSync(testFolder).forEach(file => {
    if (!fs.lstatSync(testFolder + file).isDirectory()) {
        files.push(testFolder + file);
    }
});

function send(files) {
    let file = files[0];
    console.log('-->' + file);
    let sftp = new Client();
    sftp.connect(config).then(() => {
        sftp.put(file, "/home/pi/RetroPie/roms/atari2600/" + file.substr(file.lastIndexOf('/')+1)).then(() =>{
            sftp.end();
            if (files.length === 1) { return; } 
            send(files.slice(1)); 
        })
    });
}

//sftp.connect(config);
send(files);
//sftp.end();
/*
for(var i=0; i < 30; i++) {
    promises.push(sendFile(sftp,files[i]));
}

Promise.all(promises).then(function() {
    console.log('DONE');
});
*/