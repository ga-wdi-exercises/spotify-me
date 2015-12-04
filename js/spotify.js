// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
  ajax(url)
}

function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
  ajax(url)
}

var listArtist = function (response) {
  for (var i=0; i <response.artists.length;i++) {
    $('#results').append('<li>' + response.artists[i].name + '</li>')
    // //trying to get ul #results to empty after each new request - right now its all being appended multiple times if i hit submit again. tried using below code as part of this function but it didn't work also tried use .html instead of .append:
    // {
    //   $('#results').empty();
    // }
  }
}

var listTrack = function (response) {
  for (var i=0; i <response.tracks.length;i++) {
    $('body').append('<li>' + response.tracks[i].name + '</li>')
  }
}

$(document).ready( function() {
  $(".submit").on('click', function(evt){
    evt.preventDefault();
    var keyword = $("input[id='search-keyword']").val();
    var option = $('#search-type').val();
    console.log(option);// to test if click is working - should apepear as 'artist' or 'track' in console
    if (option === "artist") {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword)
    }
  })
})

//ajax function - show result below search bar. if/else for artist or list track
var ajax = function (url){
  var option = $('#search-type').val();
  $.ajax({
    url: url,
    type: "GET",
    dataType: "json"
  }).done (function(response){
    console.log(response.option);
    if (option === "artist") {
      listArtist(response);
    } else {
      listTrack(response);
    }
  }).fail (function(){
    console.log("Ajax failed");
  }).always(function(){
    console.log("This ajax request will happen regardless");
  })
}
