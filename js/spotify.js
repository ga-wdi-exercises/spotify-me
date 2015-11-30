// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
$(document).ready(function(){
  $(":submit").on("click", function searchByArtist(event) {
    event.preventDefault();
    var keyword = $("#search-keyword").val()
    var keywordType = $("#search-type").val()
    console.log(keyword)
    console.log(keywordType)
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      if (keywordType == "artist"){
        for (i = 0; i <= response.artists.length; i++){
        $("#results").append("<li>"+response.artists[i].name+"</li>")
      }
    }
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
