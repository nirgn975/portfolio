# Stories of a Lifelong Student

[![CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-blue.svg)](http://creativecommons.org/licenses/by/4.0/) ![Continuous Deployment](https://github.com/nirgn975/stories-of-a-lifelong-student/workflows/Continuous%20Deployment/badge.svg?branch=main) [![Donate](https://img.shields.io/badge/PayPal-Donate-lightgrey.svg)](https://www.paypal.me/nirgn/2)

> Stories of a Lifelong Student is the fourth interaction of my private blog. I always wanted to open source as much as I can in my blog, and when I decided to rebuilt and design it, it was the perfect chance to move to GitHub and open source the code, the images, the posts themselves, and especially my process.
>
> All of the posts are written by me, but I'm more then happy to receive some PRs to correct my grammar, a misleading information, an update to something, or basically everything!
>
> All the things I write in this post are my own thoughts and personal experiments. I'm not responsible for anything you might try to do, and not encourages anything that is not within the law. All the info in the posts are for learning and expanding horizons only!
>
> The posts are usually about computer science (data structures, algorithms, computer networks, operating system, and machine learning), open source (linux, git, code contribution), software development (programming, programming languages, frameworks, design patterns, and architecture), security information (pen testing and whitehat hacking), android and reverse engineering.

## Prerequisites

To install this project, you'll need the following things installed on your machine.

1. [Hugo](https://gohugo.io/)
2. [NodeJS](http://nodejs.org) - use the installer.
3. [Firebase CLI](https://github.com/firebase/firebase-tools).

## Development

1. Clone this repo

```shell
$ git clone --recurse-submodules git@github.com:nirgn975/stories-of-a-lifelong-student.git
```

2. Inside the directory, run

```shell
$ export HUGO_ENV=devlopment
$ hugo serve -D
```

## Deployment

First you need firebase

```shell
$ npm install -g firebase-tools
```

Then easily deploy the blog

```shell
$ export HUGO_ENV=production
$ hugo && firebase deploy
```
