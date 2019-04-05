var fs = require('fs');
var sftp = require('sftp-node');

var options = {
  host: 'retropie',
  port: '22',
  username: 'pi',
  password: 'raspberry'
};

sftp.upload(options, '/home/pi/RetroPie/roms/atari2600/readme', './README.md', function(err,res){
  if(err) console.log('err: '+err);
  else{
    console.log('res: '+res);
  }
});