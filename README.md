pmwiki-trello
=============

Simple read-only [Trello](https://trello.com) integration for [PmWiki](http://www.pmwiki.org) that lists cards assigned to you.


## Installation
You will need an API key, which you can get at https://trello.com/1/appKey/generate

Download [the project zip](https://github.com/MichaelPaulukonis/pmwiki-trello/archive/master.zip), copy `pub/pmwiki-trello` to your pub folder, copy `pmwiki-trello.php` to your cookbook folder, and add the following to `config.php`:

    $trelloApiKey = "<your-trello-api-key>";
    include_once('$FarmD/cookbook/pmwiki-trello.php');


## Markup
To use, apply the markup `(:trello:)` where you want it to appear. It might work best in a side-bar.


## Roadmap
- Board filter (ie, show only cards from selected boards)
- Better handling of inputting/storing API-key
- Add Card
- See the [development Trello board](https://trello.com/board/pmwiki-trello-plugin/51b7e14d8675c5be58010acf) for further notes.



