'use strict';

const fs = require('fs');
const path = require('path');
const semver = require('semver');
const execSync = require('child_process').execSync;
const packageJSONPath = path.join(process.cwd(), 'package.json');
const packageJSON = require(packageJSONPath);

module.exports = function(newVersion, commitMessage){
  const newSemver = packageJSON.version = getNewSemver(newVersion);
  fs.writeFileSync(packageJSONPath, JSON.stringify(packageJSON, null, 2));
  commitMessage = (commitMessage || 'Release v%s').replace(/%s/g, newSemver);
  execCmd(`git commit -am "${commitMessage}"`);
  execCmd(`git tag v${newSemver}`);
  execCmd('git push');
  execCmd('git push --tags');
  if (!packageJSON.private) execCmd('npm publish');
};

function getNewSemver(newVersion) {
  let newSemver = semver.valid(newVersion);
  if (!newSemver) newSemver = semver.inc(packageJSON.version, newVersion);
  if (!newSemver) throw new Error('Invalid new version');
  return newSemver;
}

function execCmd(cmd) {
  console.log(execSync(cmd).toString().trim());
}
