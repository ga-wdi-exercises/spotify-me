// API Docs at:
// https://developer.spotify.com/web-api/search-item/

$(function(){
  $("#search").on('submit', function(evt){
    evt.preventDefault();
    var keyWord = $("#search-keyword").val();
    // console.log(keyWord);
    var type = $("#search-type").val();
    // console.log(type);
    $("#results").empty();

    if (type === 'artist'){
      searchByArtist(keyWord);
    }
    else {
      searchByTrack(keyWord);
    }
  })
})

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  $.ajax({
    method: "GET",
    url: url
  })
  .done(function(response){
    // console.log(response);

    response.artists.items.forEach(function(artist){
      $("#results").append(`<li>${artist.name}</li>`)
      // console.log(artist.name);
    })
  })
}

  function searchByTrack(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    $.ajax({
    method: "GET",
    url: url
  })
  .done(function(response){
    // console.log(response);

    response.tracks.items.forEach(function(track){
      $("#results").append(`<li>${track.name}</li>`)
      // console.log(track);
    })
  })
  }
