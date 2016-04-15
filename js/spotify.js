// API Docs at:
// https://developer.spotify.com/web-api/search-item/
var $input = $("#search-keyword");
var $form = $("#search");
var $dropdown = $("#search-type");
var $results = $("#results");
var $numResults = $("#number-results");

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
  $numResults.html("");
  if ($dropdown.val() === "artist"){
  searchByArtist($input.val());
  } else if ($dropdown.val() === "track"){
  searchByTrack($input.val());
  }
})

// select Search by Track
  // submit
  // append new li for ul id="results" for search results

function searchByArtist(keyword) {
  console.log(keyword);
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  $.get(url, function(response){
    console.log(response)
      for (i = 0; i < response.artists.items.length; i++) {
        var $resultItem = $("<li>" + response.artists.items[i].name + "</li>")
        $results.append($resultItem);
      }
      var numItems = response.artists.items.length;
      $numResults.html("<em>There are" + " " + numItems + " " + "items available.</em>")
  })
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  $.get(url, function(response){
    console.log(response)
      for (i = 0; i < response.tracks.items.length; i++) {
        var $resultItem = $("<li>" + response.tracks.items[i].artists[0].name + ": " + "<strong><em>" + response.tracks.items[i].name + "</em></strong>" + " from " + response.tracks.items[i].album.name + "</li>")
        $results.append($resultItem)
      }
      var numItems = response.tracks.items.length;
      $numResults.html("<em>There are" + " " + numItems + " " + "items available.</em>")
  })
}
