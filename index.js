// standardized renderer for displaying useful outputs for all common Watson APIs.

var btoa = require('btoa');
var wavPlayer = function(stream, spokenText) {
    var b64encoded = btoa(String.fromCharCode.apply(null, stream));
    var player = '<!-- expand me to hear --><div id="audio_playback" />' + (spokenText ? "<h1>" + spokenText + "</h1>" : "") + "<audio autoplay controls src='data:audio/wav;base64," + b64encoded + "'>Your browser does not support the <code>audio</code> element.</audio>" + '</script>';
    console.log(player);
    return player;
}


var d3_script = '<script src="http://d3js.org/d3.v3.min.js"></script>';
var dimple_script = '<script src="http://dimplejs.org/dist/dimple.v2.1.6.min.js"></script>'

var getChart = function(data, options) {

  return d3_script + dimple_script + '<div id="" /><script type="text/javascript">' + 
    'var svg = dimple.newSvg("body", 800, 600);' + 
    'var data = ' + JSON.stringify(data) + ';' + 
    'var chart = new dimple.chart(svg, data);' + 
    'chart.addCategoryAxis("x", "' + options.x + '");' + 
    'chart.addMeasureAxis("y", "' + options.y + '");' + 
    'chart.addSeries(null, dimple.plot.' + options.type + ');' + 
    'chart.draw();' +  '</script>';

var summarizeTones = function (results) {
  var categories = results.document_tone.tone_categories;
  var alltones = _.map(categories, function(cat){
    return cat.tones;
    // return _.map(cat.tones, function(toneset){
    //   return toneset.tone_name;
    // });
  });
  return _.compact(_.flatten(alltones));
  
}
var formatToneAnalyzer = function(results, input) {
    var alltones = summarizeTones(results);
    var chart = getChart(alltones, {x: "tone_name", y: "score", type: "bar"});
    console.log(chart);
}

var sniffFormat = function(results) {
    if (results.document_tone) return formatToneAnalyzer(results);
    // others here
    console.log('no format detected for results:', results);
}

module.exports = {
    audio: wavPlayer,
    render: sniffFormat
}

