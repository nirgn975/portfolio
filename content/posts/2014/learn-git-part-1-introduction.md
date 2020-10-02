---
title: "Learn Git - Part 1: introduction"
subtitle: ""
date: 2014-06-15T09:00:00+03:00
lastmod: 2014-06-15T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["git", "learn", "github", "cli", "command line", "workflow", "linus torvalds"]
categories: ["tools"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2014/learn-git-part-1-introduction/cover.webp"
featuredImagePreview: "/posts/2014/learn-git-part-1-introduction/cover.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---
I think everybody here at least heard about [GitHub](https://github.com) and maybe even about the file management system called [git](https://git-scm.com) which is everywhere in the development world those days. So, as a computer science student I choose to learn it, and what batter way to learn something then to write about it.

So in this series of posts I'll document my journey to learn git (which is the base of GitHub as the only version control you can use on the platform). I hope more people can use it as a learning document or even to deepen their knowledge in the tool.

&nbsp;

## 1. Some General Knowledge

git is a distribute version control (basically a file management system with a db to save the changes that were made to those files over time) created by [Linus Torvalds](https://en.wikipedia.org/wiki/Linus_Torvalds) in 2005. Why he even created it you ask? He and some other Linux Kernel developers weren't happy with the source-control management (SCM) software they used at the time (BitKeeper). You can read in the [Wikipedia page of git](https://en.wikipedia.org/wiki/Git) about what exactly their issues was, but this is out of the scope of this post.

**Why I even need a source control system?**

This is a valid question. In the old days you were just edit your code, FTP it to your server, and that's it. Maybe you have one more fellow developer with you on the same project, he would have send you a piece of code, you paste it in the exact location in the file he told you too and that's it - FTP it to the server.

You had problems? just shout him a question he probably down the hallway. But when software started to eat the world, getting bigger, more complex, with bigger teams, in different places in the world and different time zones it started to get messier. You need a version control to manage the code in different computers, try to merge pieces of code together, save the history (the changes that were made so we can go back in time in case we encounter some issue), and even want to know who made those changes.

**How GitHub is related to all of this?**

[GitHub](https://github.com) is a hosting company for `git` (repositories). The service was founded in 2008 and hosts public repos for free and private ones for a fee. But, from that simple idea, GitHub built a fully fledged software management system, it's now basically a way to manage the whole project with some social media capabilities and a way to share and contribute code.

&nbsp;

## 2. Simple Commands

Like most of CLI (command line) tools, `git` comes with a `help` command. So, if we ever got stuck we can always use it to find out about some command.

```bash
$ git help # print all the commands with a simple explanation.
$ git help config # print all the config command options with a simple explanation.
```

![git help command in the terminal](/posts/2014/learn-git-part-1-introduction/cli-git-help.webp "git help command in the terminal")

To install git I'll use `brew` (on Mac), but it's pretty easy to install on any OS, just use [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for you OS. After we installed it, the first thing we want to do is to set our username and email, so every commit (we'll get to what is commit in the future) will be belong to you.

```
$ brew install git
$ git config --global user.name "<YourNameHere>"
$ git config --global user.email "<YourEmailHere>"
```

We're ready to start working on our first repository (repo for short). Let's create a new one (just navigate to your wanted location in your file system with `cd`) and then initiate a new repo (you can do it with an empty directory or with a directory with some files in it already). This will create an invisible directory (directory that start with a dot (`.`)) with the name `git`.

```bash
$ cd projects
$ mkdir newProject
$ git init
```

Now we have a local repository (not on any server, local to your computer).

&nbsp;

## 3. Workflow

Something

&nbsp;

## 4. More Commands

Something

&nbsp;

## 5. Q & A

Something

&nbsp;

## 6. Summary

Something
