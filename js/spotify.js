// API Docs at: 
// https://developer.spotify.com/web-api/search-item/

// form on submit
// get the user input
// get the search results from api
	// loop through each artist or track
	// create an <li></li>
	// set the html of the li to the results
	// append the results to the #results list

var $form = $("#search");
var $dropdown = $("search-type");
var $searchField = $("#search-keyword");
var $resultsList = $("#results");
var artist = $("#artist")
var track = $("#track")

$form.on("submit", function(event) {
	event.preventDefault();
	var userInput = $searchField.val();
	console.log(userInput)
	
	if ( document.getElementById("artist").selected ) {
		$.ajax({
			url: "https://api.spotify.com/v1/search?q=" + userInput + "&type=artist",
			success: function(response) {
				$("li").remove()
				var artists = response.artists.items
				console.log(artists[0].name)
				for (var i = 0; i < artists.length; i++) {
					var artistNames = artists[i].name;
					var $newLi = $("<li></li>")
					var artistNameList = $newLi.html(artistNames)
					$resultsList.append(artistNameList)
				}
			}
		})
	}
	else if ( document.getElementById("track").selected ) {
		$.ajax({
			url: "https://api.spotify.com/v1/search?q=" + userInput + "&type=track",
			success: function(response) {
				$("li").remove()
				var tracks = response.tracks.items				
				for (var i = 0; i < tracks.length; i++) {
					var trackNames = tracks[i].name;
					var $newLi = $("<li></li>")
					var trackNameList = $newLi.html(trackNames)
					$resultsList.append(trackNameList)
				}
			}
		})	
	}

})