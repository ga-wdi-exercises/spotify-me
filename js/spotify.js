// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function (){
  $('#search').on('submit', checkInput)
  })

function checkInput(e) {
    e.preventDefault();
    var $input = $('#search-keyword').val();
    var $category = $('#search-type').val();
    if ($category === "artist") {
        searchByArtist($input);
    } else {
      searchByTrack($input);
    }
}

function searchByArtist(keyword) {
  var options = { url: 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist'
  }
  console.log('searched by artist', keyword);
  var results = $.ajax(options);
  results.done(function(object){
    console.log(object);

  });
  results.fail(function(jqX, status, errorThrown) {
    console.log(status, errorThrown);
  });
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  console.log('searched by track', keyword);
}
