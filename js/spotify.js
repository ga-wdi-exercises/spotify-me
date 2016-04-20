// API Docs at: 
// https://developer.spotify.com/technologies/web-api/search/

'use strict';

// Save existing DOM elements as variables
const $results = $('#results');
const $searchKeyword = $('#search-keyword');
const $selectedOption = $(':selected');
const $search = $('#search');


function getKeyword(e) {
  e.preventDefault();
  $results.empty();

  var keyword = $searchKeyword.val();

  if ($selectedOption.val() === 'artist') {
    searchSpotify(keyword, 'artist');
  } else {
    searchSpotify(keyword, 'track');
  }
};

function searchSpotify(keyword, searchType) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=' + searchType;

  makeAPICall(url);
};

function makeAPICall(url) {
  console.log("calling...");
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: handleSuccess
  });
}

function handleSuccess(response) {
  var data = response.artists ? response.artists : response.tracks;

  var resultsList = data.items;

  resultsList.forEach(function(item) {
    var listItem = $('<li></li>').text(item.name);
    $results.append(listItem);
  });

  if (data.total > 20 ) {
    addResultCount(data);
  } 
};


function addResultCount(data) {
  var first = data.offset + 1;
  var last = data.offset + 20;
  var total = data.total;

  var nowShowing = $('<p></p>').text('Showing ' + first + ' - ' + last + ' of ' + total);
  $results.append(nowShowing);

  if (data.previous) {
    addPagination(data, 'previous');
  }

  if (data.next) {
    addPagination(data, 'next');
  } 
}

function addPagination(data, direction) {
  var pageLink = $('<a href="#" class=' + direction + '></a>').text(direction);
  $results.append(pageLink);

  $('.next').on('click', {dataList: data, direction: 'next'}, onPageClick);
  $('.previous').on('click', {dataList: data, direction: 'previous'}, onPageClick);
}

function onPageClick(event) {
  event.stopImmediatePropagation();

  $results.empty();
  var url = event.data.dataList[event.data.direction];
  console.log(url);

  makeAPICall(url);
}

// Listen for a submit in the search field
function addListeners() {
  $search.on('submit', getKeyword);
}


// Initialize the page
addListeners();
