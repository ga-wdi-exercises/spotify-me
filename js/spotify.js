// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){

  $("#search").on("submit", function(evt) {
    evt.preventDefault();
    var keyword = $("#search-keyword").val();
    // console.log(keyword)
    var selectedValue = $('#search-type').val();

    if(selectedValue  === 'artist') {
      searchByArtist(keyword);
    } else  {
      searchByTrack(keyword);
    }
  });
});



    function searchByArtist(keyword) {
      var keyword = $("#search-keyword").val();
      var url = "https://api.spotify.com/v1/search?q="+keyword+"&type=artist";
      $.ajax({
        Method: "GET",
        url: url
      })
      .done(function(response){
        $('#results').html(" ")
        response.artists.items.forEach(function(object){
          console.log(object)
          var artistName = object.name;
          $('#results').append(`<li>${artistName}</li>`)
        });
       });
     };




    function searchByTrack(keyword) {
        var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
      $.ajax({
        Method: "GET",
        url: url,
        dataType: "json",
        jsonpCallback: "showArtist"
      })
      .done(function(response){
        $('#results').html(" ")
        response.artists.items.forEach(function(object){
          console.log(object)
          var songName = object.name;
          $('#results').append(`<li>${songName}</li>`)
        });
       });

      };

