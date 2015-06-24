var Track = function (trackName, trackArtist) {
  console.log("Track created");
  this.trackName = trackName;
  this.trackArtist = trackArtist;
}

Track.prototype.getTrackName = function() {
  console.log(this.trackName);
}

Track.prototype.getTrackArtist = function() {
  console.log(this.trackArtist);
}