// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
  var keyword = $('#search-keyword').val();
  searchByArtist();
  })





function searchByArtist(keyword) {
     var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
     var request = $.ajax(url);

     request.done(function (response) {
       data = response;
       $artist = response.artists;
       console.log($artist);
       var artistList = $('<li />').html($artist);
       $('#results').append(artistList);
    });
     request.fail(function (jqx, status, errorThrown) {
      console.log("error: ", jqx, status, errorThrown);
    });
     request.always(function () {
      console.log("");
    });
   }
});








// function searchByTrack(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
// }
