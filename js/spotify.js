// // API Docs at:
// // https://developer.spotify.com/web-api/search-item/
//
//
// function searchByArtist(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
// }
//
//
// function searchByTrack(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
// }
//***save time instead of doing two runs

//create a function to connect and make request to the Spotify API
function searchSpotify(event) {
  event.preventDefault();
//capture what keyword the user is searching for
//capture the dropdown value selcted
  var $term = $("#search-keyword").val();
  var $searchType = $("#search-type").val();
//simplify the spotify endpoint urls
//use ajax to ping the API
//pass the results to .done method add "s" to the search-type
  var url = 'https://api.spotify.com/v1/search?q=' + $term + '&type=' + $searchType
  console.log($term, $searchType, url);

  $.ajax({
    url: url,
    method: "GET"
  }).done(function(data) {
    var resultsDisplay = $searchType + "s";
    var results = data[resultsDisplay]["items"]
    displayResults(results);
    console.log(results);
  });
}
//create function to display results and insert to the index.html <ul id="results">
//loop each result and add another line using <li> tag to display each result in separate line
function displayResults(results) {
  var $container = $("#results");
  console.log(results);
  $container.empty();
  results.forEach(function(result) {
    $container.append("<li> " + result.name + " </li>");
  })
}


//show the result when user click the submit button
//use searchSpotify as callback function for the event handler .on(click)
$(function() {
  $('form#search input[type=submit]').on("click", searchSpotify);
});
