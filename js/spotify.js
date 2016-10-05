// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){

  $('#search').on("submit", searchSpotify);

});
function searchSpotify(event) {
  event.preventDefault();
  var keyword = $('input#search-keyword').val();
  var searchType = $('#search-type').val()
  console.log(searchType);
  if (searchType === 'artist') {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  } else {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  }
  var options = { url: url};
  var request = $.ajax(options);

  request.done(function(response){
    console.log('response', response);
    var responseCount = response.artists.items.length;
    for(var i=0; i<responseCount;i++){
      console.log(i + ': ', response.artists.items[i]);
      var name = response.artists.items[i];
    }
    console.log(name);
    //var $name = $('<li />').html(name);
    $('#results').append('<li>'+ name.name + '</li>');
  })

  //run on failure
  request.fail(function(jqx, status, errorThrown) {
    console.log('Error: ', errorThrown);
    });
  //always runs
  request.always(function() {
    });
  }

  // var responseCount = response.data.children.length;
  // for(var i=0; i<responseCount; i++) {
  //   console.log(i + ': ', response.data.children[i]);
  //   var post = response.data.children[i];
