/*
 based on original code at http://jsfiddle.net/nNesx/

 requires jQuery

 See https://trello.com/docs for a list of available API URLs

 The API development board is at https://trello.com/api

 */

var pmwikitrello = function() {

    var onAuthorize = function() {

        updateLoggedIn();
        $(".output").empty();

        // TODO: actual work occurs below


        var getBoards = function(boards, $cards, includeList, excludeList) {

            // possible there is a built-in filter?
            // per https://trello.com/docs/api/member/index.html#get-1-members-idmember-or-username-boards-filter
            // but I'll be d****d if I can make heads or tails of the Trello API docs.
            // Trello.get("members/me/boards", { fields: "name, id, url" }, function(brds) {
            // the filter with name, id, url failed to retrieve the url. ???!??
            Trello.get("members/me/boards", { }, function(brds) { // unfiltered list (all fields)

                for (var i=0; i < brds.length; i++) {
                    boards[brds[i].id] = {name: brds[i].name, url: brds[i].url};
                }

                getCards($cards, boards, includeList, excludeList);

            });

        };

        // get all cards assigned to user
        // and associate with board
        var getCards = function($cards, boards, includeList, excludeList) {

            Trello.get("members/me/cards", function(cards) {

                $cards.empty();
                var list = {};

                $.each(cards, function(ix, card) {
                    var boardName = boards[card.idBoard].name;
                    var item = { href: card.url, name: card.name };

                    if (!list[card.idBoard]) { list[card.idBoard] = []; } // init new board in list
                    list[card.idBoard].push(item);

                });

                outputCards($cards, list, boards, includeList, excludeList);

            });
        };

        // TODO: ugh. that's a lot of params that keep getting passed around
        // but at least everything is now explicitly referenced
        var outputCards = function($cards, list, boards, includeList, excludeList) {

            $.each(list, function(board) {

                var included = (includeList.length === 0 || ($.inArray(boards[board].name, includeList) > -1));
                var excluded = ($.inArray(boards[board].name, excludeList) > -1);
                if (!included || excluded) {
                    return true;
                }

                var $sublist = $('<ul>').addClass('board');
                $.each(list[board], function(ix, item) {
                    var l = $('<li>').append($("<a>")
                                             .attr({href: item.href, target: "trello"})
                                             .addClass("card")
                                             .text(item.name));

                    l.appendTo($sublist);
                });

                var $boardlist = $('<li/>').append(
                    $('<h3/>').addClass('board-title')
                        .html($('<a>').attr({href: boards[board].url, target: "trello"}).text(boards[board].name)))
                        .append($sublist);

                $boardlist.appendTo($cards);

                return true; // continue each as normal

            });
        };

        var processMember = function(member) {

            $(".fullName").text(member.fullName);

            var $cards = $("<ul>")
                    .text("Loading Cards...")
                    .appendTo(".output");

            var boards = {};
            // defined in external script. tsk tsk. will be retreived different....
            // TODO: place into parameters and retrieve....
            // now available in the specific data-prefix as data-include and data-exclude
            // but... we don't have the prefix known, here.
            // so. we should be looping through all the trello instances, shouldn't we....
            var includeList = trelloinclude.split(',');
            var excludeList = trelloexclude.split(',');
            // crude trap for "split on an empty string returns an array of 1 empty string"
            if (includeList[0] === "") includeList = [];
            if (excludeList[0] === "") excludeList = [];


            getBoards(boards, $cards, includeList, excludeList);

        };

        Trello.members.get("me", function(member) { processMember(member); } );

    };

    var updateLoggedIn = function() {
        var isLoggedIn = Trello.authorized();
        $(".loggedout").toggle(!isLoggedIn);
        $(".loggedin").toggle(isLoggedIn);
    };

    var logout = function() {
        Trello.deauthorize();
        updateLoggedIn();
    };

    Trello.authorize({
        interactive: false,
        success: onAuthorize
    });

    $(".connectLink")
        .click(function(){
            Trello.authorize({
                type: "popup",
                success: onAuthorize
            });
        });

    $(".disconnect").click(logout);

}();
