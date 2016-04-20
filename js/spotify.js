// API Docs at: 
// https://developer.spotify.com/web-api/search-item/

// ## Basic Requirements:
//  - Enter a keyword to seach for.
//  - Select "artist" or "track" as the search type.
//  - Have the names of all search results print as a list.

//create variables from index.html ids
 var $form = $("search")
 var $searchByArtistOrTrack = $("search-type")
 var $results = $("results")
 var $input = $("search-keyword")

//search by artist
$form.on("submit", function searchByArtist(keyword) {
  keyword.preventDefault()
  $.ajax({
      url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist',
      $.get(url, function(response);
      var artists = console.log(response);
      buildList(response.Search)
  })
}

//search by track
$form.on("submit", function searchByTrack(keyword) {
  keyword.preventDefault()
  $.ajax({
    url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
      $.get(url, function(response);
      var tracks = console.log(response);
      buildList(response.Search)
  })
}
//show artists search results as a list
function buildList(artists){
  artists.forEach(function(artist){
    for (i = 0; i <response.artists.length; i++) {
      var $resultListItem = $("<li>" + response.artists[i].name + "</li>")
      $results.append($resultListItem)
    }
  }
}

//show tracks search results as a list
function buildList(tracks){
  tracks.forEach(function(track){
    for (i = 0; i <response.tracks.length; i++) {
      var $resultListItem = $("<li>" + response.tracks[i].name + "</li>")
      $results.append($resultListItem)
    }
  }
}

})