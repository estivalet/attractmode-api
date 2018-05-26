const fs = require('fs');

// Prepare AttractMode after unzipping it to c:\attract

// Delete files attract/emulators/*.* default installation (ONLY ONCE)
// Delete files attract/menu-art/wheel/*.* default installation (ONLY ONCE)
// Copy RocketLauncher to c:\attract and configure it
// Create user folder inside c:\attract
// Create emulators and systems folders inside c:\attract\user
// Copy retroarch to c:\attract\user\emulators folder
// Execute retroarch first time
// Download retroarch cores

// Maybe create a new attractmode zipped file with above structure done.

function addSystemToAttractModeConfigFile(layout, system) {
    var entry = "\ndisplay " + system;
    entry += "\n    layout    " + layout;
    entry += "\n    romlist    " + system;
	entry += "\n    in_cycle    yes";
	entry += "\n    in_menu    yes";
	entry += "\n    global_filter";
    entry += "\n        rule    FileIsAvailable equals 1";
	entry += "\n    filter    All";
	entry += "\n    filter    Favourites";
    entry += "\n    rule    Favourite equals 1";

    fs.appendFile('c:/attract/attract.cfg', entry, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
      
}

addSystemToAttractModeConfigFile('Basic', 'Atari 2600');

