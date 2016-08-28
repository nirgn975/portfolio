Stories of a Lifelong Student
===

[![license](https://img.shields.io/badge/license-ISC-blue.svg)](https://github.com/nirgn975/Stories-of-a-Lifelong-Student/blob/master/LICENSE) [![Build Status](https://travis-ci.org/nirgn975/Stories-of-a-Lifelong-Student.svg?branch=master)](https://travis-ci.org/nirgn975/Stories-of-a-Lifelong-Student)

My private blog, written by me. The posts are about computer science (data structures, algorithms, computer networks, operating system, and machine learning), open source (linux, git, arduino, contribution), software development (programming, programming languages, frameworks, design patterns, and architecture), security information (pen testing and whitehat hackers), Google stuff (search, android, chrome, chrome os, and web apps), etc.

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [Jekyll](http://jekyllrb.com/) - `$ gem install jekyll`
1. [Jekyll Paginate](https://jekyllrb.com/docs/pagination/) - `$ gem install jekyll-paginate`
2. [NodeJS](http://nodejs.org) - use the installer.

## Local Installation

1. Clone this repo, or download it into a directory of your choice.
2. Inside the directory, run `npm install`.

## Usage

**Development mode**

This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting etc.

```shell
$ npm run gulp
```

**Deploy mode**

You can easily deploy your site build to gh-pages branch with the command
```shell
$ npm run gulp deploy
```

## Tests

If you want to run the tests on your local machine please install `gem install html-proofer`. And then run the tests using
```shell
$ htmlproofer ./_site --disable-external
```
