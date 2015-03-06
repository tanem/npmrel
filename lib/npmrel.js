var fs = require('fs');
var path = require('path');
var semver = require('semver');
var execSync = require('child_process').execSync;
var packageJSONPath = path.join(process.cwd(), 'package.json');
var packageJSON = require(packageJSONPath);

module.exports = function(newVersion, commitMessage){
  var newSemver = packageJSON.version = getNewSemver(newVersion);
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  commitMessage = (commitMessage || 'Release v%s').replace(/%s/g, newSemver);
  execCmd('git commit -am "' + commitMessage + '"');
  execCmd('git tag v' + newSemver);
  execCmd('git push origin --all');
  execCmd('git push origin --tags');
  if (!packageJSON.private) execCmd('npm publish');
};

function getNewSemver(newVersion) {
  var newSemver = semver.valid(newVersion);
  if (!newSemver) newSemver = semver.inc(packageJSON.version, newVersion);
  if (!newSemver) throw new Error('Invalid new version');
  return newSemver;
}

function execCmd(cmd) {
  console.log(execSync(cmd).toString());
}
