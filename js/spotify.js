// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
$(document).ready(function() {
  $('form#search input[type=submit]').on("click", searchSpotify);
})

function searchSpotify(event) {
  event.preventDefault();

  var term = $("#search-keyword").val();
  var searchType = $("#search-type").val();

  var url = 'http://ws.spotify.com/search/1/' + searchType + '.json?q=' + term;
  $.ajax({
    url: url,
    method: "get"
  }).done(function(data) {
    var resultsProperty = searchType + "s";
    displayResults(data[resultsProperty]);
  });

}
function displayResults(results) {
  var container = $("#results");
  container.empty();
  results.forEach(function(result) {
    container.append("<li><a href='" + result.href + "'>" + result.name + "</a></li>");
  })
}
