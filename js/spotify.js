// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/

$(document).ready( function() {
  $(".submit").click(function(evt){
    evt.preventDefault();
    var keyword = $("input[id='search-keyword']").val();
    var option = $('#search-type').val();
    console.log(option);//just to test if click is working - should apepear as 'artist' or 'track' in console
    if (option === "artist") {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword)
    }
  })
})

function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  ajax(url)
}

function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
  ajax(url)
}

var listArtist = function (response) {
  for (var i=0;i<response.artists.length;i++) {
    $('body').append(response.artists[i].name)
  }
}

var listTrack = function (response) {
  for (var i=0;i<response.tracks.length;i++) {
    $('body').append(response.tracks[i].name)
  }
}

//ajax function - appending result below search bar
var ajax = function (url){
  var option = $('#search-type').val();
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json"
  }).done ( function(response){
    console.log(response.option);
    if (option === "artist") {
      listArtist(response);
    } else {
      listTrack(response);
    }
  }).fail ( function (){
    console.log("Failure");
  }).always( function(){
    console.log("This will happen regardless");
  })
}
