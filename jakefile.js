/*
  jakefile.js for pmwiki-bootstrap-skin

  only default path-values should be committed to repo
  TODO: alternate paths should be available, so changes can be pushed to test installs

  */

var path = require('path'),
    config = require('./config');


desc('This is a simple complete-project copy.');
task('default', [], function () {
    jake.cpR("pmwiki-trello.php", path.join(config.target, "cookbook"));
    jake.cpR("pub/pmwiki-trello/", path.join(config.target, "pub"));
    });
