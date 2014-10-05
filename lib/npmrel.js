var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var semver = require('semver');
var sh = require('execSync');
var packageJSONPath = path.join(process.cwd(), 'package.json');
var packageJSON = require(packageJSONPath);

module.exports = function(newVersion, commitMessage){
  var newSemver = packageJSON.version = getNewSemver(newVersion);
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  commitMessage = (commitMessage || 'Release v%s').replace(/%s/g, newSemver);
  runCommand('git commit -am "' + commitMessage + '"');
  runCommand('git tag v' + newSemver);
  runCommand('git push origin --all');
  runCommand('git push origin --tags');
  if (!packageJSON.private) runCommand('npm publish');
};

function getNewSemver(newVersion) {
  var newSemver = semver.valid(newVersion);
  if (!newSemver) newSemver = semver.inc(packageJSON.version, newVersion);
  if (!newSemver) throw new Error('Invalid new version');
  return newSemver;
}

function getCommitMessage(commitMessage, newSemver) {
  commitMessage = commitMessage || 'Release v%s';
  return commitMessage.replace(/%s/g, newSemver);
}

function runCommand(cmd) {
  if (!sh.run(cmd)) throw new Error('[' + command + '] failed');
}