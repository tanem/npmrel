# npmrel

[![npm version](https://img.shields.io/npm/v/npmrel.svg?style=flat-square)](https://www.npmjs.com/package/npmrel)
[![npm downloads](https://img.shields.io/npm/dm/npmrel.svg?style=flat-square)](https://www.npmjs.com/package/npmrel)

Release [NPM](https://www.npmjs.org/) modules from the command-line.

```
Usage: npmrel [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease] [options]

Options:

  -h, --help           output usage information
  -V, --version        output the version number
  -m, --message [msg]  The commit message to use.
                       If unspecified, will default to "Release vx.x.x".
```

## Installation

```
$ npm install -g npmrel
```

## Why?

I usually like to add/update a changelog with my release commits using [mkclog](https://www.npmjs.org/package/mkclog). Since [npm-version](https://www.npmjs.org/doc/cli/npm-version.html) needs a clean repo in order to run properly, I couldn't use that. 

## How?

 * Bumps the `package.json` version
 * Commits all changes with a custom or default message ("Release vx.x.x")
 * Tags the commit as "vx.x.x"
 * Pushes the commit
 * Pushes the tag
 * Publishes to NPM

## Examples

From within a Git repo at version `1.0.0`, we can release a major version bump as follows:

```
$ npmrel major -m "This is release v%s"
$ git log -1 --format="%s"
This is release v2.0.0
```

Now let's say we'd like to bump the patch version using the default commit message:

```
$ npmrel patch
$ git log -1 --format="%s"
Release v2.0.1
```

We can also specify the version directly:

```
$ npmrel v2.1.0 -m "Releasing version %s"
$ git log -1 --format="%s"
Releasing version 2.1.0
```