// standardized renderer for displaying useful outputs for all common Watson APIs.

var btoa = require('btoa');
var wavPlayer = function(stream, spokenText) {
    var b64encoded = btoa(String.fromCharCode.apply(null, stream));
    var player = '<!-- expand me to hear --><div id="audio_playback" />' + (spokenText ? "<h1>" + spokenText + "</h1>" : "") + "<audio autoplay controls src='data:audio/wav;base64," + b64encoded + "'>Your browser does not support the <code>audio</code> element.</audio>" + '</script>';
    console.log(player);
    return player;
}


module.exports = {
    audio: wavPlayer
}

