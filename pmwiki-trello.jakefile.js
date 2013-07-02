/*
  jakefile.js for pmwiki-bootstrap-skin

  TODO: project-path should come from an external config file
  only default path-values should be committed to repo
  TODO: alternate paths should be available, so changes can be pushed to test installs
  
  */

var path = require('path');

var target = "d:/projects/pmwiki-trello";

desc('This is a simple complete-project copy.');
task('default', [], function () {
    jake.cpR("pmwiki-trello.php", target);
    jake.cpR("pmwiki-trello.jakefile.js", target);
    jake.cpR("../pub/pmwiki-trello/", path.join(target, "pub"));
    });