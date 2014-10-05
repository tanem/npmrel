# npmrel

[![NPM version](https://badge.fury.io/js/npmrel.svg)](http://badge.fury.io/js/npmrel)

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

From within a Git repo at version `1.0.0`, we can release a major version bump as follows. The commit message in this case will be `This is release v2.0.0`:

```
$ npmrel major -m "This is release v%s"
```

Now let's say we'd like to bump the patch version using the default commit message. The commit message in this case will be `Release v2.0.1`:

```
$ npmrel patch
```

We can also specify the version directly. The commit message in this case will be `Releasing version 2.1.0`:

```
$ npmrel v2.1.0 -m "Releasing version %s"
```