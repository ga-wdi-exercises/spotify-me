$(document).ready(function(){

  $("input[type='submit']").on("click", function(evt){
    evt.preventDefault();
    var keyword = $("#search-keyword").val();
    if($("#search-type").val() === "artist"){
      searchByArtist(keyword);
    }
    else {
      searchByTrack(keyword);
    }
  });

  function searchByArtist(keyword) {
    var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
    $.get(url, function(data){
      for(var i = 0; i < data.artists.length; i++){
        $("#results").append("<li class ='artists'>"+ data.artists[i].name + "</li>");
      }
      $("body").append("<h2>Showing"+ $(".artists").length + " of " + data.artists.length + "</h2>");
      $("h2").insertBefore("#results");
    }, "json");
  }


  function searchByTrack(keyword) {
    var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
    $.get(url, function(data){
      for(var i = 0; i < data.tracks.length; i++){
        $("#results").append("<li class = 'tracks'>"+ data.tracks[i].album.name + "</li>");
      }
      $("body").append("<h2>Showing "+ $(".tracks").length + " of " + data.tracks.length + "</h2>");
      $("h2").insertBefore("#results");
    }, "json");
  }
});
