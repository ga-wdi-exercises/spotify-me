// API Docs at: 
// https://developer.spotify.com/web-api/search-item/



var $form = $('#search');
var $searchType=$('#search-type');
var $input = $('#keyword');
var $results = $('#results');



function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  return url;
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  return url;
}
//form on submit
$form.on('submit', function(e){
	e.preventDefault();
	$results.empty();

	//get keyword
	//console.log($input.val());
	var keyword = $input.val();
	//Determine artist or track
	


	if ($searchType.val() === "artist") {
		var url = searchByArtist(keyword);
		$.ajax({
			url: url,
			type: 'GET',
			success: function(response){
				console.log(response);
				console.log(response.artists.items);
				console.log(response.artists.items[0].name);
				console.log(response.artists.items.length);

				for (var i = 0; i < response.artists.items.length; i++) {
					$results.append('<li>'+response.artists.items[i].name+'</li>');

				}
			}
		});

	} else if ($searchType.val()==="track") {
		
		var url = searchByTrack(keyword);
		$.ajax({
			url: url,
			type: 'GET',
			success: function(response){

				for (var i = 0; i < response.tracks.items.length; i++) {
					$results.append('<li>'+response.tracks.items[i].name+'</li>');


				}
			}
		});

	}


});
