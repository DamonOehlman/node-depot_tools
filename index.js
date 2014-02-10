/* jshint node: true */

var isWin32 = process.platform == 'win32';
var path = require('path');
var spawn = require('child_process').spawn;
var extend = require('cog/extend');
var out = require('out');

/**
  # node-depot_tools

  This is a module that assists with downloading Google's
  [depot_tools](http://dev.chromium.org/developers/how-tos/depottools) in a
  cross-platform friendly way such that a module requiring the use of these
  tools (such as [node-webrtc](https://github.com/js-platform/node-webrtc))
  can start to target a cross-platform build process.

  ## Usage

  Install as a dependency in your project:

  ```
  npm install depot_tools --save
  ```

  As part of the module installation the latest version of the depot_tools
  will be downloaded and included in a `tools/` folder within the 
  depot_tools module folder

  ## Reference
**/

module.exports = function(tool, customEnv) {
  var toolPath = path.resolve(__dirname, 'tools', isWin32 ? tool + '.bat' : tool);

  return function(workingDir, args, callback) {
    function initArgs(args, callback) {
      function invoke(callback) {
        var proc = spawn(toolPath, args, {
          cwd: workingDir,
          env: extend({}, process.env, customEnv, {
            PATH: process.env.PATH + ':' +  path.resolve(__dirname, 'tools')
          })
        });

        out('!{grey}running: {0} {1}', tool, args.join(' '));

        proc.stdout.pipe(process.stdout);
        proc.stderr.pipe(process.stderr);

        proc.once('close', function(code) {
          var err = code !== 0 && new Error('gclient ' + args.join(' ') + ' failed'); 

          // TODO: report the stack trace
          if (callback) {
            callback(err);
          }
        });
      }

      return typeof callback == 'function' ? invoke(callback) : invoke;
    }

    return Array.isArray(args) ? initArgs(args, callback) : initArgs;
  }
};