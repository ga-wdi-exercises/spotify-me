// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
$(document).ready(function(){
  $("submit").on("click", function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(){
      // populate list of artists
    }).fail(function(){
      console.log("Ajax request fails!")
    })
  })
})

$(document).ready(function(){
  $("submit").on("click", function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(){
      // populate list of tracks
    }).fail(function(){
      console.log("Ajax request fails!")
    })
  })
})
