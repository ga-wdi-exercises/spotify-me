// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
$(document).ready(function(){

  function searchByArtist(searchField) {
    var url = 'http://ws.spotify.com/search/1/artist.json?q='+searchField;
    console.log(url);
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      for (var i = 0; i < response.artists.length; i++){
        artist = response.artists[i];
        $('#results').append('<li value="' + artist.name + '">' + artist.name + ' </li>')
      }
      console.log(response.artists[0]);
    })
  }

  function searchByTrack(searchField) {
    var url = 'http://ws.spotify.com/search/1/track.json?q='+searchField;
    console.log(url);
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      for (var i = 0; i < response.tracks.length; i++){
        artist = response.tracks[i];
        $('#results').append('<li value="' + artist.name + '">' + artist.name + ' </li>')
      }
      console.log(response.tracks[0]);
    })
  }

    $('#submit').on("click", function(event){
      event.preventDefault();

      var searchField = $('#search-keyword').val();
      var searchType = $('#search-type').val();

      if (searchType == "artist"){
        searchByArtist(searchField);
      }else if (searchType == "track"){
        searchByTrack(searchField);
      }else{
        console.log("error")
      }
  })

  //   function searchByArtist(keyword) {
  //     var searchField = $('#search-keyword').val();
  //     var searchType = $('#search-type').val();
  //
  //     if (searchType == "artist"){
  //       console.log('http://ws.spotify.com/search/1/artist.json?q=');
  //   }
  // }
})

function searchByArtist(keyword) {
  var url = 'http://ws.spotify.com/search/1/artist.json?q='+keyword;
}


function searchByTrack(keyword) {
  var url = 'http://ws.spotify.com/search/1/track.json?q='+keyword;
}

// var show = function(){
//   var searchField = $('#search-keyword').val();
//   var searchType = $('#search-type').val();
//   console.log(searchField);
//   console.log(searchType);
//   return [searchField, searchType];
// }
