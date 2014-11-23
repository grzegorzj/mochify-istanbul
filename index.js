var Istanbul = require('istanbul');
var through = require('through2');
var minimatch = require("minimatch");
var _ = require('lodash');

function instrument(options) {
  var excludePattern = options.exclude || '';
  var instrumenter = new Istanbul.Instrumenter();

  function transform(file) {
    // If if doesnt match the pattern dont instrument it
    if (minimatch(file, excludePattern))
      return through();

    var data = '';
    return through(function(buf, enc, next) {
      data += buf;
      next();
    }, function(next) {
      var self = this;
      instrumenter.instrument(data, file, function(err, code) {
        if (!err) {
          // Inject __converage__ var
          self.push(code);
          self.push('console.log("__coverage__=\'" + JSON.stringify(__coverage__) + "\';");');
        } else {
          self.emit('error', err);
        }
        next();
      });
    });
  }

  return transform;
}

function writeReports(options) {
  var collector = new Istanbul.Collector();
  var reports = options.reports || [];
  delete(options.reports);

  var data = '';
  return through(function(buf, enc, next) {
    data += buf;
    next();
  }, function(next) {
    var re = /__coverage__='([^;]*)';\n/gi,
        match = re.exec(data),
        coverage;

    // Clean up the stream
    this.push(data.replace(re,''));

    // match[1] contains JSON.stringify(__coverage__)
    coverage = match ? JSON.parse(match[1]) || {} : {};

    collector.add(coverage);

    // Add reports
    [].concat(reports).forEach(function (reportType) {
      Istanbul.Report
        .create(reportType, _.clone(options))
        .writeReport(collector, true);
    });

    next();
  });
}

module.exports = function (options) {
  var reporterOptions = _.omit(options, 'exclude');

  return function (b, opts) {
    b.transform(instrument(options));
    b.pipeline.get('wrap').push(writeReports(reporterOptions));
  };
};
