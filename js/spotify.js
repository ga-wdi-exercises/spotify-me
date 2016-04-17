// API Docs at: 
// https://developer.spotify.com/web-api/search-item/

// form on submit
// get the user input
// get the search results from api
	// loop through each artist or track
	// create an <li></li>
	// set the html of the li to the results
	// append the results to the #results list

var $body = $("body")
var $form = $("#search")
var $searchField = $("#search-keyword")
var $resultsList = $("#results")
var $searchType = $("#search-type")

function searchByArtist(keyword) {
	$form.on("submit", function(event) {
		event.preventDefault()
		var userInput = $searchField.val()
		
		if ( $searchType.val() === "artist" ) {
			$.ajax({
				url: "https://api.spotify.com/v1/search?q=" + userInput + "&offset=0&limit=20&type=artist",
				success: function(response) {
					$("li").remove()
					$(".shown-results").remove()
					var artistObject = response.artists
					var totalArtists = artistObject.total
					var limitArtists = artistObject.limit
					var offsetArtists = artistObject.offset
					var artists = artistObject.items

					for (var i = 0; i < artists.length; i++) {
						var artistNames = artists[i].name
						var $newLi = $("<li></li>")
						var artistNameList = $newLi.html(artistNames)
						$resultsList.append(artistNameList)
					}
					var $resultsArea = $("<p class='shown-results'></p>")
					if (totalArtists < limitArtists) {
						$resultsArea.html("Showing " + (offsetArtists + 1) + " - " + totalArtists + " of " + totalArtists + " results " )
					}
					else if (totalArtists > offsetArtists + limitArtists) {
						$resultsArea.html("Showing " + (offsetArtists + 1) + " - " + (offsetArtists + limitArtists ) + " of " + totalArtists + " results " )
					}
					else {
						$resultsArea.html("Showing " + offsetArtists + " - " + totalArtists + " of " + totalArtists + " results")
					}
					$resultsList.after($resultsArea)
				}
			})
		}
	})
}
function searchByTrack(keyword) {
	$form.on("submit", function(event) {
		event.preventDefault()
		var userInput = $searchField.val()

		if ( $searchType.val() === "track" ) {
			$.ajax({
				url: "https://api.spotify.com/v1/search?q=" + userInput + "&offset=0&limit=15&type=track",
				success: function(response) {
					$("li").remove()
					var tracks = response.tracks.items				
					for (var i = 0; i < tracks.length; i++) {
						var trackNames = tracks[i].name
						var $newLi = $("<li></li>")
						var trackNameList = $newLi.html(trackNames)
						$resultsList.append(trackNameList)
					}
				}
			})	
		}
	})
}
searchByArtist($searchField)
searchByTrack($searchField)
