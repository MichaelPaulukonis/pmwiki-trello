<?php if (!defined('PmWiki')) exit();
/*
  The pmwiki-trello script adds support for listing trello cards.

  Copyright 2013 Michael Paulukonis http://michaelpaulukonis.com

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published
  by the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.
*/

$RecipeInfo['pmwiki-trello']['Version'] = '2013-06-18';


Markup('trello', 'directives',
       '/\\(:trello\\s*(.*?):\\)/ei',
       "TrelloMarkup(\$pagename, PSS('$1'))");

function TrelloMarkup($args) {

    $opt = ParseArgs($args);

    $html = '<div id="loggedout">
    <a id="connectLink" href="#">Connect To Trello</a>
</div>

<div id="loggedin">
    <div id="trelloheader">
        Logged in to Trello as <span id="fullName"></span>
        <a id="disconnect" href="#">Log Out</a>
    </div>

    <div id="output"></div>
</div> ';

    return $html;

}


$HTMLHeaderFmt['trello'] = "<link href='$PubDirUrl/pmwiki-trello/pmwiki-trello.css' rel='stylesheet'>";

global $trelloApiKey;


// load jQuery based on http://stackoverflow.com/a/10728220/41153
$HTMLFooterFmt['trello'] = '<script>window.jQuery || document.write("<script src=\'//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js\'>\x3C/script>")</script>
<script src="https://api.trello.com/1/client.js?key=$trelloApiKey"></script>
<script type="text/javascript" src="$PubDirUrl/pmwiki-trello/pmwiki-trello.js"></script>';

?>
