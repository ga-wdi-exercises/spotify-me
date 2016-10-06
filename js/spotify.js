// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function() {
  $('#search').on('submit', function(e) {
    e.preventDefault();
    var search = $('#search-keyword').val();
    var searchType = $('#search-type').val();
    console.log(search, searchType);
    if (searchType === 'artist') {
      searchByArtist(search)
    } else {
      searchByTrack(search)
    }
  })

});


function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=artist';
  console.log(url);
  $.ajax({
    url: url

  }).done(function(response) {
    console.log(response);
    response.artists.items.forEach(function(musician) {
      var li = $('<li />');
      li.text(musician.name)
      $('#results').append(li)
    })
  }).always(function() {
    console.log('form submitted');
  }).fail(function(jqHXR, textStatus, errorThrown) {
    console.log('error', textStatus, errorThrown);
  })
}

// change up for track search
function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=track';
  console.log(url);
  $.ajax({
      url: url

    }).done(function(response) {
      console.log(response);
      response.tracks.items.forEach(function(track) {
        var li = $('<li />');
        li.text(track.name)
        $('#results').append(li)
      })
    }).always(function() {
      console.log('form submitted');
    }).fail(function(jqHXR, textStatus, errorThrown) {
      console.log('error', textStatus, errorThrown);
    })
}
