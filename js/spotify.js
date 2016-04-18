// API Docs at:
// https://developer.spotify.com/web-api/search-item/
var $input = $("#search-keyword");
var $form = $("#search");
var $dropdown = $("#search-type");
var $results = $("#results");
var $numResults = $("#number-results");
var numItems = 0;

// clear input on click
$input.click(function() {
        $(this).val('')
     })


// select Search by Artist
  // submit
  // append new li for ul id="results" for search results

$form.on("submit", function(e){
  e.preventDefault()
  // clear previous results
  $results.html("");
  if ($dropdown.val() === "artist"){
  searchByArtist($input.val());
  } else if ($dropdown.val() === "track"){
  searchByTrack($input.val());
  }
  $numResults.html("<em>There are" + " " + numItems + " " + "items available.</em>");
})

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  $.get(url, function(response){
      for (i = 0; i < response.artists.items.length; i++) {
        var $resultItem = $("<li>" + response.artists.items[i].name + "</li>")
        $results.append($resultItem);
      }
      var artistItems = response.artists.items.length;
      numItems = artistItems;
  })
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  $.get(url, function(response){
      for (i = 0; i < response.tracks.items.length; i++) {
        var $resultItem = $("<li>" + response.tracks.items[i].artists[0].name + ": " + "<strong><em>" + response.tracks.items[i].name + "</em></strong>" + " from " + response.tracks.items[i].album.name + "</li>")
        $results.append($resultItem)
      }
      var trackItems = response.tracks.items.length;
      numItems = trackItems;
  })
}
