// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function() {
  $('#search').submit(function(event) {
    event.preventDefault();
    var keyword = $('#search-keyword').val();
    var selectedValue = $('#search-type').val();
      if(selectedValue  === 'artist') {
        searchByArtist(keyword);
      } else  {
        searchByTrack(keyword);
      }
  })


  function searchByArtist(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
    .done(function(response) {
      var artistObject = response.artists.items
      artistObject.forEach(function(data) {
        $('#results').append("<li>" + data.name + "</li>");
      })
    })
  }

  function searchByTrack(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
    .done(function(response) {
      var trackObject = response.tracks.items;
      trackObject.forEach(function(track) {
        $('#results').append("<li>" + track.name + "</li>");
      })
    })
  }
});
