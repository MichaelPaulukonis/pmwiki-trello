pmwiki-trello
=============

Simple [Trello](https://trello.com) integration for [PmWiki](http://www.pmwiki.org).

Currently, a bare-bones markup that uses the Trello-provided demo app [Reading all the cards a member is assigned to](http://jsfiddle.net/nNesx/).



## Installation
You will need an API key, which you can get at https://trello.com/1/appKey/generate
Download the project, copy `pub/pmwiki-trello` to your pub folder, copy `pmwiki-trello.php` to your cookbook folder, and add to `config.php`:

    $trelloApiKey = "<your-trello-api-key>";
    include_once('$FarmD/cookbook/pmwiki-trello.php');


To use, apply the markup `(:trello:)` where you want it to appear. It might work best in a side-bar.


## Roadmap
- Better documentation on API-key
- Better handling of inputting API-key
- Better CSS
- List cards by Board
- Board filter (ie, show only cards from selected boards)
- Add Card



