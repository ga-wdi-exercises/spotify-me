// API Docs at:
// https://developer.spotify.com/technologies/web-api/search/
$(document).ready(function(){
  $(":submit").on("click", function searchBy(event) {
    event.preventDefault();
    var keyword = $("#search-keyword").val()
    var type = $("#search-type").val()
    var url = 'http://ws.spotify.com/search/1/' + type + '.json?q=' + keyword;
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      if (type == "artist"){
        for (i = 0; i <= response.artists.length; i++){
          $("#results").append("<li>"+response.artists[i].name+"</li>")
        }
      }
      if (type == "track"){
        console.log(response.tracks)
        for (i = 0; i <= response.tracks.length; i++){
          $("#results").append("<li>" +response.tracks[i].name+"</li>")
        }
      }
      }).fail(function(){
        console.log("Ajax request fails!")
      })
    })
  })
