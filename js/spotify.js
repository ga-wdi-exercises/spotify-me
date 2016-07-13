// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){

  $("#search").on("submit", function(evt) {
    evt.preventDefault();
    var keyword = $("#search-keyword").val();
    console.log(keyword)
    var selectedValue = $('#search-type').val();

    if(selectedValue  === 'artist') {
      searchByArtist(keyword);
    } else  {
      searchByTrack(keyword);
    }
  });
});



    function searchByArtist(keyword) {
      var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';

      $.ajax({
        Method: "Get",
        url: url,
        dataType: "jsonp",
        jsonpCallback: "showArtist"
      });

         // .done(function(data, textStatus, jqXHR) {
         //   // $("#results").html()
         // }

     };


  function showArtist(jason){
    var artistName = jason.artists.name;
    $('#results').html(`<li>${artistName}</li>`)
    }



       function searchByTrack(keyword) {
        var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';




      }

