$(document).ready(function(){
  $('#search-keyword').focus();
  $('#search').on('submit', searchSpotify)
})// API Docs at:
// https://developer.spotify.com/web-api/search-item/

function searchSpotify(e){
  e.preventDefault();
  var keyword = $('#search-keyword').val();
  var selector = $('#search-type').val();
  if (selector === "artist"){
    searchByArtist(keyword);
  } else {
    searchByTrack(keyword);
  }
  $('#search-keyword').focus();
  $('#search-keyword').val();
}

function apiConnect(url){
  var connectObject = {
    url: url
  }
  var request = $.ajax(connectObject);
  request.done(function(response){
    var returnlist = response;
    return returnlist;
  }).fail(function(header, errorText, errorCode){
    console.log(errorText, errorCode);
  })
}

function searchByArtist(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=artist';
  var connectObject = {
    url: url
  }
  var request = $.ajax(connectObject);
  request.done(function(response){
    //console.log(response);
    buildList(response);
  }).fail(function(header, errorText, errorCode){
    console.log(errorText, errorCode);
  })

  //buildList(artistList);
}


function searchByTrack(keyword) {
  var url = 'https://api.spotify.com/v1/search?q='+keyword+'&type=track';
  var returnlist;
  var connectObject = {
    url: url
  }
  var request = $.ajax(connectObject);
  request.done(function(response){
    //console.log(response);
    buildList(response);
  }).fail(function(header, errorText, errorCode){
    console.log(errorText, errorCode);
  })

}

function buildList(spotifyObject){
  //console.log(spotifyObject.artists.items.length);
  $('#results').empty();
  var apiString;
  var selector = $('#search-type').val();
  if (selector === "artist"){
    apiString = spotifyObject.artists.items;
  } else {
    apiString = spotifyObject.tracks.items;
  }
  for (var i = 0; i < apiString.length; i++){
    var $listitem = $('<li />')
    var $spanitem = $('<span />').attr('class', 'listtext')
    var listtext = apiString[i].name;
    $spanitem.text(listtext);
    $listitem.html($spanitem);
    $('#results').append($listitem);

  }
}
