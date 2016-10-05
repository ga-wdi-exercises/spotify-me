// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function () {

  $('#search').on('submit', function (e){
    e.preventDefault();
    var searchType = $('#search-type').val();
    var keyword = $('#search-keyword').val();
    if (searchType === 'artist') {
      searchByArtist(keyword);
    } else {
      searchByTrack(keyword);
    }
  })
})

function searchByArtist(keyword) {
   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
   $.ajax({
     url: url
   })
   .done(function (data) {
     $('#results').empty()
     console.log('data', data);
     var responseCount = (data.artists.items.length)

     for (var i = 0; i < responseCount; i++) {
       var artistName = data.artists.items[i].name;
       console.log(artistName);
       var $li = $('<li />').text(artistName)
       $('#results').append($li)
     }

    var $footer = $('<p />')
    $footer.text('Showing ' + responseCount + ' out of ' + data.artists.total)
    $('#results').after($footer)
    //$('#results').append($footer)
   })
   .fail(function (jqHXR, textStatus, errorThrown) {
     console.log('error', textStatus, errorThrown);
   })

}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  $.ajax({
    url: url
  })
  .done(function (data) {
    $('#results').empty()
    console.log('data', data);
    var responseCount = (data.tracks.items.length)

    for (var i = 0; i < responseCount; i++) {
      var trackName = data.tracks.items[i].name;
      console.log(trackName);
      var $li = $('<li />').text(trackName)
      $('#results').append($li)
    }
    var $footer = $('<p />')
    $footer.text('Showing ' + responseCount + ' out of ' + data.tracks.total)
    $('#results').after($footer)
  })
  .fail(function (jqHXR, textStatus, errorThrown) {
    console.log('error', textStatus, errorThrown);
  })
}
