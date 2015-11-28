// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/


function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
}


function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
}

// will need to have if else statement for if artist is selected from dropdown or if song is selected from drop down
$(document).ready(function(){
  $("h1").on("click", function(){
    var url = "https://api.wunderground.com/api/f28a93cae85945b6/geolookup/conditions/q/va/midlothian.json"
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response.current_observation.temp_f)
    }).fail(function(){
      console.log("Ajax request fails!")
    }).always(function(){
      console.log("This always happens regardless of successful ajax request or not.")
    })
  })
});
