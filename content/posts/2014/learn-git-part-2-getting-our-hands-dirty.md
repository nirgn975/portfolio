---
title: "Learn Git - Part 2: getting our hands dirty"
subtitle: ""
date: 2014-07-06T09:00:00+03:00
lastmod: 2014-07-06T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["git", "learn", "github", "cli", "command line", "undo", "revert", "repo", "merge", "collaboration"]
categories: ["tools"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2014/learn-git-part-2-getting-our-hands-dirty/cover.webp"
featuredImagePreview: "/posts/2014/learn-git-part-2-getting-our-hands-dirty/cover.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---
This part is a direct continuation of [Learn Git - Part 1: introduction](https://lifelongstudent.io/2014/06/learn-git-part-1-introduction/), so if you haven't read it, go and read it first. We based on the things we learned and do there, so make sure you don't delete the repo we created in the part 1.

&nbsp;

## 1. Making a difference

So, let's say Alice is just coming in and sat down in her work station, on the computer, she's on her local repo (a local copy of the repo of the project, in her own computer). Yesterday she made some changes to the `LICENSE` file, she wants to continue her work but don't remember the changes she made yesterday (so she don't remember where she's at).

To see the changes from the last commit, we can use the `diff` command. The output of the command is the changes that aren't in the _staging area_ - changes to files the `git` system already track, but we yet to `add` them and include those new changes.

The _"old"_ line will begin with a minus (`-`) at the start of the line, and the _"new"_ line of code (with the changes) will begin with a plus (`+`) at the start of it. In our case the `LICENSE` file was empty, so at we only see a plus line with the text we added to the file.

```bash
diff --git a/LICENSE b/LICENSE
index e69de29..39604a4 100644
--- a/LICENSE
+++ b/LICENSE
@@ -0,0 +1 @@
+Copyright (c) 2014 nirgn
```

If we now `add` the `LICENSE` file to the _staging area_ and then run again the `diff` command, we'll see nothing (because all of the changes are added to the _staging area_), but if we ,nonetheless, want to see the changes even in the _staging area_ we can use the `staged` flag and we would get the same output as before.

**Don't regret anything! Ok, some things are ok to regret about**

Now, if we use the `status` command, we'll see there is a file changed, added to the _staging area_, and ready to be `commit`ed. But if we didn't mean to add it to the _staging area_ yet? What if Alice didn't finish with this file yet, and want add it to a different `commit` later on?

To remove files from the _staging area_ we'll use the `reset HEAD <nameOfFile>` command. The elephant in the room - the `HEAD` in the command means the last `commit` in the current `branch` (timeline), in our case for the time being is `master`. So we actually reset the file to undo the changes, from the _staging area_, that were made until the last `commit`.

```bash
$ git reset HEAD LICENSE
Unstaged changes after reset:
M       LICENSE
```

Now if we run the `status` command, we can see that changes were made to the `LICENSE` file, but are not staged. If we want to undo the changes completely and revert the file to his state in the last `commit` we can do it by using the `checkout <nameOfFile>`.

```bash
$ git checkout LICENSE
Updated 1 path from the index
```

Now the `status` command will show us there is no changes at all and the `LICENSE` file is back to his last `commit` state.

&nbsp;

## 2. Revert all the things

Until now we regret adding files to the _staging area_, but what if we already `commit`ed the file? or maybe we forget to include something in the file and we want it to be in the same `commit`?

For those type of cases we can use the `reset` command with a new flag, `soft HEAD^`. This will undo the last `commit`, and bring all of the changes that were made in this `commit` to the _staging area_. As we said before the `HEAD` is the last `commit` in the current branch (timeline), but the caret symbol (`^`) says the one before. So `HEAD^` means the `commit` before the last one, in the current branch.

So let's do some change to the `README.md` file, `add` it and `commit` it in one command (with a new flag). This type of `add` and `commit` is only allowed if the files is already been tracked. After we do it, let's use the `reset soft` command to undo it.

```bash
$ echo "This is a new line" > README.md
$ git commit -a -m "Modify README file"
[master 017a141] Modify README file
 1 file changed, 1 insertion(+), 1 deletion(-)
$ git status
On branch master
nothing to commit, working tree clean
$ git reset --soft HEAD^
$ git status
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   README.md
```

Now we can still edit the `README.md` file and then `commit` everything together.

If you only want to add something to the last `commit`, and even change the last `commit` text, a simpler way is to use the `commit` command with the `amend` flag. It'll add everything in the _staging area_ to the last commit and you can change the text of the commit in the process.

```bash
$ git commit --amend -m "Add a new LICENSE file and add text to README"
[master 5870e6f] Add a new LICENSE file and add text to README
 Date: Sat Oct 3 12:51:23 2020 +0300
 2 files changed, 1 insertion(+)
 create mode 100644 LICENSE
```

Another flag to know it the `hard`, it'll undo the changes like `soft`, but instead of leave them in the _staging area_ it'll delete them entirely like they never existed.

```bash
$ git reset --hard HEAD^
HEAD is now at de7c8db Created an empty README file
```

The commit is just disappeared, our file revert to the commit before it, and the changes is not preset anywhere.

&nbsp;

## 3. Can anybody hear me?

Until now, we worked on our local repo (the repo on our local computer). But what if we want to collaborate with another developer on the project? To do this, we need to upload the code to some sort of a server, if it's our company server or a different company server that we rent - doesn't matter, Bob (for example) need a copy of the code.

In the old times, like I wrote in the first post, we would probably transfer the code on a disk on key between computers back and forth. But now days, we'll sync our local repo with some server that'll host the project's code (another repository copy in another computer - a server, the cloud). In other VCS (**V**ersion **C**ontrol **M**anagement) systems (like SVN for example) there is a centralized server - a single source of truth.

With `git`, every repo has it's own single source of truth. `git` makes it a bit difficult to create a single source of truth, but it's possible none the less. For most it'll be the server, and in particularly - GitHub.

This is where the `push` and `pull` commands comes in. Let's learn how to use them by creating a new repo on [GitHub](https://github.com), and push our local repo to the remote repo on [GitHub](https://github.com) (that's why all of our commands will start with `remote`). First, if you don't have a [GitHub](https://github.com) account already, create one and verify it.

Now let's open a new repository by clicking on the plus button at the top right corner and then _"New repository"_.

![GitHub new repository button](/posts/2014/learn-git-part-2-getting-our-hands-dirty/new-repository.webp "GitHub new repository button")

You'll be redirect to a new page where you can fill out all the details about the project, like the new of the project / repository, a description, make it public (free of charge, everybody can see the code and even fork it) or private and more stuff at the bottom - we'll not get in to it right now, some of it will be discussed in future posts.

![GitHub repo details](/posts/2014/learn-git-part-2-getting-our-hands-dirty/github-repo-details.webp "GitHub repo details")

In my case the name will be `test`, I'll leave the description empty, the repo will be public, and without `README` file, `.gitignore` or `LICENSE` files (we'll create the manually).

After we create the repo we'll get a URL from GitHub. This URL is the URL for the repo, with it we can `push` and `pull` code, and even `clone` the repo from GitHub server to a new local computer.

![GitHub repo URL](/posts/2014/learn-git-part-2-getting-our-hands-dirty/github-repo-url.webp "GitHub repo URL")

To `push` our code to the new [GitHub](https://github.com) `remote` repo we first need to config the GitHub repo address (the URL we got from them) as `remote` address so we can later push to that `remote` address. We'll do it with the `remote add <aliasOfRemoteURL> <remoteURL>` command.

```bash
$ git remote add origin https://github.com/nirgn975/test.git
$ git remote -v
origin  https://github.com/nirgn975/test.git (fetch)
origin  https://github.com/nirgn975/test.git (push)
```

I bet the first thing that comes to your head is "why we call our remote alias `origin`?", You're right, it's a bit wired, we can all if whatever we want. But `origin` is just a standard convention, and we'll love conventions. And the second command is just a way to print all the `remote` addresses, so we just make sure everything was added successfully.

Now, it's finally time to push our local branch (timeline) `master` to `origin` (the GitHub repo). You'll need to fill your username and password so GitHub will check if you have permissions to push to that repo.

```bash
$ git push origin master
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 224 bytes | 224.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:nirgn975/test.git
 * [new branch]      master -> master
```

If we refresh the GitHub repo page we'll see the `README` file there, and a new _"Network"_ button (at the right menu, next to the _"Settings"_) where we can see all the `branch`s and all the `commit`s, with their messages, who're their author, when they `commit`ed, and more (basically like writing the `log` command on our terminal).

So, we `push`ed our repo to a `remote` source on GitHub (or any other `git` hosting), but how can Bob take this code to his local machine? Like we said before, with the `pull` command (we'll also use the  `pull` command to sync our local repo with the `remote` one, so get changes other team members did and `push`).

```bash
$ git pull origin master
From github.com:nirgn975/test
 * branch            master     -> FETCH_HEAD
Already up to date.
```

In this case, our local repo is already up to date with the `remote` one (of course it is, we push the code a couple of minutes ago and we don't have any one who push new code to our repo in the mean time).

&nbsp;

## 4. Rap collaboration

A collaboration is an important thing, not just for open source projects where a lot of different people (maybe even from different countries with different time zones and languages) will work on the same project, but also at work, even if it's not a big company with a lot of teams, chances are you're not develop the software alone.

So, let's say Bob is working with Alice on the same team. It's his first day, and they want him to work on a new feature of the product. He need a local copy of the repo, so he `clone` the repo to his local machine. If you're on [GitHub](https://github.com) just go to the project repo and choose the _"Code"_ tab, at the bottom (above the _"Download ZIP"_) there is a section with the text _"HTTP clone URL"_ - this is the URL of the repo, copy it, and then go to your terminal to `clone` the repo.

![GitHub repo clone URL](/posts/2014/learn-git-part-2-getting-our-hands-dirty/github-repo-clone-url.webp "GitHub repo clone URL")

```bash
$ git clone https://github.com/nirgn975/test.git
```

The repo will be cloned on your local machine, in the directory that you were at in the terminal, to a new directory with the name of the of the repo. When you `clone` the repo to your local machine, the `git` system does 3 things:

1. Download the repo to your local machine in a directory with the name of the repo.
2. Add a `remote` with the `origin` name that alias to the repo URL.
3. `git` will configure a branch named `master` and point the `HEAD` to be the last `commit` from the `master` branch in the `origin`.

&nbsp;

## 5. Merge the branches

Bob is ready now to work on the new feature, but to do this it's better to create a new `branch` (timeline) and not to work on the same main `branch` of the project (`master`). This is because while he work on his own feature, other people working on theirs features or bugs too, and if everyone will work on the same branch and `commit` frequently, it'll create a mess, and everyone will _"resolve conflicts"_ all of the time instead of working.

To create a new `branch` out (or splits if you want) of the main `master` branch (the current branch we're in right now) can be done using the `branch` command.

```bash
$ git branch home-page
```

After we created the new branch, let's check on which branch we're in right now.

```bash
$ git branch
home-page
* master
```

We're still on `master`. So to move to the `home-page` branch, we'll use the `checkout` command.

```bash
$ git checkout home-page
Switched to branch 'home-page'
```

Now we're in a different timeline (`branch`), we can do whatever we want and it'll just do it just in the `home-page` branch, and nothing will infect our `master` branch. Any time we want to can go back to `master` branch, and see the repo from `master` branch point of view (timeline).

In the meantime, while we work on our feature, if other members of the project finish their own work and merge it to `master`, we can always `checkout` back to `master`, and `pull` the new `commit`s in `master`, to see our coworkers job.

Now that we're on a new branch (`home-page`), let's create a new file called `index.html`, inside of it we'll add the basic html code we need for a simple web page, `add` it to the _staging area_, and commit the file.

```bash
$ touch index.html
$ echo "<html>\n\t<head>\n\t\t<title>website title</title>\n\t</head>\n\t<body>\n\t\tcontent of website ...\n\t</body>\n</html>" >> index.html
$ git add index.html
$ git commit -m "Add basic html code"
```

The `commit` we just did, will be added to the current (`home-page`) timeline (`branch`), and will not be seen in any other `branch`. If we write the `ls` command in the terminal (in the current directory) we'll see all of our project files (`README.md` and `index.html`), but if we'll `checkout` to the `master` branch we'll not see the `index.html` file, even if we write the `git log` command, we'll not see our latest `commit` in there.

Let's just check we aren't crazy and `checkout` back to the `home-page` branch, and then with the `ls` command makes sure we see our `index.html` file.

So, let's say we're done with this task, we did all of the things we had to do here and we're ready to `merge` this `home-page` branch to the `master` branch. To do this we're first need to go to the branch we want to `merge` things to (in our case `master`), and then use the `merge` command to actually merge the code from the other branch to the branch we are at right now.

```bash
$ git checkout master
Switched to branch 'master'
$ git merge home-page
Updating de7c8db..bfb8f2b
Fast-forward
 index.html | 8 ++++++++
 1 file changed, 8 insertions(+)
 create mode 100644 index.html
```

We can see that `git` tells us it's update the branch by _"Fast forward"_, but what is it means? it's when we try to merge one commit with a commit that can be reached by following the first commit’s history, `git` simplifies things by moving the pointer forward because there is no divergent work to merge together, so it's called _"fast-forward"_.

When we finished `merge`ing the `branch`, we don't need it anymore, so we can just delete it. We'll use the `branch` command with the `d` flag to do it.

```bash
$ git branch -d home-page
Deleted branch home-page (was bfb8f2b).
```

&nbsp;

## 6. Q & A

It's time to practice. Remember that the best practice is through your fingertips. If you don't have a project you want to upload and share, just create an empty directory and put a simple text file in there. If you can't figure out something, it's okay to look at the answers, but don't just look at it, write it in the terminal (don't copy-paste, write it on your own).

### **Questions**

1. A new file was added to the project, write a command to show you the changes from the last `commit`.
2. Add the `index.html` file to the _staging area_.
3. Wait a second, a colleague walks by your desk and ask to see what is different from the last `commit`, show him.
4. The colleague updates you that this `index.html` is no longer relevant, delete it from the _staging area_.
5. Do some changes to the `README.md` file, and because `git` already tracks that file, `add` and `commit` in one command.
6. Oops! I forget to tell you to add another file to that `commit`, you need to create a new file named `map.index` and `commit` it with the `README.md` file from the last commit.
7. Wait I didn't tell you what content to add to the `map.index` file, return it to the _staging area_.
8. A colleague send you in an email the new repo URL, add it to your local repo configuration (it's: `https://github.com/example/importantProject.git`).
9. You're done for today, let's push everything to the remote repo. Use a special flag so you'll not need to write the `origin` alias next time.

### **Answers**

1. The `git diff` command.
2. `git add index.html`.
3. Use the `git diff --staged` command and flag to show the changes that were also added to the _staging area_.
4. The `git reset HEAD index.html` command.
5. Use the `-a` flag like so: `git commit -a -m "Modify README.md file"`.
6. Because `git` doesn't track the new page let's first add it `git add map.index`, no we can use the `-amend` flag to add it to the last commit: `git commit -amend -m "Modify README.md file and add map.index"`.
7. Use the `git reset -soft HEAD^` command.
8. Use the `remote add` command like so: `git remote add origin https://github.com/example/importantProject.git`.
9. You need the `push` command with the `-u` flag: `git push -u origin master`.

&nbsp;

## 7. Summary

So, we
