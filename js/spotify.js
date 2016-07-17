// API Docs at:
// https://developer.spotify.com/web-api/search-item/

$(document).ready(function() {

  $('#search').on('submit', function(event) {
    event.preventDefault();
    var keyword = $('#search-keyword').val();
    if ($('#search-type').val('Search by artist')) {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword);
    }

  });

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';

  $.ajax({
    method: "GET",
    url: url
  })
  .done(function(data) {
    $('#results').empty();
    console.log(data.artists);
    console.log(data.artists.items);
    console.log(artist.name);
    var artistObjects = data.artists.items
    artistObjects.forEach(function(artist) {
      $('#results').append(`<li>${artist.name}</li>`);
      })
    })
  .fail(function(jqXHR, textStatus, errorThrown){
      console.log("Request Failed: ", textStatus);
  })
  .always(function(){
      console.log("Request completed");
  })
};


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';

  $.ajax({
    method: "GET",
    url: url
  })
  .done(function(data) {
    $('#results').empty();
    var trackObjects = data.tracks.items;
    trackObjects.forEach(function(track) {
      $('#results').append(`<li>${track.name}</li>`);
    })
  })
  .fail(function(jqXHR, textStatus, errorThrown){
      console.log("Request Failed: ", textStatus);
  })
  .always(function(){
      console.log("Request completed");
  })
};

});
