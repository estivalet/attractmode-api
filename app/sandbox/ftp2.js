var ftpClient = require('ftp-client'),
    config = {
        host: 'retropie',
        port: 22,
        user: 'pi',
        password: 'raspberry'
    },
    options = {
        logging: 'debug'
    },
    client = new ftpClient(config, options);

console.log('ok' +client.config.host);

client.connect(function () {
console.log('hhh');
    client.upload(['F:/EmuDreams/platforms/Atari 2600/games/a*.*'], '/home/pi/RetroPie/roms/atari2600', {
        baseDir: 'atari2600',
        overwrite: 'older'
    }, function (result) {
        console.log(result);
    });



});