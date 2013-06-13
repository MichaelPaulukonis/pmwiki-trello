<?php if (!defined('PmWiki')) exit();
/*
  The pmwiki-trello script adds support for listing trello cards.

  Copyright 2013 Michael Paulukonis http://michaelpaulukonis.com

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published
  by the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.
*/

$RecipeInfo['pmwiki-trello']['Version'] = '2013-06-11';


Markup('trello', 'directives',
       '/\\(:trello\\s*(.*?):\\)/ei',
       "TrelloMarkup(\$pagename, PSS('$1'))");

function TrelloMarkup($args) {

        $opt = ParseArgs($args);

        $html = '<div id="loggedout">
    <a id="connectLink" href="#">Connect To Trello</a>
</div>

<div id="loggedin">
    <div id="header">
        Logged in to Trello as <span id="fullName"></span>
        <a id="disconnect" href="#">Log Out</a>
    </div>

    <div id="output"></div>
</div> ';

        return $html;

}

$HTMLStylesFmt['trello'] = "
body {
    font-family: arial;
    font-size: 12px;
}

#loggedout {
    text-align: center;
    font-size: 20px;
    padding-top: 30px;
}
#loggedin {
    display: none;
}

#header {
    padding: 4px;
    border-bottom: 1px solid #000;
    background: #eee;
}

#output {
    padding: 4px;
}

.card {
    display: block;
    padding: 2px;
}";

global $trelloApiKey;


// load jQuery based on http://stackoverflow.com/a/10728220/41153
$HTMLFooterFmt['trello'] = '<script>window.jQuery || document.write("<script src=\'js/jquery-1.10.1.min.js\'>\x3C/script>")</script>
<script src="https://api.trello.com/1/client.js?key=$trelloApiKey"></script>
<script type="text/javascript">
/*
based on original code at http://jsfiddle.net/nNesx/

See https://trello.com/docs for a list of available API URLs

The API development board is at https://trello.com/api

*/

var onAuthorize = function() {
    updateLoggedIn();
    $("#output").empty();

    Trello.members.get("me", function(member){
        $("#fullName").text(member.fullName);

        var $cards = $("<div>")
            .text("Loading Cards...")
            .appendTo("#output");

        // Output a list of all of the cards that the member
        // is assigned to
        Trello.get("members/me/cards", function(cards) {
            $cards.empty();
            $.each(cards, function(ix, card) {
                $("<a>")
                .attr({href: card.url, target: "trello"})
                .addClass("card")
                .text(card.name)
                .appendTo($cards);
            });
        });
    });

};

var updateLoggedIn = function() {
    var isLoggedIn = Trello.authorized();
    $("#loggedout").toggle(!isLoggedIn);
    $("#loggedin").toggle(isLoggedIn);
};

var logout = function() {
    Trello.deauthorize();
    updateLoggedIn();
};

Trello.authorize({
    interactive:false,
    success: onAuthorize
});

$("#connectLink")
.click(function(){
    Trello.authorize({
        type: "popup",
        success: onAuthorize
    })
});

$("#disconnect").click(logout);

</script>';


?>