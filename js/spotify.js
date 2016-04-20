// API Docs at:
// https://developer.spotify.com/web-api/search-item/

var $form = $("#search")
var $input = $("#search-keyword")

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    $.ajax({
      url: url,
      success: function(response) {
        console.log(response)
      }
    })
}

function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
    $.ajax({
      url: url,
      success: function(response) {
        console.log(response)
      }
}

//on form submit
$form.on("submit", function(event) {
  event.preventDefault()
  var keyword = $input.val()
  //if option value === artist??
  searchByArtist(keyword);
  //if option value === track
  searchByTrack(keyword);
})
