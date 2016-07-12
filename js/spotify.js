// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function() {
  // searchByArtist();
  $('#search').on('submit', function(event){
    event.preventDefault();
    var keyword = $('#search-keyword').val();

  searchByArtist(keyword);
  searchByTrack(keyword);
  })
});

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';

  $.ajax({
    method: "GET",
    url: url,
    dataType: "json"
  })
  .done(function(data){
    console.log(data.artists.items);
    var itemObject = data.artists.items;
    itemObject.forEach(function(item) {
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
  .done(function(data) {
    var itemObject = data.tracks.items;
    $('#results').append(`<li>${item.name}</li>`);
  })
}
