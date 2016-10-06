// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function () {

  $('#search-type artist').on('click', function(e) {
    var artists = $(this).text();

    searchByArtist(artists);
    e.preventDefault();
  })
  searchByArtist('#results');

  function searchByArtist(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    //console.log();
  }

  $('#search-type track').on('click', function(e) {
    var tracks = $(this).text();

    searchByTrack(tracks);
    e.preventDefault();
  })
  searchByTrack('#results')


  function searchByTrack(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    // console.log();
  }

  var request = $.ajax(options);

  request.done(function(output) {
  })

  equest.fail(function(jqXHR, status, errorThrown) {
    console.log('Error', errorThrown);
  });

  request.always(function() {
    console.log('Always');
  });


searchByArtist();
searchByTrack();
});
