# Stories of a Lifelong Student

[![license][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][dependencyci-image]][dependencyci-url] [![Donate][donate-image]][donate-url]

> My private blog, written by me. The posts are about computer science (data structures, algorithms, computer networks, operating system, and machine learning), open source (linux, git, arduino, contribution), software development (programming, programming languages, frameworks, design patterns, and architecture), security information (pen testing and whitehat hackers), Google stuff (search, android, chrome, chrome os, and web apps), etc.

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [Hugo](https://gohugo.io/)
2. [NodeJS](http://nodejs.org) - use the installer.
3. [Firebase CLI](https://github.com/firebase/firebase-tools).

## Development

1. Clone this repo `git clone --recurse-submodules git@github.com:nirgn975/stories-of-a-lifelong-student.git`
2. Inside the directory, run

```shell
$ hugo serve -D
```

## Deployment

First you need firebase
```shell
$ npm install -g firebase-tools
```

Then easily deploy the blog
```shell
$ hugo && firebase deploy
```

If you want to build it locally do

```shell
$ export HUGO_ENV=devlopment
$ hugo
```

## Tests

If you want to run the tests on your local machine please install `gem install html-proofer`. And then run the tests using
```shell
$ htmlproofer ./_site
```

[license-image]: https://img.shields.io/badge/license-ISC-blue.svg
[license-url]: https://github.com/nirgn975/Stories-of-a-Lifelong-Student/blob/master/LICENSE
[travis-image]: https://travis-ci.org/nirgn975/Stories-of-a-Lifelong-Student.svg?branch=master
[travis-url]: https://travis-ci.org/nirgn975/Stories-of-a-Lifelong-Student
[dependencyci-image]: https://dependencyci.com/github/nirgn975/Stories-of-a-Lifelong-Student/badge
[dependencyci-url]: https://dependencyci.com/github/nirgn975/Stories-of-a-Lifelong-Student
[donate-image]: https://img.shields.io/badge/PayPal-Donate-lightgrey.svg
[donate-url]: https://www.paypal.me/nirgn/2
