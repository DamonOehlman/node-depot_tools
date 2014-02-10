/* jshint node: true */

var isWin32 = process.platform == 'win32';
var path = require('path');

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

exports.toolPath = function(name) {
  return path.resolve(__dirname, 'tools', isWin32 ? name + '.bat' : name);
};

exports.gclient = require('./gclient');