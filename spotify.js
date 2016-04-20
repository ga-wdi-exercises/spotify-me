// API Docs at:
// https://developer.spotify.com/web-api/search-item/

// declare the variable for the id "results
var results = $('#results');


//what happens when "submit" is clicked in the "Search" form
$('#search').on('submit', function(event) {
  event.preventDefault();

  // get the value of the input id "search-keyword"
  var keyword = $('#search-keyword').val();

  // Select "artist" or "track" as the search type.
  //declare the variable for the search option
  var artist = $('#search-type').val();
  var track = $('#search-type').val();

  // Use Ajax to load data from the Spotify API!
  //when the keyword is entered and the dropdown menu option for search by artist is chosen, go to the Spotify API, use the keyword + the type to get the data
  function searchByArtist(keyword) {
    var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
    $.ajax({
      url: url
    }).done(function(response){
      console.log(response);
    })
  }
  searchByArtist(keyword)
})

//FOCUS ON LINES 26 & 27 AND RUNNING A FOR LOOP OR SOMETHING THAT BRINGS IN THE DATA AND WORKS WITH IT

//THIS WAS GOING TO BE MY NEXT ATTEMPT...TO PRINT THE RESULTS IN AN UNORDERED LIST
// function makeUL(array) {
//     // Create the list element:
//     var list = document.createElement('ul');



//THIS IS THE "SEARCH BY TRACK" AJAX CALL THAT TESTED, BUT DIDN'T GET TO INCLUDE BECAUSE I WAS FOCUSING ON PRINTING THE RESPONSES ABOVE
// function searchByTrack(keyword) {
//   var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
//   $.ajax({
//     url: url
//   }).done(function(response){
//     console.log(response);
//   })
// }
// searchByTrack(keyword)
// })
