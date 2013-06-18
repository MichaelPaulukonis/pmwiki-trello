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
            
            // will need to grab these values
            // construct a map of id:name
            // THEN grab the cards
            // since cards only have the ID (idBoard) available           
            
            var getBoards = function(next) {
                
                Trello.get("members/me/boards", { fields: "name, id" }, function(brds) {
                    
                    for (var i=0; i < brds.length; i++) {
                        boards[brds[i].id] = brds[i].name;
                    }
                    
                    next();
                    
                });
                
            };
            
            // Output a list of all of the cards that the member 
            // is assigned to
            var getCards = function() {
                Trello.get("members/me/cards", function(cards) {
                    $cards.empty();
                    $.each(cards, function(ix, card) {
                        //debugger;
                        // something more complicated.
                        // a new UL for each board?
                        $('<li>').append($("<a>")
                                         .attr({href: card.url, target: "trello"})
                                         .addClass("card")
                                         .text(boards[card.idBoard] + ' - ' +     card.name))
                            .appendTo($cards);
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