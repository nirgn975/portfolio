---
layout: "../../../layouts/BlogPost.astro"
title: "Learn Git - Part 1: introduction"
pubDate: 2014-06-15T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "/about"

tags: ["git", "learn", "github", "cli", "command line", "workflow", "linus torvalds"]
category: "tools"

featuredImage: "/posts/2014/learn-git-part-1-introduction/cover.webp"
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

```bash showLineNumbers title=" "
git help # print all the commands with a simple explanation.
git help config # print all the config command options with a simple explanation.
```

![git help command in the terminal](/posts/2014/learn-git-part-1-introduction/cli-git-help.webp "git help command in the terminal")

To install git I'll use `brew` (on Mac), but it's pretty easy to install on any OS, just use [this guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) for you OS. After we installed it, the first thing we want to do is to set our username and email, so every commit (we'll get to what is commit in the future) will be belong to you.

```bash showLineNumbers title=" "
brew install git
git config --global user.name "<YourNameHere>"
git config --global user.email "<YourEmailHere>"
```

We're ready to start working on our first repository (repo for short). Let's create a new one (just navigate to your wanted location in your file system with `cd`) and then initiate a new repo (you can do it with an empty directory or with a directory with some files in it already). This will create an invisible directory (directory that start with a dot (`.`)) with the name `git`.

```bash showLineNumbers title=" "
cd projects
mkdir newProject
git init
```

Now we have a local repository (not on any server, local to your computer).

&nbsp;

## 3. Workflow

Before we continue diving with the tool, I would like to take couple of minutes to go over the workflow with `git`. For convince I would borrow some names from the cryptography world: Alice and Bob. Let's suppose Alice created a file `README.md` and when a new file is created, it's start his life as an untracked file (that's means that the `git` system doesn't know about it), to make `git` track this file we need to add it to the _staging area_, and finally we make a `commit` - that's a `git` command to take a snapshot of all the files in the _staging area_.

Now let's assume Alice working some more on the `README.md` file, doing some changes and even add a new file `LICENSE`, when she done, she need to add both of those files to the _staging area_, again, and `commit` those changes. This is pretty much will be our workflow at the moment. We'll making some work -> add the work that we done to the _staging area_ -> and commit it (taking the snapshot).

&nbsp;

## 4. More Commands

Once we understand the workflow in theory, we need to practice it.

Maybe the most important command in `git` (in my opinion) is `status` - it allow us to check the changes that were made from the last `commit` (snapshot). Let's see what the result of this command will be after we initiate (with `git init`) the repo, and created a `README.md` file (didn't nothing like adding it to the _staging area_ or `commit` it).

```bash showLineNumbers title=" "
git status
```

output:

```txt title=" "
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

We can see we got couple of pieces of information back:

- We are on branch `main` (we'll take about branches later)
- There is no commits yet in this repo.
- We have a new file (file that `git` doesn't track) in the name of `README.md`
- Nothing was added to the _staging area_, and `git` knows that there're files that it doesn't track yet (so we have something to give him, to adding to the _staging area_).

So let's give `git` what it wants, let's start tracking this `README.md` file (with the `add` command and right after it the file itself), and then do another `status` command to see the output now.

```bash showLineNumbers title=" "
git add README.md
git status
```

output:

```txt title=" "
On branch master

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
        new file:   README.md
```

We see almost the same pieces of information, but now `git` have a file in his _staging area_ (a file ready to be `commit`ed). So, it's time to do our first `commit`. To do this we'll use the `commit` command. A flag that the `commit` command have is `m` which means _"message"_, with this flag we can add a message to the `commit` to describe the changes this `commit` is do.

When we do the `commit` we basically take a snapshot of our file system in this exact time. Even a space means a change. This commit is added to the repo (project) timeline (it's accepted to draw it and imagine it as a timeline, because every `commit` has a timestamp, so we can place them all on a big timeline from the start of the project until now).

```bash showLineNumbers title=" "
git commit -m "Created an empty README file"
```

output:

```txt title=" "
[master (root-commit) de7c8db] Created an empty README file
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 README.md
```

if we write the `status` command again, we'll see there is no changes to be added to the _staging area_ or no changes in the _staging area_ to be `commit`ed. We also can see in the first line that we on branch `main`, for now everything you need to know on branches is that we have a timeline (branch) in the name of `main`, and we `commit` things to that branch (timeline).

```bash showLineNumbers title=" "
git status
```

output:

```txt title=" "
On branch master
nothing to commit, working tree clean
```

Now let's make some changes in `README.md` and create a new file named `LICENSE` (like we said Alice did in the [workflow section](#3-workflow)), and run the `status` command again.

```bash showLineNumbers title=" "
echo "first change" > README.md
touch LICENSE
git status
```

output:

```txt title=" "
On branch master
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   README.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        LICENSE

no changes added to commit (use "git add" and/or "git commit -a")
```

`git` knows that the `README.md` file has changed! and those changes are not staged (not in the _staging area_, not ready to be `commit`ed). `git` also noticed we created a new file that it doesn't track (`LICENSE`).

To commit those files we need to add them to the _staging area_ first, we can do it like we did it earlier with the `add` command and the two files (with a space between them), but we can do it more efficiently with the `all` flag - which will add all of the changes and untracked files to the _staging area_ (be careful with this flag because something you).

After we add them, we can use the `status` command again to see what have changed. We can see we have two files in the _staging area_, ready to be `commit`ed, one (`LICENSE`) is a new file, and the other (`README.md`) is a tracked file that just changed (modified).

```bash showLineNumbers title=" "
git add --all
git status
```

output:

```txt title=" "
On branch master
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   LICENSE
        modified:   README.md
```

Now let's do a new `commit` (take a second snapshot) and then explore it a little bit.

```bash showLineNumbers title=" "
git commit -m "Add a new LICENSE file and finish README"
```

output:

```txt title=" "
[master 380c1e1] Add a new LICENSE file and finish README
 2 files changed, 1 insertion(+)
 create mode 100644 LICENSE
```

To look at the history, the log, of the current timeline we can use the `log` command. We see there're two `commit`s in the branch (timeline) we're currently at. And also much more information:

- We're in the `main` branch (timeline).
- The `commit`s hash, which is a unique string of number and letters to represent that `commit`. It's basically the name of the `commit`, with it we can reference that `commit`.
- The author and the exact time and date of the `commit`.
- The message of the commit (this is why the message is important. It should be understandable, concise and describe exactly what the changes are. It also accepted to write in present time and not history or future).

```bash showLineNumbers title=" "
git log
```

output:

```txt title=" "
commit 380c1e1346008245c8268ccb039538df3e314b87 (HEAD -> master)
Author: Nir Galon <nir@galon.io>
Date:   Sat Oct 3 12:51:23 2020 +0300

    Add a new LICENSE file and finish README

commit de7c8db1ce767a3a757d760cb7200abe9d847c65
Author: Nir Galon <nir@galon.io>
Date:   Sat Oct 3 02:03:24 2020 +0300

    Created an empty README file
```

Like the drawing below, we can imagine it as two dots, where each dot is a `commit` (snapshot), and a line (timeline, the `branch`) is connected them. Going from the first (oldest) one at the left, to the newest one at the right. Where the most newest `commit`, the dot to the most right, is our current `commit` (`HEAD`).

<svg viewBox="-126 -19 204 83.39913940429688"  xmlns="http://www.w3.org/2000/svg" width="204px" id="graph-div" height="100%" xmlns:xlink="http://www.w3.org/1999/xlink"><style>@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");'</style><title id="chart-title-graph-div"></title><desc id="chart-desc-graph-div"></desc><style>#graph-div {font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#ccc;}#graph-div .error-icon{fill:#a44141;}#graph-div .error-text{fill:#ddd;stroke:#ddd;}#graph-div .edge-thickness-normal{stroke-width:2px;}#graph-div .edge-thickness-thick{stroke-width:3.5px;}#graph-div .edge-pattern-solid{stroke-dasharray:0;}#graph-div .edge-pattern-dashed{stroke-dasharray:3;}#graph-div .edge-pattern-dotted{stroke-dasharray:2;}#graph-div .marker{fill:lightgrey;stroke:lightgrey;}#graph-div .marker.cross{stroke:lightgrey;}#graph-div svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#graph-div .commit-id,#graph-div .commit-msg,#graph-div .branch-label{fill:lightgrey;color:lightgrey;font-family:'trebuchet ms',verdana,arial,sans-serif;font-family:var(--mermaid-font-family);}#graph-div .branch-label0{fill:undefined;}#graph-div .commit0{stroke:hsl(180, 1.5873015873%, 48.3529411765%);fill:hsl(180, 1.5873015873%, 48.3529411765%);}#graph-div .commit-highlight0{stroke:rgb(133.6571428571, 129.7428571428, 129.7428571428);fill:rgb(133.6571428571, 129.7428571428, 129.7428571428);}#graph-div .label0{fill:hsl(180, 1.5873015873%, 48.3529411765%);}#graph-div .arrow0{stroke:hsl(180, 1.5873015873%, 48.3529411765%);}#graph-div .branch-label1{fill:undefined;}#graph-div .commit1{stroke:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);fill:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);}#graph-div .commit-highlight1{stroke:rgb(93.5483870969, 221.4516129033, 139.677419355);fill:rgb(93.5483870969, 221.4516129033, 139.677419355);}#graph-div .label1{fill:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);}#graph-div .arrow1{stroke:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);}#graph-div .branch-label2{fill:undefined;}#graph-div .commit2{stroke:hsl(194.4, 16.5562913907%, 49.6078431373%);fill:hsl(194.4, 16.5562913907%, 49.6078431373%);}#graph-div .commit-highlight2{stroke:rgb(149.4437086091, 117.6092715231, 107.5562913906);fill:rgb(149.4437086091, 117.6092715231, 107.5562913906);}#graph-div .label2{fill:hsl(194.4, 16.5562913907%, 49.6078431373%);}#graph-div .arrow2{stroke:hsl(194.4, 16.5562913907%, 49.6078431373%);}#graph-div .branch-label3{fill:undefined;}#graph-div .commit3{stroke:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);fill:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);}#graph-div .commit-highlight3{stroke:rgb(99.9811320754, 162.7735849057, 202.0188679245);fill:rgb(99.9811320754, 162.7735849057, 202.0188679245);}#graph-div .label3{fill:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);}#graph-div .arrow3{stroke:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);}#graph-div .branch-label4{fill:undefined;}#graph-div .commit4{stroke:hsl(0, 83.3333333333%, 43.5294117647%);fill:hsl(0, 83.3333333333%, 43.5294117647%);}#graph-div .commit-highlight4{stroke:rgb(51.5000000001, 236.5, 236.5);fill:rgb(51.5000000001, 236.5, 236.5);}#graph-div .label4{fill:hsl(0, 83.3333333333%, 43.5294117647%);}#graph-div .arrow4{stroke:hsl(0, 83.3333333333%, 43.5294117647%);}#graph-div .branch-label5{fill:undefined;}#graph-div .commit5{stroke:hsl(289.1666666667, 100%, 24.1176470588%);fill:hsl(289.1666666667, 100%, 24.1176470588%);}#graph-div .commit-highlight5{stroke:rgb(154.2083333334, 255, 132.0000000001);fill:rgb(154.2083333334, 255, 132.0000000001);}#graph-div .label5{fill:hsl(289.1666666667, 100%, 24.1176470588%);}#graph-div .arrow5{stroke:hsl(289.1666666667, 100%, 24.1176470588%);}#graph-div .branch-label6{fill:undefined;}#graph-div .commit6{stroke:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);fill:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);}#graph-div .commit-highlight6{stroke:rgb(51.331168831, 135.1948051946, 253.6688311688);fill:rgb(51.331168831, 135.1948051946, 253.6688311688);}#graph-div .label6{fill:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);}#graph-div .arrow6{stroke:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);}#graph-div .branch-label7{fill:undefined;}#graph-div .commit7{stroke:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);fill:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);}#graph-div .commit-highlight7{stroke:rgb(206.1818181817, 89.948051948, 241.051948052);fill:rgb(206.1818181817, 89.948051948, 241.051948052);}#graph-div .label7{fill:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);}#graph-div .arrow7{stroke:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);}#graph-div .branch{stroke-width:1;stroke:lightgrey;stroke-dasharray:2;}#graph-div .commit-label{font-size:10px;fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#graph-div .commit-label-bkg{font-size:10px;fill:hsl(180, 1.5873015873%, 28.3529411765%);opacity:0.5;}#graph-div .tag-label{font-size:10px;fill:#e0dfdf;}#graph-div .tag-label-bkg{fill:#1f2020;stroke:#cccccc;}#graph-div .tag-hole{fill:#ccc;}#graph-div .commit-merge{stroke:#1f2020;fill:#1f2020;}#graph-div .commit-reverse{stroke:#1f2020;fill:#1f2020;stroke-width:3;}#graph-div .commit-highlight-inner{stroke:#1f2020;fill:#1f2020;}#graph-div .arrow{stroke-width:8;stroke-linecap:round;fill:none;}:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g></g><g class="commit-bullets"></g><g class="commit-labels"></g><g><line class="branch branch0" y2="0" x2="100" y1="0" x1="0"></line><rect transform="translate(-19, -9.5)" height="23" width="53" y="-1.5" x="-69" ry="4" rx="4" class="branchLabelBkg label0"></rect><g class="branchLabel"><g transform="translate(-79, -10.5)" class="label branch-label0"><text><tspan class="row" x="0" dy="1em" xml:space="preserve">main</tspan></text></g></g></g><g class="commit-arrows"><path class="arrow arrow0" d="M 10 0 L 10 0  10 0 L 60 0"></path></g><g class="commit-bullets"><circle class="commit 0-8db70c3 commit0" r="10" cy="0" cx="10"></circle><circle class="commit 1-af1da26 commit0" r="10" cy="0" cx="60"></circle></g><g class="commit-labels"><g transform="translate(-28.78, 25.64) rotate(-45, 0, 0)"><rect height="15" width="50" y="13.5" x="-15" class="commit-label-bkg"></rect><text class="commit-label" y="25" x="-13">0-8db70c3</text></g><g transform="translate(-28.18625, 25.10875) rotate(-45, 50, 0)"><rect height="15" width="48.4375" y="13.5" x="35.78125" class="commit-label-bkg"></rect><text class="commit-label" y="25" x="37.78125">1-af1da26</text></g></g></svg>

&nbsp;

## 5. Q & A

Let's practice a little bit by going over the things we learned.

### **Questions**

1. You want to initiate a new repo. You're already in a directory with a file, what command do you write to do it?
2. You created some files, made a few `commit`s, you updated some files and the day is over, you want to do your last `commit` for the day and go home. But you don't remember what files you have changed from the last `commit`, what command can help you see the changes from the last `commit`?
3. You found out with the last command that you have only one file changed (`index.html`), make him ready to be `commit`ed.
4. Make a `commit`.
5. You created a new directory (`css`), with couple of files, add the entire directory (with all of it's files) to the _staging area_.
6. A colleague goes by your desk and ask you what have you been `commit`ed today, what command do you write to show him?

### **Answers**

1. The `git init` command.
2. The `git status` command.
3. The `git add` command: `git add index.html`.
4. The `git commit` command: `git commit -m "Add index.html"`.
5. To add an entire directory we'll just write it: `git add css`.
6. The `git log` command.

&nbsp;

## 6. Summary

So, we learn a bit about the history of `git`, why do we need it and how [GitHub](https://github.com) is related. From there we move on the learn some basic commands, the git workflow, and then to some of the most used commands in `git`.

I recommend to learn through your fingers - to write all the commands yourself and see the output in your terminal. This is the best way to learn! Don't copy and paste answers to your terminal, write them yourself, slowly it'll get through and you'll remember and understand it all in no time.
