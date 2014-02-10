/**
  
  ### gclient(targetPath) => (args, callback)

  Create a new gclient operation context in the target folder.
**/
module.exports = require('./')('gclient', {
  GYP_GENERATORS: 'ninja'
});