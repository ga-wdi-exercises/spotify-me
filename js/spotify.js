// API Docs at: 
// https://developer.spotify.com/web-api/search-item/

$(document).ready(function() {
  $('#search').submit(function(e) {
    e.preventDefault();
    $('#results').html('');
    if($('#search-type').val() === 'artist') {
      searchByArtist($('#search-keyword'));
    }
    else {searchByTrack($('#search-keyword'));}
  })
})


function searchByArtist(keyword) {
  keyword = keyword.val();

  var url = 'https://api.spotify.com/v1/search';
  $.ajax({
    url: url,
    method: "GET",
    dataType: 'json',
    data: {
      q: keyword,
      type: 'artist'
    }
  })
  .done(function(artistResponse){
    var artistObject = artistResponse.artists.items;
    artistObject.forEach(function(artist) {
      $('#results').append("<li>" + artist.name + "</li>");
    })
  })
}


function searchByTrack(keyword) {
  keyword = keyword.val();

  var url = 'https://api.spotify.com/v1/search';

  $.ajax({
    url: url,
    method: "GET",
    dataType: 'json',
    data: {
      q: keyword,
      type: 'track'
    }
  })
  .done(function(songResponse){
    var songObject = songResponse.tracks.items;
    songObject.forEach(function(song) {
      $('#results').append("<li>" + song.name + "</li>");
    })
  })
}