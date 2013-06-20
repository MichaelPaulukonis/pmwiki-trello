pmwiki-trello
=============

Simple read-only [Trello](https://trello.com) integration for [PmWiki](http://www.pmwiki.org) that lists cards assigned to you.


## Installation
You will need an API key, which you can get at https://trello.com/1/appKey/generate

Download [the project zip](https://github.com/MichaelPaulukonis/pmwiki-trello/archive/master.zip), copy `pub/pmwiki-trello` to your pub folder, copy `pmwiki-trello.php` to your cookbook folder, and add the following to `config.php`:

    $trelloApiKey = "<your-trello-api-key>";
    include_once('$FarmD/cookbook/pmwiki-trello.php');


## Usage
* To use, apply the markup `(:trello:)` without any arguemments shows a list of all cards, sorted by board, where you want it to appear. It might work best in a side-bar.
* `(:trello board1,board2 +board3 include="board4,board5,board six" :)` to display only cards for the named boards (case-sensitive). Quotes are optional, unless there are spaces in the board-name.
* `(:trello -board1 exclude=board3,board5,"board six" :)` to display cards for all boards **except** as indicated.




## Roadmap
- Better handling of inputting/storing API-key
- Add Card
- See the [development Trello board](https://trello.com/board/pmwiki-trello-plugin/51b7e14d8675c5be58010acf) for further notes.



