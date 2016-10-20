var assert = require('assert');

var formatter = require('../index');

var tone_data = require('../samples/tone_sample.json');

describe('Tone Analyzer Formatting', function() {
  describe('render()', function() {
    it('should render some html', function() {
      var out = formatter.render(tone_data);
      console.log(out);
    });
  });
});