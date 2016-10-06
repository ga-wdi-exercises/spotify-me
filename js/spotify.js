// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function () {

  $("#search").on('submit', function (e) {
    e.preventDefault()
    $('#results').empty();
    var searchType= $('#search-type').val();
    var keyword= $('#search-keyword').val()
    if (searchType==='artist') {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword);
    }
  })
})

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  $.ajax({
    url: url
  }).done(function (data) {
    console.log(data);
    var artistList = (data.artists.items);
    console.log('artistList', artistList);
    artistList.forEach(function (artist) {
      console.log('artist', artist);
      var artistName= artist.name;
      var $li= $('<li />')
      $li.text(artistName);
      $('#results').append($li);


    })
  })
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  $.ajax({
    url: url
  }).done(function (data) {
    console.log(data);
    var trackList= (data.tracks.items);
    console.log('trackList', trackList);
    trackList.forEach(function (track) {
      console.log('track',track);
      var trackName= track.name;
      var $li= $('<li />')
      $li.text(trackName);
      $('#results').append($li);




    });

  })
}
