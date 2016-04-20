// API Docs at: 
// https://developer.spotify.com/technologies/web-api/search/

'use strict';

// Save existing DOM elements as variables
const $results = $('#results');
const $searchKeyword = $('#search-keyword');
const $selectedOption = $(':selected');
const $search = $('#search');

// Take user search term and determine whether to search it as track or artist
function getKeyword(e) {
  e.preventDefault();

  // clear old results, if any
  $results.empty();

  var keyword = $searchKeyword.val();

  if ($selectedOption.val() === 'artist') {
    composeQuery(keyword, 'artist');
  } else {
    composeQuery(keyword, 'track');
  }
};

// Using search term and search type, compose the Spotify endpoint URL
function composeQuery(keyword, searchType) {
  var url = 'https://api.spotify.com/v1/search?q=' + keyword + '&type=' + searchType;

  searchSpotify(url);
};

// Make a call to Spotify API with the specified URL
function searchSpotify(url) {
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: handleSuccess
  });
}

// Iterate through list of results, adding them to the DOM
function handleSuccess(response) {
  var data = response.artists ? response.artists : response.tracks;

  var resultsList = data.items;

  resultsList.forEach(function(item) {
    var listItem = $('<li></li>').text(item.name);
    $results.append(listItem);
  });

  // Display number of results
  addResultCount(data);
};

// 
function addResultCount(data) {
  var first = data.offset + 1;
  var last = data.offset + 20;
  var total = data.total;

  if (total === 0) {
    var nowShowing = $('<p></p>').text('No results found.');
  } 
  else if (total > 20) {
    // e.g. 'Showing 1 - 20 of 500'
    var nowShowing = $('<p></p>').text('Showing ' + first + ' - ' + last + ' of ' + total);
  } 
  else {
    // e.g. 'Showing 1 - 5 of 5'
    var nowShowing = $('<p></p>').text('Showing ' + first + ' - ' + total + ' of ' + total);
  }

  // Add page count to the DOM
  $results.append(nowShowing);

  // Determine which pagination links are needed
  if (data.previous) {
    addPagination(data, 'previous');
  }

  if (data.next) {
    addPagination(data, 'next');
  } 
}

// Create and append pagination links
function addPagination(data, direction) {
  var pageLink = $('<a href="#" class=' + direction + '></a>').text(direction);
  $results.append(pageLink);

  $('.next').on('click', {dataList: data, direction: 'next'}, onPageClick);
  $('.previous').on('click', {dataList: data, direction: 'previous'}, onPageClick);
}

// Handle clicks to pagination links
function onPageClick(event) {
  // clear current page of results
  event.stopImmediatePropagation();
  $results.empty();

  // Compose endpoint url -- this becomes url = 'data.next' or 'data.previous'
  var url = event.data.dataList[event.data.direction];

  searchSpotify(url);
}

// Listen for a submit in the search field
function addListeners() {
  $search.on('submit', getKeyword);
}


// Initialize the page
addListeners();
