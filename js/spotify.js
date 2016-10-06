// API Docs at:
// https://developer.spotify.com/web-api/search-item/
$(document).ready(function(){

  $('#search').on("submit", searchSpotify);

});
function searchSpotify(event) {
  event.preventDefault();
  var searchType = $('#search-type').val();
  console.log(searchType);
  if (searchType === 'artist') {
    resultArtist();
  } else if(searchType === 'track') {
    resultTrack();
  }
};
  function resultArtist() {
    var keyword = $('input#search-keyword').val();
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    var options = { url: url};
    var request = $.ajax(options);
    request.done(function(response){
      var responseCountArtist = response.artists.items.length;
      console.log('response', response);
      for(var i=0; i<responseCountArtist;i++){
        console.log(i + ': ', response.artists.items[i]);
        var artist = response.artists.items[i];
        $('#results').append('<li>'+ artist.name + '</li>');
      }
    })
}
  // function resultTrack (){
  //   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  //   var options = { url: url};
  //   var request = $.ajax(options);
  //   var responseCountTrack = response.tracks.items.length;
  //   for(var i=0; i<responseCountTrack;i++){
  //     console.log(i + ': ', response.tracks.items[i]);
  //     var track = response.tracks.items[i];
  //   }
  //   console.log(name);
  //   //var $name = $('<li />').html(name);
  //   request.done(function(response){
  //     console.log('response', response);
  //     $('#results').append('<li>'+ track.name + '</li>');
  //   })
  // }
  //run on failure
  // request.fail(function(jqx, status, errorThrown) {
  //   console.log('Error: ', errorThrown);
  //   });
  // //always runs
  // request.always(function() {
  //   })
  // var responseCount = response.data.children.length;
  // for(var i=0; i<responseCount; i++) {
  //   console.log(i + ': ', response.data.children[i]);
  //   var post = response.data.children[i];
