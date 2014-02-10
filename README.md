# node-depot_tools

This is a module that assists with downloading Google's
[depot_tools](http://dev.chromium.org/developers/how-tos/depottools) in a
cross-platform friendly way such that a module requiring the use of these
tools (such as [node-webrtc](https://github.com/js-platform/node-webrtc))
can start to target a cross-platform build process.


[![NPM](https://nodei.co/npm/depot_tools.png)](https://nodei.co/npm/depot_tools/)


## Usage

Install as a dependency in your project:

```
npm install depot_tools --save
```

As part of the module installation the latest version of the depot_tools
will be downloaded and included in a `tools/` folder within the 
depot_tools module folder

## Reference

### gclient(targetPath) => (args, callback)

Create a new gclient operation context in the target folder.

### ninja(targetPath) => (args, callback)

Create a new ninja operation context in the target folder.

## License(s)

### MIT

Copyright (c) 2014 Damon Oehlman <damon.oehlman@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
