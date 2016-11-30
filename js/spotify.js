$(document).ready(function() {

});
    $('#search').submit(function(e) {
    e.preventDefault();

    var searchValue = $('#search-keyword').val();
    var selectValue = $('#search-type').val();
      if(selectValue  === 'artist') {
        searchArtist(searchValue);
      } else  {
        searchTrack(searchValue);
      }
  })


  function searchArtist(searchValue) {
    var url = 'https://api.spotify.com/v1/search?q='+searchValue+'&type=artist';
    $.ajax({
      url: url
    })
      .done(function(response) {
      $('#results').empty();
      var artistObject = response.artists.items;
      artistObject.forEach(function(data) {
        $('#results').append("<li>" + data.name + "</li>");
      })
    })
  };

  function searchTrack(searchValue) {
  var url = 'https://api.spotify.com/v1/search?q='+searchValue+'&type=track';
    $.ajax({
      url: url
    })
      .done(function(response) {
      $('#results').empty();
      var trackObject = response.tracks.items;
      trackObject.forEach(function(data) {
        $('#results').append("<li>" + data.name + "</li>");
      })
    })
  };
