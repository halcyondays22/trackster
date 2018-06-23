var Trackster = {};

$(document).ready(function() {

  const API_KEY = "603c643d15caa72e337f5524014f254e";

  $("#search-button").click(function() {
    Trackster.searchTracksByTitle($("#search-input").val());
  });
  /*
    Given an array of track data, create the HTML for a Bootstrap row for each.
    Append each "row" to the container in the body to display all tracks.
  */
  Trackster.renderTracks = function(tracks) {
    var $trackList = $("#track-list");

    $trackList.empty();

    for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
      var track = tracks[trackIndex];
      var mediumAlbumArt = track.image[1]["#text"];
      var trackListenersNumber = numeral(track.listeners);
      var trackListenersFormatted = trackListenersNumber.format('0,0');
      var htmlTrackRow =
      '<div class="container-fluid">' +
        '<div class="row track col-xs-12 col-md-12" id="track-list">' +
        ' <div>' +
          '<a href="'+ track.url + '" target="_blank">' +
          '<i class="fas fa-play-circle fa-2x col-xs-1 col-xs-offset-1"></i>' +
          '</a>' +
          '</div>' +
          '<div class="col-xs-4">' + track.name + '</div>' +
          '<div class="col-xs-2">' + track.artist + '</div>' +
          '<div class="col-xs-2"><img src="' + mediumAlbumArt + '"/></div>' +
          '<div class="col-xs-2">' + trackListenersFormatted + '</div>' +
        '</div>' +
      '</div>';

      $trackList.append(htmlTrackRow);

    }
  };

    $("#track-list").css("border": "solid" "1px" "rgb(74, 74, 74)");

  $("#search-input").keyup(function(event) {
      if (event.keyCode === 13) {
          $("#search-button").click();
      }
  });
  /*
    Given a search term as a string, query the LastFM API.
    Render the tracks given in the API query response.
  */
  Trackster.searchTracksByTitle = function(title) {
    ($.ajax({
      type: "POST",
      url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" + API_KEY + "&format=json",
      success: function(response) {
        Trackster.renderTracks(response.results.trackmatches.track)
      }
    }));
  };

});
