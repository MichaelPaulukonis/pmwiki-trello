/*
 jakefile.js for pmwiki-bootstrap-skin

 only default path-values should be committed to repo
 TODO: alternate paths should be available, so changes can be pushed to test installs

 */

var path = require('path'),
    config = require('./config'),
    maintarg = 'pmwiki-trello.php';


desc('This is a simple complete-project copy.');
task('default', [], function () {
    jake.cpR("pmwiki-trello.php", path.join(config.target, "cookbook"));
    jake.cpR("pub/pmwiki-trello/", path.join(config.target, "pub"));
});


desc('version replacement task');
task('version', [], function() {
    // http://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs
    var fs = require('fs');
    fs.readFile(maintarg, 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        // this should be done on a COPY of the file...
        // in a targeted release dir....
        var result = data.replace(/{{VERSION}}/g, getDateFormatted());

        fs.writeFile(maintarg, result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
});

// TODO: use the getDateFormatted for zip-file names?
// but use semantic versioning per https://github.com/MichaelPaulukonis/pmwiki-bootstrap-skin/blob/master/Jakefile.js

var getDateFormatted = function() {
    var d = new Date();
    var df = d.getFullYear() + '.' + pad((d.getMonth() + 1), 2) + '.' + pad(d.getDate(), 2);
    return df;
};

var pad = function(nbr, width, fill) {
    fill = fill || '0';
    nbr = nbr + '';
    return nbr.length >= width ? nbr : new Array(width - nbr.length + 1).join(fill) + nbr;
};
