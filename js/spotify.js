// API Docs at:
$(document).ready(function() {
  $('#search').on('submit', function(event){
      event.preventDefault();
      var keyword = $('#search-keyword').val();
      searchByArtist(keyword);
      searchByTrack(keyword);
  });


});




  function searchByArtist(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
    .done(function(data){
      var artistsList = data.artists.items;
      artistsList.forEach(function(artist){
        console.log(data.artists.length);
        $('#results').append("<li>" + artist.name + "</li>");
      })
    });
}



  function searchByTrack(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
    .done(function(data){
      var tracksList = data.tracks.items;
      tracksList.forEach(function(track){
        $('#results').append("<li>" + track.name + "</li>");
      })
    });
  }

