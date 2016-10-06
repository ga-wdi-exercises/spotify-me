$(document).ready(function() {

  // FORM SUBMIT EVENT LISTENER
  $('form').on('submit', formSubmission)

});

function formSubmission(e) {
  e.preventDefault();

  var searchType = $('input[name=searchType]:checked', '#myForm').val()
  var query = $(this).find('#text-field').val();
  $(this).find('#text-field').val('');

  sendRequest(query, searchType);

}

function sendRequest(query, searchType) {
  var options = {
    url: 'https://api.spotify.com/v1/search',
    data: {
      q : query,
      type : searchType,
      client_id: '1ca2cb5007ff4d5cb5ba9106d6e6929c',
      client_secret: '20427a5d7f56411ea465b9cc85a39858'
    }
  }

  var request = $.ajax(options);
  request.done(function(response){
    console.log(response);

    holder = $('.RESULTS');
    holder.empty();
    holder.fadeIn(2000);



    // if searchType was artist
    if (searchType === 'artist') {
      console.log ('artist searched');
      // append "matching artists: "
      holder.append('<h2>matching artists: </h2>');
      $interior = $('<div class="container"></div>');

      holder.append($interior);

      // append a few artists as h3 or h4 (probably start with like 5)
      for (var i = 0; i < 5; i++){

        // a new row for bootstrap grid implementation
        $listingRow = $('<div class="row"></div>');
        $interior.append($listingRow);
        //


        // Construct an image (if one exists for the entry)
        if (response.artists.items[i].images[0] != undefined) {
          $imgURL = response.artists.items[i].images[0].url;
          $img = $('<img />').attr('src', $imgURL).attr('width','200px');
        } else {
          $img = $('<p></p>');
        }

        //IMAGE HOLDER
        $listingImgHolder = $('<div class="col-md-4"></div>');
        $listingRow.append($listingImgHolder);
        $listingImgHolder.append($img);

        // INFO HOLDER (NAME, GENRES, POPULARITY)
        $listingInfoHolder = $('<div class="col-md-8"></div>');
        $listingRow.append($listingInfoHolder);

          // Name
          $name = $('<h3>');
          $name.text(response.artists.items[i].name);
          $listingInfoHolder.append($name);
          // $listingInfoHolder.append('<hr>');

          // GENRES
          $listingInfoHolder.append('<h4>Genres: </h4>');
          for (var j = 0; j < 3; j++) {
            $genre = $('<small>');
            $genre.text(response.artists.items[i].genres[j]);
            $listingInfoHolder.append($genre).append(', ');
          }

          $interior.append('<hr>');
      }

    // if searchType was tracks
    } else if (searchType === 'track') {
      console.log('track searched');
      // append "matching tracks: "
      holder.append('<h2>matching tracks: </h2>');
      $interior = $('<div class="container"></div>');
      holder.append($interior);

      // append 'track by artist' a few times as h3 or h4 (probably like 5) lol
      for (var i = 0; i < 5; i++) {
        // a new row for bootstrap grid implementation
        $listingRow = $('<div class="row"></div>');
        $interior.append($listingRow);
        //


        // Construct an image (if one exists for the entry)
        if (response.tracks.items[i].album.images[0].url != undefined) {
          $imgURL = response.tracks.items[i].album.images[0].url;
          $img = $('<img />').attr('src', $imgURL).attr('width','200px');
        } else {
          $img = $('<p></p>');
        }

        //ALBUM IMAGE HOLDER
        $listingImgHolder = $('<div class="col-md-4"></div>');
        $listingRow.append($listingImgHolder);
        $listingImgHolder.append($img);

        // INFO HOLDER (NAME of song, name of artist, name of album)
        $listingInfoHolder = $('<div class="col-md-8"></div>');
        $listingRow.append($listingInfoHolder);

        $song = response.tracks.items[i].name;
        $artist = response.tracks.items[i].artists[0].name;
        $album = response.tracks.items[i].album.name;

        $fullInfo = $('<h3>');
        $fullInfo.html('"'+$song+'"' + ' by ' + $artist + ' on the album ' + '<span style="font-style:italic">'+$album+'</span');

        $listingInfoHolder.append($fullInfo);

        $interior.append('<hr>');

      }
    }

  });
  request.fail(function(jqXHR, textStatus, errorThrown){
    console.log('textStatus: ' + textStatus);
    console.log('errorThrown: ' + errorThrown);
  })

}
