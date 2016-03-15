# npmrel

[![npm version](https://img.shields.io/npm/v/npmrel.svg?style=flat-square)](https://www.npmjs.com/package/npmrel)
[![npm downloads](https://img.shields.io/npm/dm/npmrel.svg?style=flat-square)](https://www.npmjs.com/package/npmrel)
[![dependency status](https://david-dm.org/tanem/npmrel.svg?style=flat-square)](https://david-dm.org/tanem/npmrel)

Release [NPM](https://www.npmjs.org/) modules.

```
Usage: npmrel [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease] [options]

Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -m, --message [msg]  The commit message to use.
                       If unspecified, will default to "Release vx.x.x".
```

## installation

```
$ npm install -g npmrel
```

## implementation

 * Bumps the `package.json` version
 * Commits all changes with a custom or default message ("Release vx.x.x")
 * Tags the commit as "vx.x.x"
 * Pushes the commit
 * Pushes the tag
 * Publishes to NPM

## usage

### cli

```
$ cat package.json | grep version
"version": "1.0.0",
$ npmrel major -m "This is release v%s"
$ git log -1 --format="%s"
This is release v2.0.0
$ npmrel patch
$ git log -1 --format="%s"
Release v2.0.1
$ npmrel v2.1.0 -m "Releasing version %s"
$ git log -1 --format="%s"
Releasing version 2.1.0
```

### api

#### npmrel(newVersion, [commitMessage])

__Arguments__

* `newVersion` - The new version or release type to move to.
* `commitMessage` - *Optional* The git commit message to use. If omitted, defaults to `Release v%s` where `%s` is the incremented version.

__Examples__

```js
const npmrel = require('npmrel');

// These are api versions of the cli examples above.
npmrel('major', 'This is release v%s');
npmrel('patch');
npmrel('v2.1.0', 'Releasing version %s');
```

## license

MIT
