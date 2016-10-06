// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function() {

  $('#search').on('submit', function(e) {
    e.preventDefault();
    if ($('select').val() === 'artist') {
      searchByArtist();
    } else {
      searchByTrack();
    }
    $('#results').empty();
    $('#search-keyword').val('');
  })
});

function searchByArtist(keyword) {
  keyword = $('#search-keyword').val();
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=artist';
  var request = $.ajax({url: url});

  request.done(function(response) {
    for (var i = 0; i < 20; i++) {
      $('#results').append('<li>' + response.artists.items[i].name + '</li>')
    }
  });

}

function searchByTrack(keyword) {
  keyword = $('#search-keyword').val();
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=track';
  var request = $.ajax({url: url});

  request.done(function(response) {
    for (var i = 0; i < 20; i++) {
      $('#results').append('<li>' + response.tracks.items[i].name + '</li>')
    }
  });
};
