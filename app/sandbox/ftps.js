var FTPS = require('ftps');
var ftps = new FTPS({
  host: 'retropie', // required
  username: 'pi', // Optional. Use empty username for anonymous access.
  password: 'raspberry', // Required if username is not empty, except when requiresPassword: false
  protocol: 'sftp', // Optional, values : 'ftp', 'sftp', 'ftps', ... default: 'ftp'
  // protocol is added on beginning of host, ex : sftp://domain.com in this case
  port: 22, // Optional
});

// Do some amazing things
//ftps.cd('/home/pi/RetroPie/roms/atari2600').addFile(__dirname + '/README.md').exec(console.log);

ftps.cd('/home/pi/RetroPie/roms/atari2600');
ftps.addFile('c:/temp/default.lay').exec(console.log);