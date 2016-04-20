// API Docs at: 
// https://developer.spotify.com/technologies/web-api/search/


function getKeyword(e) {
	e.preventDefault();
	$('#results').empty();

	var keyword = $('#search-keyword').val();

	if ($(':selected').val() === 'artist') {
		searchSpotify(keyword, 'artist');
	} else {
		searchSpotify(keyword, 'track');
	}
};

function searchSpotify(keyword, searchType) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=' + searchType;

  makeAPICall(url, searchType);
};

function makeAPICall(url, searchType) {
	$.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: handleSuccess
  });
}

function handleSuccess(response) {
	if (response.artists) {
		var data = response.artists;
	} else {
		var data = response.tracks;
	}
	var resultsList = data.items;
	console.log(response);

 	resultsList.forEach(function(item) {
    var listItem = $('<li></li>').text(item.name);
    $('#results').append(listItem);
  });

  // if (data.total > 20 ) {
  // 	addPagination(response);
  // } 
};


// function addPagination(response) {
// 	 var first = response.artists.offset + 1;
// 	 var last = response.artists.offset + 20;
// 	 var total = response.artists.total;

// 	var nowShowing = $('<p></p>').text('Showing ' + first + ' - ' + last + ' of ' + total);
// 	$('#results').append(nowShowing);
// }

function addListeners() {
	$('#search').on('submit', getKeyword);
}


function init() {
	addListeners();
}


// Initialize the page
init();
