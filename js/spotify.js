// API Docs at:
// https://developer.spotify.com/web-api/search-item/

/*-----------------------Tell the program what DOM elements exist------------------------------*/

var $keywordInput = $('#search-keyword')
var $form = $('#search');
var $searchType = $('#search-type');
var $resultList = $('#results');
var $next = $('#next');


/*-----------------------If the user selects a different dropdown option, redefine the variable to match ------------------------------*/

$next.hide();

$form.on("submit", function(e){
  e.preventDefault();
  $resultList.html('');
  //console.log("search type:", $searchType.val());
  if ($searchType.val() === 'artist'){
    searchByArtist();
  }if ($searchType.val() === 'track'){
    searchByTrack();
  }
  $next.show();
})

$next.on('click', function(e){
  e.preventDefault();
//  console.log("search type:", $searchType.val());
  if ($searchType.val() === 'artist'){
    moreArtists();
  }if ($searchType.val() === 'track'){
    moreTracks();
  }
})


/*------------------------Define the functions in use-----------------------------*/

function searchByArtist() {
  var url = 'https://api.spotify.com/v1/search?q='+$keywordInput.val()+'&type=artist';
  $.get(url, function(response){
    var originalResponse = response;
    response = response.artists.items;
    for (var i = 0; i < response.length; i++){
      var $listItem = $('<li>');
      //console.log(response[i].name);
      $listItem.html(response[i].name);
      $resultList.append($listItem);
    }
    return('originalResponse');
  })
}


function searchByTrack() {
  var url = 'https://api.spotify.com/v1/search?q='+$keywordInput.val()+'&type=track';
  $.get(url, function(response){
    //console.log(response);
    var originalResponse = response;
    response = response.tracks.items;
    for (var i = 0; i < response.length; i++){
      var $listItem = $('<li>');
      //console.log(response[i].name);
      $listItem.html(response[i].name);
      $resultList.append($listItem);
    }

  })

}

function moreArtists(){
  var url = originalResponse.artists.next;
  $.get(url, function(response){
    console.log(response);
    var originalResponse = response;
    response = response.tracks.items;
    for (var i = 0; i < response.length; i++){
      var $listItem = $('<li>');
      //console.log(response[i].name);
      $listItem.html(response[i].name);
      $resultList.append($listItem);
    }

  })

}

function moreTracks(){
  var url = originalResponse.traks.next;
  $.get(url, function(response){
    console.log(response);
    var originalResponse = response;
    response = response.tracks.items;
    for (var i = 0; i < response.length; i++){
      var $listItem = $('<li>');
      //console.log(response[i].name);
      $listItem.html(response[i].name);
      $resultList.append($listItem);
    }
  })
}
