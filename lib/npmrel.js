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
  execSync('git commit -am "' + commitMessage + '"');
  execSync('git tag v' + newSemver);
  execSync('git push origin --all');
  execSync('git push origin --tags');
  if (!packageJSON.private) execSync('npm publish');
};

function getNewSemver(newVersion) {
  var newSemver = semver.valid(newVersion);
  if (!newSemver) newSemver = semver.inc(packageJSON.version, newVersion);
  if (!newSemver) throw new Error('Invalid new version');
  return newSemver;
}
