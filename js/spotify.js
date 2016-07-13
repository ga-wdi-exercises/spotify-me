// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){
  $('#submit').click(function(event){
    event.preventDefault();
    // debugger
    var keyword = $('#search-keyword').val();
    var selectedValue = $('#search-type').val();
    // var track = $('#search-keyword').val();
    // searchByArtist(keyword);
    // searchByTrack(keyword);
     if (selectedValue === "artist"){
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword);
    }
});
})


  function searchByArtist(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';

    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
    .done(function(response){
      $('#results').empty();
    // $('#results').append("<li>" + response + "</li>");
    var artistsObj = response.artists.items;
    debugger
    artistsObj.forEach(function(data){
      $('#results').append("<li>" + data.name + "</li>");
      console.log(data.name);
    })

  })
  }


  function searchByTrack(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    $.ajax({
      method: "GET",
      url: url,
      dataType: "json"
    })
    .done(function(response){
      $('#results').empty();
      $('#results').append("<li>" + response + "</li>");

      var trackObj = response.tracks.items;
      trackObj.forEach(function(data){
        $('#results').append("<li>"+ data.name + "</li>")
        console.log(data.name);
      })
    })
  }
