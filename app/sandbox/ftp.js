let Client = require('ssh2-sftp-client');
let sftp = new Client();

const config = {
    host: 'retropie',
    port: '22',
    username: 'pi',
    password: 'raspberry'
};

const put1 = () => {
    sftp.connect(config).then(() => {
        return sftp.put("C:/Temp/cfg/default.cfg", "/home/pi/RetroPie/roms/fba/default.cfg");
    });
};

const mkdir = (dir) => {
    return sftp.connect(config).then(() => {
        return sftp.mkdir("/home/pi/RetroPie/roms/" + dir, true).then(() => {
            console.log("dir " + dir + " created");
        });
    });
};

var folders = ["sfc","msx2","msx2+"];
var promises = [];
for(var i =0; i < folders.length; i++) {
    promises.push(mkdir(folders[i]));
}
console.log('END');


Promise.all(promises).then(function() {
    console.log('ALL DONE');
    sftp.end();
});

//mkdir("sfc");
/*
sftp.connect({
    host: 'retropie',
    port: '22',
    username: 'pi',
    password: 'raspberry'
}).then(() => {
    return sftp.list('/home/pi/');
}).then((data) => {
    console.log('ok');
    console.log(data, 'the data info');
}).catch((err) => {
    console.log(err, 'catch error');
});
*/
//sftp.end();