/*  =============================================================================
    Track Class

    A track is a class that has a trackName and the track's artist(s)
    
    Copyright © Vent Origins 
    By Adrian Mandee and Randy Truong
    ========================================================================== */

/*  =============================================================================
    Constructor

    @param    string    Track's name
    @param    array     List of artists for the specific track
    @return   none
    ========================================================================== */
var Track = function (trackName, trackArtist) {
  console.log("Track created");
  this.trackName = trackName;
  this.trackArtist = trackArtist;
}

/*  =============================================================================
    returns a track's name

    @param    none
    @return   string
    ========================================================================== */
Track.prototype.getTrackName = function() {
  return this.trackName;
}

/*  =============================================================================
    returns list of the track's artist(s)

    @param    none
    @return   array
    ========================================================================== */
Track.prototype.getTrackArtist = function() {
  return this.trackArtist;
}