// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){

  $('#search').on("submit", function(event){
      event.preventDefault();
      var keyword = $('#search-keyword').val();


      if ($('option').val()=== "Search by artist"){
        searchByArtist(keyword);
      }
      else {searchByTrack(keyword)};

  })

})

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';

  $.ajax({
    method: "GET",
    url: url,
    dataType: "json"
  })
  .done(function(data){
    // console.log(data.artists.items[0].name);
    var itemObject = data.artists.items;
    itemObject.forEach(function(item){
      // console.log(item.name);
      $('#results').append(`<li>${item.name}</li>`);
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
  .done(function(data){
    // console.log(data.tracks.items[0].name);
    var itemObject = data.tracks.items;
    itemObject.forEach(function(item){
      // console.log(item.name);
      $('#results').append(`<li>${item.name}</li>`);
    })
  })
}
