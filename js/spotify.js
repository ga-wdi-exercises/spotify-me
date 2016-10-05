// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){
  var user_input = $('input #search-keyword').val();
  $(user_input).on("submit", 'artist', searchSpotify)

});
function searchSpotify() {
  if(user_input == "Search by artist"){
    function searchByArtist(keyword) {
      event.preventDefault();
      alert('it works!');
      var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
      }
    } else if(user_input == "search by track"){
      function searchByTrack(keyword) {
        event.preventDefault();
        alert('it works!')
        var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
      }
    }
  }
