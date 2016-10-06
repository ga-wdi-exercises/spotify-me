// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function() {

});
    $('#search').submit(function(e) {
    e.preventDefault();

    var keyword = $('#search-keyword').val();
    var selectValue = $('#search-type').val();
      if(selectValue  === 'artist') {
        searchArtist(keyword);
      } else  {
        searchTrack(keyword);
      }
  })


  function searchArtist(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    $.ajax({
      url: url,
      // method: "Get",
      // dataType: "json"
    })
      .done(function(response) {
      var artistObject = response.artists.items;
      artistObject.forEach(function(data) {
        $('#results').append("<li>" + data.name + "</li>");
      })
    })
  };

  function searchTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    $.ajax({
      url: url,
      // method: "Get",
      // dataType: "json"
    })
      .done(function(response) {
      var trackObject = response.tracks.items;
      trackObject.forEach(function(data) {
        $('#results').append("<li>" + data.name + "</li>");
      })
    })
  };
