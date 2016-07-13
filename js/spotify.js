// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){
  $('#submitSearch').on('submit', (function(event){
    event.preventDefault();
    var keyword = $('search-keyword').val();
    if ($('option').val() === "Search")
      searchByArtist(keyword);
    })

});

function searchByArtist(keyword) {
  var myUrl = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  //debugger
  $.ajax({
    method: 'GET',
    url: myUrl,
    dataType: 'json'
  })
  .done(function(){
    debugger
    $('#results').html();
    console.log();
  })
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
}
