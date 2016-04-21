// API Docs at:
// https://developer.spotify.com/web-api/search-item/


var $form = $('#search');
var $input = $('#search-keyword');
var $results = $('#results');
var $pagination = $('#pagination');
var $next = $('#next');

$form.on("submit", function(e){
  e.preventDefault()
  var keyword = $input.val();
  var $searchType = $('#search-type option:selected').val();
  var $typePlural = $searchType + 's';

  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=' + $searchType;
    $.get(url, function(response){
        printList(response[$typePlural].items);
        paginate(response);
  })

})

function printList(itemList){
  var resultsShowing = itemList.length;

  $results.empty();
  itemList.forEach(function(item){
    var $li = $("<li id='" + item.id + "'>" + item.name + "</li>");
    $results.append($li);
    $pagination.html('Showing ' + resultsShowing + ' results.');
  })
}

//Figure out how to replace URL so that

// function paginate(object){
//   var $searchType = $('#search-type option:selected').val();
//   var $typePlural = $searchType + 's';
//   var nextLink = object[$typePlural].next;
//   $next.html('<a href = "' + nextLink + '"> Next </a>');
//
// }

// function searchByTrack(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=track';
// }

// function searchByArtist(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=artist';
// }
