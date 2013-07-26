/*
  jakefile.js for pmwiki-bootstrap-skin

  TODO: project-path should come from an external config file
  only default path-values should be committed to repo
  TODO: alternate paths should be available, so changes can be pushed to test installs
  
  */

var path = require('path');

// it would be nicer if this were in (an) external config(s)
var target = "c:/dev/xampp/htdocs/projects/pmwikitest/";


desc('This is a simple complete-project copy.');
task('default', [], function () {
    jake.cpR("pmwiki-trello.php", path.join(target, "cookbook"));
    jake.cpR("pub/pmwiki-trello/", path.join(target, "pub"));
    });