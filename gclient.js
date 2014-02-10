var path = require('path');
var spawn = require('child_process').spawn;
var out = require('out');
var toolPath = require('./').toolPath('gclient')
var extend = require('cog/extend');

/**
  
  ### gclient(targetPath) => (args, callback)

  Create a new gclient operation context in the target folder.
**/
module.exports = function(targetPath) {
  return function(args, callback) {
    function invoke(cb) {
      var proc = spawn(toolPath, args, {
        cwd: targetPath,
        env: extend({}, process.env, {
          PATH: process.env.PATH + ':' +  path.resolve(__dirname, 'tools'),
          GYP_GENERATORS: 'ninja'
        })
      });

      out('!{grey}running: gclient ' + args.join(' '));

      proc.stdout.pipe(process.stdout);
      proc.stderr.pipe(process.stderr);

      proc.once('close', function(code) {
        var err = code !== 0 && new Error('gclient ' + args.join(' ') + ' failed'); 

        // TODO: report the stack trace
        if (cb) {
          cb(err);
        }
      });
    }

    return typeof callback == 'function' ? invoke(callback) : invoke;
  };
};