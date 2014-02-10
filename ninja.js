var path = require('path');
var spawn = require('child_process').spawn;
var out = require('out');
var toolPath = require('./').toolPath('ninja')
var extend = require('cog/extend');

/**
  
  ### ninja(targetPath) => (args, callback)

  Create a new ninja operation context in the target folder.
**/
module.exports = function(targetPath) {
  return function(args, callback) {
    function invoke(cb) {
      var proc = spawn(toolPath, args, {
        cwd: targetPath
      });

      out('!{grey}running: ninja ' + args.join(' '));

      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);

      proc.once('close', function(code) {
        var err = code !== 0 && new Error('ninja ' + args.join(' ') + ' failed'); 

        // TODO: report the stack trace
        if (cb) {
          cb(err);
        }
      });
    }

    return typeof callback == 'function' ? invoke(callback) : invoke;
  };
};