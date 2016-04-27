// API Docs at: 
// https://developer.spotify.com/web-api/search-item/
var $keyword = $('#search-keyword');
var $submit = $('#submit-button');
var $dropDown = $('#search-type');
var artistList = $('#results');
var trackList = $('#results');

$submit.click( function(e) {
  e.preventDefault();
  artistList.html("");

  var keyword = $keyword.val();

  if ($dropDown.val() == "artist") {


    function searchByArtist(keyword) {
      var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
      $.ajax({
      	url: url,
      	method: 'get',
      	success: function(response) {
      		var artists = response.artists.items;
      		
      		artists.forEach(function(artistObject) {
      			artistList.append("<li>" + artistObject.name +"</li>")
      		})
      	}
      })
    }
    searchByArtist(keyword);
} else {

//searchByArtist('enya');

    function searchByTrack(keyword) {
      var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
      $.ajax({
      	url: url,
      	method: 'get',
      	success: function(response) {
      		console.log(response);
      		var tracks = response.tracks.items;
      		tracks.forEach(function(trackObject) {
      			trackList.append("<li>" + trackObject.name +"</li>")
      		})
      	}
      })
    }
    searchByTrack(keyword);
}

})
//searchByTrack('crush on you');


// take the value of the user input
// check if they search by artist or by track
// onclick of submit button
	// check submit value of user input based on search
	// show results on page