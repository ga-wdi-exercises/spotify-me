// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/


function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    var artists = response.artists;
    $(artists).each(function(index, el) {
        var newLi = $('<li></li>');
        newLi.html("<a href='" + el.href + "'>" + el.name + "</a>");
        $("#results").append(newLi);
    });
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}


function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json'
  })
  .done(function(response) {
    tracks = response.tracks;
    $(tracks).each(function(index, el) {
      var newLi = $('<li></li>');
      newLi.html("<a href='" + el.href + "'>" + el.name + "</a>");
      $("#results").append(newLi);
    });
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

}

$(document).ready(function() {
  $("#search").submit(function(event) {
    $("#results").empty();
    type = $("#search-type").val();
    keyword = $("#search-keyword").val();
    type === "artist" ? searchByArtist(keyword) : searchByTrack(keyword);
    event.preventDefault();
  });
});
