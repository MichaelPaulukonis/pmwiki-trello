<?php if (!defined('PmWiki')) exit();
/*
  The pmwiki-trello script adds support for listing trello cards.

  Copyright 2013 Michael Paulukonis http://michaelpaulukonis.com

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published
  by the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.
*/

$RecipeInfo['pmwiki-trello']['Version'] = '2013-06-19';


global $trelloInclude, $trelloExclude;

Markup('trello', 'directives',
       '/\\(:trello(\\s+.*?)?:\\)/ei',
       "TrelloMarkup(PSS('$1'))");


function TrelloMarkup($args) {

    $opt = ParseArgs($args);

    $trelloInclude = array_merge((array)@$opt[''], (array)@$opt['+'], (array)@$opt['include']);
    $trelloExclude = array_merge((array)@$opt['-'], (array)@$opt['exclude']);
    # this seems excessive
    $trelloInclude = array_map('trim', explode(',', implode(',', $trelloInclude)));
    $trelloExclude = array_map('trim', explode(',', implode(',', $trelloExclude)));

    # TODO: the push of the includes/excludes to the is a bit crude?
    # TODO: some sort of notice that there are boards not included?
    # particular if ALL boards are excluded?
    # and, I suppose, even displaying THAT should be an option....

    $prefix = uniqid(rand());


    # the include/exclude directive needs to be instance-specific
    # so, make it part of the html directly, instead of the js
    # and make the js read it
    $html = '<div id="loggedout" class="loggedout">
    <a id="connectLink" class="connectLink" data-prefix="'.$prefix.'" href="#">Connect To Trello</a>
</div>

<div id="loggedin" class="loggedin" data-prefix="'.$prefix.'" >
    <div id="trelloheader" class="trelloheader" data-prefix="'.$prefix.'" >
        Logged in to Trello as <span id="fullName" class="fullName" data-prefix="'.$prefix.'" ></span>
        <a id="disconnect" class="disconnect" data-prefix="'.$prefix.'" href="#">Log Out</a>
    </div>

    <div id="output" class="output" data-prefix="'.$prefix.'" ></div>
    <script type="text/javascript">var trelloinclude = "'.implode(',', $trelloInclude).'";
var trelloexclude = "'.implode(',', $trelloExclude).'";</script>

</div>';

    return $html;

}


$HTMLHeaderFmt['trello'] = "<link href='$PubDirUrl/pmwiki-trello/pmwiki-trello.css' rel='stylesheet'>";

global $trelloApiKey;


// load jQuery based on http://stackoverflow.com/a/10728220/41153
$HTMLFooterFmt['trello'] = '<script>window.jQuery || document.write("<script src=\'//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js\'>\x3C/script>")</script>
<script src="https://api.trello.com/1/client.js?key=$trelloApiKey"></script>
<script type="text/javascript" src="$PubDirUrl/pmwiki-trello/pmwiki-trello.js"></script>';

?>
