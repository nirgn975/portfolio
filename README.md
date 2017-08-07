# Stories of a Lifelong Student

[![license][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][dependencyci-image]][dependencyci-url] [![Donate][donate-image]][donate-url]

> My private blog, written by me. The posts are about computer science (data structures, algorithms, computer networks, operating system, and machine learning), open source (linux, git, arduino, contribution), software development (programming, programming languages, frameworks, design patterns, and architecture), security information (pen testing and whitehat hackers), Google stuff (search, android, chrome, chrome os, and web apps), etc.

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll -v 3.5.1`
2. [NodeJS](http://nodejs.org) - use the installer.
3. [Firebase CLI](https://github.com/firebase/firebase-tools).

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

**Development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc.

```shell
$ npm run start
```

**Deploy mode**

You can easily deploy your site build with the command
```shell
$ npm run deploy
```

## Tests

If you want to run the tests on your local machine please install `gem install html-proofer`. And then run the tests using
```shell
$ htmlproofer ./_site
```

[license-image]: https://img.shields.io/badge/license-ISC-blue.svg
[license-url]: https://github.com/nirgn975/Stories of a Lifelong Student/blob/master/LICENSE
[travis-image]: https://travis-ci.org/nirgn975/Stories of a Lifelong Student.svg?branch=master
[travis-url]: https://travis-ci.org/nirgn975/Stories of a Lifelong Student
[dependencyci-image]: https://dependencyci.com/github/nirgn975/Stories of a Lifelong Student/badge
[dependencyci-url]: https://dependencyci.com/github/nirgn975/Stories of a Lifelong Student
[donate-image]: https://img.shields.io/badge/PayPal-Donate-lightgrey.svg
[donate-url]: https://www.paypal.me/nirgn/2
