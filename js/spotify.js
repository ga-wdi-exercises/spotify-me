// API Docs at: 
// https://developer.spotify.com/web-api/search-item/

// Global DOM variables
var $body = $("body")
var $form = $("#search")
var $searchField = $("#search-keyword")
var $resultsList = $("#results")
var $searchType = $("#search-type")
var $resultsArea = $("<p class='shown-results'></p>")

// Artist searching
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

				// API artist object variables
					var artistObject = response.artists
					var totalArtists = artistObject.total
					var limitArtists = artistObject.limit
					var offsetArtists = artistObject.offset
					var artists = artistObject.items

					console.log(artistObject)

				// Loop through artists and add to list
					for (var i = 0; i < artists.length; i++) {
						var artistNames = artists[i].name
						var $newLi = $("<li></li>")
						var artistNameList = $newLi.html(artistNames)
						$resultsList.append(artistNameList)
					}
				
				// Pagination conditions
					// If total artists is less than the return limit
					if (offsetArtists + limitArtists > totalArtists) {
						$resultsArea.html("Showing " + (offsetArtists + 1) + " - " + totalArtists + " of " + totalArtists + " results " )
					}
					// If there are still more results to return
					else if (offsetArtists + limitArtists < totalArtists) {
						$resultsArea.html("Showing " + (offsetArtists + 1) + " - " + (offsetArtists + limitArtists ) + " of " + totalArtists + " results " )

					}
					// else if (offsetArtists + limitArtists > totalArtists) {
					// 	$resultsArea.html("Showing " + offsetArtists + " - " + totalArtists + " of " + totalArtists + " results")
					// }
					// $resultsList.after($resultsArea + "<p><a href='https://api.spotify.com/v1/search?q=' + userInput + '&offset=' + offsetArtists * 2 + '&limit=20&type=artist'>Next</a></p>")
					$resultsList.after($resultsArea)
				}

			})
		}
	})
}

// Track searching
function searchByTrack(keyword) {
	$form.on("submit", function(event) {
		event.preventDefault()
		var userInput = $searchField.val()

		if ( $searchType.val() === "track" ) {
			$.ajax({
				url: "https://api.spotify.com/v1/search?q=" + userInput + "&offset=0&limit=15&type=track",
				success: function(response) {
					$("li").remove()
					$(".shown-results").remove()
					var trackObject = response.tracks
					var totalTracks = trackObject.total
					var limitTracks = trackObject.limit
					var offsetTracks = trackObject.offset
					var artists = trackObject.items

					var tracks = response.tracks.items	

					for (var i = 0; i < tracks.length; i++) {
						var trackNames = tracks[i].name
						var $newLi = $("<li></li>")
						var trackNameList = $newLi.html(trackNames)
						$resultsList.append(trackNameList)
					}

					if (totalTracks < limitTracks) {
						$resultsArea.html("Showing " + (offsetTracks + 1) + " - " + totalTracks + " of " + totalTracks + " results " )
					}
					else if (totalTracks > offsetTracks + limitTracks) {
						$resultsArea.html("Showing " + (offsetTracks + 1) + " - " + (offsetTracks + limitTracks ) + " of " + totalTracks + " results " )
					}
					else {
						$resultsArea.html("Showing " + offsetTracks + " - " + totalTracks + " of " + totalTracks + " results")
					}
					$resultsList.after($resultsArea)					
				}
			})	
		}
	})
}
searchByArtist($searchField)
searchByTrack($searchField)
