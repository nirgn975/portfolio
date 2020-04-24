---
title: "Simple Twitter - Chapter 1: Setup"
subtitle: ""
date: 2020-04-22T13:00:00+03:00
lastmod: 2020-04-22T13:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["twitter", "development", "git", "github", "angular", "node.js", "monogodb", "robo 3t", "gcloud", "kubectl"]
categories: ["development"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/images/posts/2020/chapter-1-simple-twitter/simple-twitter-cover.jpg"
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---

This is the start of a series of posts to build Twitter like website. But why did I even want to do that? Because I saw a gap in software engineering blog universe about bring software to production level. Nobody explain what we need to do it and didn't do it with the reader, together, while keep it as simple and stupid as one can so even the most junior software engineer can understand why and how to get his next project to production.

So this is what I'm planning to do here. To get you from the basic to production. This will not be an easy journey, or even short one. But I can promise you one thing, you'll learn **a lot**!

The first things we're going to do is the most basic, install the things we need to develop our website on our computer.

&nbsp;

## 1. Git Setup

I think the most important software for development is [git](https://git-scm.com/). We gonna use git for version control from day one, and we'll host our code on [GitHub](https://github.com/) - because it's free for open source repositories and it's where everyone is at right now.

While I'm using Mac and I'll show how to install everything on a Mac, it should be pretty easy to install everything in this series on Linux and Windows too. Everyone of the tools we'll use is well known and should be plenty of resources and help on the internet.

### 1.1. Install git

I recommend to use a package manager to install everything on your machine, on mac it's `brew`. Once you have [brew](https://brew.sh/) installed on your machine all you need to do to install `git` is:

```bash
$ brew install git
```

That's it, now if you'll write `git` on your command line of choice you'll get as an output all the git commands you can use.

![git bash output](/images/posts/2020/chapter-1-simple-twitter/macbook_git_installed.jpg "git bash output")

### 1.2. Open a GitHub account

GitHub is a web based git with some extra features. We don't need to install anything to use GitHub, just open an account and configure some stuff. So let's do it! Let's go to https://github.com and pick a `username`, `email`, and `password` and click on the big green button says *Sign up for GitHub*.

![GitHub Sign Up Page](/images/posts/2020/chapter-1-simple-twitter/github_sign_up_page.png "GitHub Sign Up Page")

After you sign up you'll need to confirm your account, so check your email. Now we need to config our local `git` with our `email` and `username`. We can do it by typing those command:

```bash
$ git config --global user.name "Nir Galon"
$ git config --global user.email nir@galon.io
```

That's it for now. Once we'll have some code, we'll open a new repository, commit the code to GitHub and talk about issues and pull requests.

### 1.3. Atom

My code editor of choice is [Atom](https://atom.io/). But you have plenty of choice and everyone love something else. Most of them are pretty much the same and we're not going to use any specific features to any code editor, so choose what ever you like.

To install Atom with `brew` we need to add [cask](https://github.com/Homebrew/homebrew-cask), cask extends brew (Homebrew) and let us install macOS applications with brew. So let's add `cask`:

```bash
$ brew update
$ brew tap caskroom/cask
```

And now we can install Atom

```bash
$ brew cask install atom
```

&nbsp;

## 2. Database Setup

Something

### 2.1. mongodb

install mongodb

### 2.2. robo 3t

install robo 3t

&nbsp;

## 3. Backend Setup

Something

### 3.1. Node.js

Install nodeJS

### 3.2. NPM

Make sure npm is installed

&nbsp;

## 4. Frontend Setup

Something

### 4.1 Angular CLI

install angular cli -g

&nbsp;

## 5. Cloud / Devops Setup

Something

### 5.1 Google Cloud

Install gcloud

### 5.2 Kubernetes

install kubectl

&nbsp;

## 6. Summary

Something
