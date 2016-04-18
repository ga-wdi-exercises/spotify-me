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

function searchSpotify(event) {
  event.preventDefault();

  var $term = $("#search-keyword").val();
  var $searchType = $("#search-type").val();

  var url = 'https://api.spotify.com/v1/search?q=' + $term + '&type=' + $searchType
  console.log($term, $searchType, url);

  $.ajax({
    url: url,
    method: "GET"
  }).done(function(data) {
    var resultsProperty = $searchType + "s";
    var results = data[resultsProperty]["items"]
    displayResults(results);
    console.log(results);
  });
}

function displayResults(results) {
  var $container = $("#results");
  console.log(results);
  $container.empty();
  results.forEach(function(result) {
    // $container.append("<li><a href='" + result.external_urls.spotify + "' target='_blank'>" + result.name + "</a></li>");
    $container.append("<li> " + result.name + " </li>");
  })
}



$(function() {
  $('form#search input[type=submit]').on("click", searchSpotify);
});
