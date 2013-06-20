/*
  based on original code at http://jsfiddle.net/nNesx/

  requires jQuery

  See https://trello.com/docs for a list of available API URLs

  The API development board is at https://trello.com/api

*/

var pmwikitrello = function() {

    var onAuthorize = function() {
        updateLoggedIn();
        $("#output").empty();

        Trello.members.get("me", function(member){
            $("#fullName").text(member.fullName);

            var $cards = $("<ul>")
                .text("Loading Cards...")
                .appendTo("#output");

            var boards = {};
            var includeList = trelloinclude.split(',');
            var excludeList = trelloexclude.split(',');
            // crude trap for "split on an empty string returns an array of 1 empty string"
            if (includeList[0] === "") includeList = [];
            if (excludeList[0] === "") excludeList = [];
            
            var getBoards = function(next) {

                // possible there is a built-in filter?
                // per https://trello.com/docs/api/member/index.html#get-1-members-idmember-or-username-boards-filter
                // but I'll be d****d if I can make heads or tails of the Trello API docs.
                Trello.get("members/me/boards", { fields: "name, id" }, function(brds) {
                    
                    for (var i=0; i < brds.length; i++) {
                        boards[brds[i].id] = brds[i].name;
                    }
                    
                    next();
                    
                });
                
            };
            
            // Output a list of all of the cards that the member is assigned to
            // and that match the filters
            var getCards = function() {
                Trello.get("members/me/cards", function(cards) {
                    $cards.empty();
                    var list = {};                
                    
                    $.each(cards, function(ix, card) {
                        var boardName = boards[card.idBoard];
                        var item = $('<li>').append($("<a>")
                                        .attr({href: card.url, target: "trello"})
                                        .addClass("card")
                                        .text(card.name));
                        // if includeList has (matching) entries, only matching entries will be displayed
                        var included = (includeList.length === 0 || ($.inArray(boardName, includeList) > -1));
                        var excluded = ($.inArray(boardName, excludeList) > -1);
                        if (included && !excluded) {
                            if (!list[boardName]) list[boardName] = []; // init new board in list
                            list[boardName].push(item);
                        }
                    });
                    
                    $.each(list, function(board) {
                        var $boardlist = $('<li/>').append(
                            $('<h3/>').addClass('board-title').text(board)).append(
                            $('<ul>').addClass('board').append(
                                $.each(list[board], function(ix, item) {
                                    item.appendTo($boardlist);
                                })));

                        $boardlist.appendTo($cards);
                    });
                    
                });
            };
            
            getBoards(getCards);
            
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
            });
        });

    $("#disconnect").click(logout);

}();