// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function () {
  console.log('spotify me');

  $('#search').on('submit', function (e) {
    e.preventDefault();
    var keyword = $('#search-keyword').val();
      console.log(keyword);
    var urlA = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    var urlT = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';

      if ($('#search-type').val() === 'artist') {
        //console.log('searchbyartist');
        $.ajax({
          url: urlA,
          method: 'get',
        }) .done(function(keyword) {
          //console.log(keyword);
          displayResultsArtist(keyword);
        })

      } else if ($('#search-type').val() === 'track') {
        //console.log('search by track');
        $.ajax({
          url: urlT,
          method: 'get',
        }) .done(function(keyword) {
          //console.log(keyword);
          displayResults(keyword);
        })
      }
  });

  function displayResults(response) {
    console.log(response);
    $('#results').empty();

    listOfTracks = (response.tracks.items.length)

    for (var i = 0; i < listOfTracks; i++) {
      var nameOfTrack = response.tracks.items[i].name;
      var tracks = $('<li />').text(nameOfTrack)

      $('#results').append(tracks)
    }
  }
  function displayResultsArtist(data) {
    console.log(data);
    $('#results').empty();

    listOfArtist = (data.artists.items.length)

    for (var i = 0; i < listOfArtist; i++) {
      var nameOfArtist = data.artists.items[i].name;
      var list = $('<li />').text(nameOfArtist)

      $('#results').append(list)
    }


  }



});

// function searchByArtist(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
//   console.log(keyword);
// }
//
//
// function searchByTrack(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
//   console.log(keyword);
// }
