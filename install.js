var path = require('path');
var fs = require('fs');
var https = require('https');
var zlib = require('zlib');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var tar = require('tar');
var toolsPath = path.resolve(__dirname, 'tools');
var out = require('out');
var repoUrl = 'https://chromium.googlesource.com/chromium/tools/depot_tools';
var archiveUrl = repoUrl + '/+archive/master.tar.gz';

function abort(err) {
  out.error(err);
  process.exit(1);
}

if (fs.existsSync(toolsPath)) {
  out('!{green}       done: installed @ {0}', toolsPath);
  process.exit(0);
}

rimraf(toolsPath, function() {
  mkdirp(toolsPath, function(err) {

    if (err) {
      return abort('could not create tools folder: ' + toolsPath);
    }

    https.get(archiveUrl, function(res) {
      if (res.statusCode === 404) {
        return abort('could not download: ' + archiveUrl);
      }

      out('!{grey}downloading: !{grey,underline}{0}', archiveUrl);

      res
        .pipe(zlib.Gunzip())
        .pipe(tar.Extract({ path: toolsPath }))
        .on('error', abort)
        .on('end', function() {
          out('!{green}       done: installed @ {0}', toolsPath);
        });
    });
  });
});

