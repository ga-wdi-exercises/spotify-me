// API Docs at: 
// https://developer.spotify.com/technologies/web-api/search/


function getKeyword(e) {
	e.preventDefault();
	$('#results').empty();

	var keyword = $('#search-keyword').val();

	if ($(':selected').val() === 'artist') {
		searchByArtist(keyword);
	} else {
		searchByTrack(keyword);
	}
};

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=artist';

  makeAPICall(url);
};


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=track';

  makeAPICall(url);
}

function makeAPICall(url) {
	$.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: handleArtistSuccess
  });
}

function handleArtistSuccess(response) {
	var artistList = response.artists.items;
	console.log(response);

 	artistList.forEach(function(data) {
    var listItem = $('<li></li>').text(data.name);
    $('#results').append(listItem);
  });

  if (response.artists.total > 20 ) {
  	addPagination(response);
  } 
};

function handleTrackSuccess(response) {
	var trackList = response.tracks.items;

 	trackList.forEach(function(data) {
    var listItem = $('<li></li>').text(data.name);
    $('#results').append(listItem);
  });

};

function addPagination(response) {
	 var first = response.artists.offset + 1;
	 var last = response.artists.offset + 20;
	 var total = response.artists.total;

	var nowShowing = $('<p></p>').text('Showing ' + first + ' - ' + last + ' of ' + total);
	$('#results').append(nowShowing);
}

function addListeners() {
	$('#search').on('submit', getKeyword);
}


function init() {
	addListeners();
}


// Initialize the page
init();
