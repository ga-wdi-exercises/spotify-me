// API Docs at: 
// https://developer.spotify.com/web-api/search-item/

// Global DOM variables
var $body = $("body")
var $form = $("#search")
var $searchField = $("#search-keyword")
var $resultsList = $("#results")
var $searchType = $("#search-type")
var $resultsArea = $("<p class='shown-results'></p>")
var $prevNext = $("<p class='prev-next'></p>")

// Artist parameters
function searchByArtist(query) {
  search("artist", "artists", query)
}

// Track parameters
function searchByTrack(query){
  search("track", "tracks", query)
}

// General search function
function search(type, key, query) {
  $form.on("submit", function(event) {
		event.preventDefault()
		var userInput = $searchField.val()
		
		if ( $searchType.val() === type ) {
			$prevNext.empty()

			// ---- PUT THIS IN A FUNCTION, MAKE IT A CALLBACK, AND SET AS A PARAMETER IN A FUNCTION ABOVE FUNCTION SEARCH???
			$.ajax({
				url: "https://api.spotify.com/v1/search?q=" + userInput + "&offset=20&limit=20&type=" + type,
				success: function(response) {
					$("li").remove()
					$(".shown-results").remove()

				// API object variables
					var typeObject = response[key]
					var totalType = typeObject.total
					var limitType = typeObject.limit
					var offsetType = typeObject.offset
					var type = typeObject.items 
					var nextUrl = typeObject.next
					var prevUrl = typeObject.previous
					var $next = $(".next")
					var $prev = $(".prev")

					console.log(typeObject)

				// Loop through artists and add to list
					for (var i = 0; i < type.length; i++) {
						var typeNames = type[i].name
						var $newLi = $("<li></li>")
						var typeNameList = $newLi.html(typeNames)
						$resultsList.append(typeNameList)
					}
			// ---- END OF CALLBACK(??) BLOCK	

					if (nextUrl) {
						$prevNext.append("<a class='next' href=" + nextUrl + ">Next</a>")
					}
					if (prevUrl) {
						$prevNext.prepend("<a class='prev' href='" + prevUrl + "'>Previous</a> ")
					}
				
				// Pagination conditions
					if (totalType === 0) {
						$resultsArea.html("No results found.")
					} 
					// If the number of delivered results plus the result per page limit are greater than the total number of results
					else if (offsetType + limitType > totalType) {
						$resultsArea.html("Showing " + (offsetType + 1) + "-" + totalType + " of " + totalType + " results " )
					}
					// If delivered results plus result-per-page-limit are less than total results
					else if (offsetType + limitType < totalType) {
						$resultsArea.html("Showing " + (offsetType + 1) + "-" + (offsetType + limitType ) + " of " + totalType + " results")
					}

				// Put the results tally below the list
					$resultsList.after($resultsArea)
					$resultsArea.after($prevNext)
				}
			})
		}
	})
}

searchByArtist($searchField)
searchByTrack($searchField)

