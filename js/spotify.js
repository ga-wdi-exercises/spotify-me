// API Docs at:
// https://developer.spotify.com/web-api/search-item/

$dropdown = $('#search-type') ;
$search = $('#search') ;
$keyword = $('#search-keyword')
$results = $('#results') ;

$search.on('submit', function(event) {
  event.preventDefault() ;
  var $searchValue = $keyword.val() ;
  // remove existing list items
  $results.empty() ;
  // check if artist or track is selected, run different functions for each selector
  if ($dropdown.val() == "artist") {
  searchByArtist($searchValue) ;
} else if ($dropdown.val() == "track") {
  searchByTrack($searchValue) ;
}
}) ;

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  $.ajax({
    url: url,
    success: function(response) {
      for (i=0; i < response.artists.items.length; i++) {
      var name = response.artists.items[i].name
      $results.append("<li>" + name + "</li>") ;
    }
    }
  })
}

function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  $.ajax({
    url: url,
    success: function(response) {
      for (i=0; i < response.tracks.items.length; i++) {
      var name = response.tracks.items[i].name.
      $results.append("<li>" + name + "</li>") ;
      }
    }
  }) ;
}
