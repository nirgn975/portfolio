---
title: "Learn Git - Part 2: getting our hands dirty"
pubDate: 2014-07-06T09:00:00+03:00
draft: false
tags: ["git", "learn", "github", "cli", "command line", "undo", "revert", "repo", "merge", "collaboration"]
category: "git"
featuredImage: "/posts/2014/learn-git-part-1-introduction/cover.webp"
---

This part is a direct continuation of [Learn Git - Part 1: introduction](/blog/2014/learn-git-part-1-introduction), so if you haven't read it, go and read it first. We based on the things we learned and do there, so make sure you don't delete the repo we created in the part 1.

&nbsp;

## 1. Making a difference

So, let's say Alice is just coming in and sat down in her work station, on the computer, she's on her local repo (a local copy of the repo of the project, in her own computer). Yesterday she made some changes to the `LICENSE` file, she wants to continue her work but don't remember the changes she made yesterday (so she don't remember where she's at).

To see the changes from the last commit, we can use the `diff` command. The output of the command is the changes that aren't in the _staging area_ - changes to files the `git` system already track, but we yet to `add` them and include those new changes.

The _"old"_ line will begin with a minus (`-`) at the start of the line, and the _"new"_ line of code (with the changes) will begin with a plus (`+`) at the start of it. In our case the `LICENSE` file was empty, so we only see a plus line with the text we added to the file.

```bash showLineNumbers title=" "
git diff
```

output:

```txt title=" "
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

To remove files from the _staging area_ we'll use the `reset HEAD <nameOfFile>` command. The elephant in the room - the `HEAD` in the command means the last `commit` in the current `branch` (timeline), in our case for the time being is `main`. So we actually reset the file to undo the changes, from the _staging area_, that were made until the last `commit`.

```bash showLineNumbers title=" "
git reset HEAD LICENSE
```

output:

```txt title=" "
Unstaged changes after reset:
M       LICENSE
```

Now if we run the `status` command, we can see that changes were made to the `LICENSE` file, but are not staged. If we want to undo the changes completely and revert the file to his state in the last `commit` we can do it by using the `checkout <nameOfFile>`.

```bash showLineNumbers title=" "
git checkout LICENSE
```

output:

```txt title=" "
Updated 1 path from the index
```

Now the `status` command will show us there is no changes at all and the `LICENSE` file is back to his last `commit` state.

&nbsp;

## 2. Revert all the things

Until now we regret adding files to the _staging area_, but what if we already `commit`ed the file? or maybe we forget to include something in the file and we want it to be in the same `commit`?

For those type of cases we can use the `reset` command with a new flag, `soft HEAD^`. This will undo the last `commit`, and bring all of the changes that were made in this `commit` to the _staging area_. As we said before the `HEAD` is the last `commit` in the current branch (timeline), but the caret symbol (`^`) says the one before. So `HEAD^` means the `commit` before the last one, in the current branch.

So let's do some change to the `README.md` file, `add` it and `commit` it in one command (with a new flag). This type of `add` and `commit` is only allowed if the files is already been tracked. After we do it, let's use the `reset soft` command to undo it.

```bash showLineNumbers title=" "
echo "This is a new line" > README.md
git commit -a -m "Modify README file"
```

output:

```txt title=" "
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

```bash showLineNumbers title=" "
git commit --amend -m "Add a new LICENSE file and add text to README"
```

output:

```txt title=" "
[master 5870e6f] Add a new LICENSE file and add text to README
 Date: Sat Oct 3 12:51:23 2020 +0300
 2 files changed, 1 insertion(+)
 create mode 100644 LICENSE
```

Another flag to know it the `hard`, it'll undo the changes like `soft`, but instead of leave them in the _staging area_ it'll delete them entirely like they never existed.

```bash showLineNumbers title=" "
git reset --hard HEAD^
```

output:

```txt title=" "
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

```bash showLineNumbers title=" "
git remote add origin https://github.com/nirgn975/test.git
git remote -v
```

output:

```txt title=" "
origin  https://github.com/nirgn975/test.git (fetch)
origin  https://github.com/nirgn975/test.git (push)
```

I bet the first thing that comes to your head is "why we call our remote alias `origin`?", You're right, it's a bit wired, we can all if whatever we want. But `origin` is just a standard convention, and we'll love conventions. And the second command is just a way to print all the `remote` addresses, so we just make sure everything was added successfully.

Now, it's finally time to push our local branch (timeline) `main` to `origin` (the GitHub repo). You'll need to fill your username and password so GitHub will check if you have permissions to push to that repo.

```bash showLineNumbers title=" "
git push origin master
```

output:

```txt title=" "
Enumerating objects: 3, done.
Counting objects: 100% (3/3), done.
Writing objects: 100% (3/3), 224 bytes | 224.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To github.com:nirgn975/test.git
 * [new branch]      master -> master
```

If we refresh the GitHub repo page we'll see the `README` file there, and a new _"Network"_ button (at the right menu, next to the _"Settings"_) where we can see all the `branch`s and all the `commit`s, with their messages, who're their author, when they `commit`ed, and more (basically like writing the `log` command on our terminal).

So, we `push`ed our repo to a `remote` source on GitHub (or any other `git` hosting), but how can Bob take this code to his local machine? Like we said before, with the `pull` command (we'll also use the `pull` command to sync our local repo with the `remote` one, so get changes other team members did and `push`).

```bash showLineNumbers title=" "
git pull origin master
```

output:

```txt title=" "
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

```bash showLineNumbers title=" "
git clone https://github.com/nirgn975/test.git
```

The repo will be cloned on your local machine, in the directory that you were at in the terminal, to a new directory with the name of the of the repo. When you `clone` the repo to your local machine, the `git` system does 3 things:

1. Download the repo to your local machine in a directory with the name of the repo.
2. Add a `remote` with the `origin` name that alias to the repo URL.
3. `git` will configure a branch named `main` and point the `HEAD` to be the last `commit` from the `main` branch in the `origin`.

&nbsp;

## 5. Merge the branches

Bob is ready now to work on the new feature, but to do this it's better to create a new `branch` (timeline) and not to work on the same main `branch` of the project (`main`). This is because while he work on his own feature, other people working on theirs features or bugs too, and if everyone will work on the same branch and `commit` frequently, it'll create a mess, and everyone will _"resolve conflicts"_ all of the time instead of working.

To create a new `branch` out (or splits if you want) of the main `main` branch (the current branch we're in right now) can be done using the `branch` command.

```bash showLineNumbers title=" "
git branch home-page
```

After we created the new branch, let's check on which branch we're in right now.

```bash showLineNumbers title=" "
git branch
```

output:

```txt title=" "
home-page
* master
```

We're still on `main`. So to move to the `home-page` branch, we'll use the `checkout` command.

```bash showLineNumbers title=" "
git checkout home-page
```

output:

```txt title=" "
Switched to branch 'home-page'
```

Now we're in a different timeline (`branch`), we can do whatever we want and it'll just do it just in the `home-page` branch, and nothing will infect our `main` branch. Any time we want to can go back to `main` branch, and see the repo from `main` branch point of view (timeline).

In the meantime, while we work on our feature, if other members of the project finish their own work and merge it to `main`, we can always `checkout` back to `main`, and `pull` the new `commit`s in `main`, to see our coworkers job.

Now that we're on a new branch (`home-page`), let's create a new file called `index.html`, inside of it we'll add the basic html code we need for a simple web page, `add` it to the _staging area_, and commit the file.

```bash showLineNumbers title=" "
$ touch index.html
$ echo "<html>\n\t<head>\n\t\t<title>website title</title>\n\t</head>\n\t<body>\n\t\tcontent of website ...\n\t</body>\n</html>" >> index.html
$ git add index.html
$ git commit -m "Add basic html code"
```

The `commit` we just did, will be added to the current (`home-page`) timeline (`branch`), and will not be seen in any other `branch`. If we write the `ls` command in the terminal (in the current directory) we'll see all of our project files (`README.md` and `index.html`), but if we'll `checkout` to the `main` branch we'll not see the `index.html` file, even if we write the `git log` command, we'll not see our latest `commit` in there.

Let's just check we aren't crazy and `checkout` back to the `home-page` branch, and then with the `ls` command makes sure we see our `index.html` file.

So, let's say we're done with this task, we did all of the things we had to do here and we're ready to `merge` this `home-page` branch to the `main` branch. To do this we're first need to go to the branch we want to `merge` things to (in our case `main`), and then use the `merge` command to actually merge the code from the other branch to the branch we are at right now.

```bash showLineNumbers title=" "
git checkout master
```

output:

```txt title=" "
Switched to branch 'master'
```

and then

```bash showLineNumbers title=" "
git merge home-page
```

output:

```txt title=" "
Updating de7c8db..bfb8f2b
Fast-forward
 index.html | 8 ++++++++
 1 file changed, 8 insertions(+)
 create mode 100644 index.html
```

We can see that `git` tells us it's update the branch by _"Fast forward"_, but what is it means? it's when we try to merge one commit with a commit that can be reached by following the first commit’s history, `git` simplifies things by moving the pointer forward because there is no divergent work to merge together, so it's called _"fast-forward"_.

When we finished `merge`ing the `branch`, we don't need it anymore, so we can just delete it. We'll use the `branch` command with the `d` flag to do it.

```bash showLineNumbers title=" "
git branch -d home-page
```

output:

```txt title=" "
Deleted branch home-page (was bfb8f2b).
```

Now let's create a new `branch` to work on a new task, the branch will be called `basic-main` (because we'll add some basic code to the main website page - `index.html`). We can create the branch and then move to it in two separate commands like we did before, but there is a simpler way! We can use the `checkout` command with a flag (`b`) that tells to create the branch if doesn't exist yet, so this way, in one command we create the branch and then move (`checkout`) to it.

```bash showLineNumbers title=" "
git checkout -b basic-main
```

output:

```txt title=" "
Switched to a new branch 'basic-main'
```

Then we'll add the `<a href="detailed.html">Go to detailed page!</a>` line right after `content of website ..`.

```html showLineNumbers title="index.html"
<html>
  <head>
    <title>website title</title>
  </head>
  <body>
    content of website ...
    <a href="detailed.html">Go to detailed page!</a>
  </body>
</html>
```

Now we can `commit` the change in `index.html` and create a new page, `detailed.html` that the link will redirect us to (when we click it).

```bash showLineNumbers title=" "
git commit -a -m "Add a link to detailed page"
```

output:

```txt title=" "
[basic-main e979b01] Add a link to detailed page
 1 file changed, 7 insertions(+), 6 deletions(-)
```

and then

```bash showLineNumbers title=" "
touch detailed.html
echo "<html>\n\t<head>\n\t\t<title>website title</title>\n\t</head>\n\t<body>\n\t\t<h1>This is the detailed page<br><form><input type='button' value='Go back!' onclick='history.back()'></form></h1>\n\t</body>\n</html>" >> detailed.html
git add detailed.html
git commit -a -m "Finish detailed page"
```

output:

```txt title=" "
[basic-main af3853e] Finish detailed page
 1 file changed, 8 insertions(+)
 create mode 100644 detailed.html
```

Let's imagine how our repo branches (timelines) is looking right now.

{{< mermaid >}} gitGraph: options { "nodeSpacing": 100, "nodeRadius": 10 } end commit commit branch basicmain checkout basicmain commit commit {{< /mermaid >}}

Right in the middle of our work on the `basic-main` branch, we get an email from our boss that there are bugs in `main` and we need to take care of it immediately. So let's head over to `main` (you can run `git branch` after you `checkout` to `main` just to make sure you're on `main`).

```bash showLineNumbers title=" "
git checkout master
```

output:

```txt title=" "
Switched to branch 'master'
```

We don't know if anyone of our team members done with their work and `merge` it to `main` while we worked on our feature branch, so let's make sure we have an updated `main` by `pull`ing any new `commit`s from `origin`. Let's fix what we need to fix, and `commit` and `push` it to `origin`.

```bash showLineNumbers title=" "
git pull origin master
```

output:

```txt title=" "
From github.com:nirgn975/test
 * branch            master     -> FETCH_HEAD
Already up to date.
```

then

```bash showLineNumbers title=" "
echo "# Awesome Website\n\nThis is the repo for the awesome website" >> README.md
git commit -a -m "Add a description for the repo"
```

output:

```txt title=" "
[master c247760] Add a description for the repo
 1 file changed, 3 insertions(+)
```

and finally

```bash showLineNumbers title=" "
$ git push origin master
```

output:

```txt title=" "
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 16 threads
Compressing objects: 100% (6/6), done.
Writing objects: 100% (6/6), 679 bytes | 679.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0)
To github.com:nirgn975/test.git
   de7c8db..0baa97a  master -> master
```

Now that we put out the fire, let's head over to our `basic-main` branch, finish the work, `commit` it, and head back to `main` to merge it.

```bash showLineNumbers title=" "
$ git checkout basic-main

```

output:

```txt title=" "
Switched to branch 'basic-main'
```

then

```bash showLineNumbers title=" "
sed -i '' "s/content of website .../Welcome to the new website/g" index.html
git commit -a -m "Change welcome message"

```

output:

```txt title=" "
[basic-main a0ff187] Change welcome message
 1 file changed, 1 insertion(+), 1 deletion(-)
```

then switch branches

```bash showLineNumbers title=" "
git checkout master
```

otuput:

```txt title=" "
Switched to branch 'master'
```

and finally

```bash showLineNumbers title=" "
git merge basic-main
```

output:

```txt title=" "
Merge made by the 'recursive' strategy.
 detailed.html |  8 ++++++++
 index.html    | 13 +++++++------
 2 files changed, 15 insertions(+), 6 deletions(-)
 create mode 100644 detailed.html
```

After the `merge` command a VI editor will open up on you terminal. With this, `git` is basically telling us I made the merge `commit` for you, but if you'll need to be more specific with the `commit` message edit it (and there is a default `commit` message in the Vi editor). To exist the VI editor we'll `write` and `quit` (`:wq`).

Because we merge two branches with changes in each of them, `git` is doing a _"recursive"_ merge - `git` create a new `commit` right where we `merge` them, we can see it with the `git log` command.

Let's imagine how to whole process looks like visually.

<svg viewBox="-168.15625 -19 496.15625 173.17156982421875" xmlns="http://www.w3.org/2000/svg" width="496.15625" id="graph-div" height="100%" style="max-width: 100%;" xmlns:xlink="http://www.w3.org/1999/xlink"><style>@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css");'</style><title id="chart-title-graph-div"></title><desc id="chart-desc-graph-div"></desc><style>#graph-div {font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#ccc;}#graph-div .error-icon{fill:#a44141;}#graph-div .error-text{fill:#ddd;stroke:#ddd;}#graph-div .edge-thickness-normal{stroke-width:2px;}#graph-div .edge-thickness-thick{stroke-width:3.5px;}#graph-div .edge-pattern-solid{stroke-dasharray:0;}#graph-div .edge-pattern-dashed{stroke-dasharray:3;}#graph-div .edge-pattern-dotted{stroke-dasharray:2;}#graph-div .marker{fill:lightgrey;stroke:lightgrey;}#graph-div .marker.cross{stroke:lightgrey;}#graph-div svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#graph-div .commit-id,#graph-div .commit-msg,#graph-div .branch-label{fill:lightgrey;color:lightgrey;font-family:'trebuchet ms',verdana,arial,sans-serif;font-family:var(--mermaid-font-family);}#graph-div .branch-label0{fill:undefined;}#graph-div .commit0{stroke:hsl(180, 1.5873015873%, 48.3529411765%);fill:hsl(180, 1.5873015873%, 48.3529411765%);}#graph-div .commit-highlight0{stroke:rgb(133.6571428571, 129.7428571428, 129.7428571428);fill:rgb(133.6571428571, 129.7428571428, 129.7428571428);}#graph-div .label0{fill:hsl(180, 1.5873015873%, 48.3529411765%);}#graph-div .arrow0{stroke:hsl(180, 1.5873015873%, 48.3529411765%);}#graph-div .branch-label1{fill:undefined;}#graph-div .commit1{stroke:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);fill:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);}#graph-div .commit-highlight1{stroke:rgb(93.5483870969, 221.4516129033, 139.677419355);fill:rgb(93.5483870969, 221.4516129033, 139.677419355);}#graph-div .label1{fill:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);}#graph-div .arrow1{stroke:hsl(321.6393442623, 65.5913978495%, 38.2352941176%);}#graph-div .branch-label2{fill:undefined;}#graph-div .commit2{stroke:hsl(194.4, 16.5562913907%, 49.6078431373%);fill:hsl(194.4, 16.5562913907%, 49.6078431373%);}#graph-div .commit-highlight2{stroke:rgb(149.4437086091, 117.6092715231, 107.5562913906);fill:rgb(149.4437086091, 117.6092715231, 107.5562913906);}#graph-div .label2{fill:hsl(194.4, 16.5562913907%, 49.6078431373%);}#graph-div .arrow2{stroke:hsl(194.4, 16.5562913907%, 49.6078431373%);}#graph-div .branch-label3{fill:undefined;}#graph-div .commit3{stroke:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);fill:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);}#graph-div .commit-highlight3{stroke:rgb(99.9811320754, 162.7735849057, 202.0188679245);fill:rgb(99.9811320754, 162.7735849057, 202.0188679245);}#graph-div .label3{fill:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);}#graph-div .arrow3{stroke:hsl(23.0769230769, 49.0566037736%, 40.7843137255%);}#graph-div .branch-label4{fill:undefined;}#graph-div .commit4{stroke:hsl(0, 83.3333333333%, 43.5294117647%);fill:hsl(0, 83.3333333333%, 43.5294117647%);}#graph-div .commit-highlight4{stroke:rgb(51.5000000001, 236.5, 236.5);fill:rgb(51.5000000001, 236.5, 236.5);}#graph-div .label4{fill:hsl(0, 83.3333333333%, 43.5294117647%);}#graph-div .arrow4{stroke:hsl(0, 83.3333333333%, 43.5294117647%);}#graph-div .branch-label5{fill:undefined;}#graph-div .commit5{stroke:hsl(289.1666666667, 100%, 24.1176470588%);fill:hsl(289.1666666667, 100%, 24.1176470588%);}#graph-div .commit-highlight5{stroke:rgb(154.2083333334, 255, 132.0000000001);fill:rgb(154.2083333334, 255, 132.0000000001);}#graph-div .label5{fill:hsl(289.1666666667, 100%, 24.1176470588%);}#graph-div .arrow5{stroke:hsl(289.1666666667, 100%, 24.1176470588%);}#graph-div .branch-label6{fill:undefined;}#graph-div .commit6{stroke:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);fill:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);}#graph-div .commit-highlight6{stroke:rgb(51.331168831, 135.1948051946, 253.6688311688);fill:rgb(51.331168831, 135.1948051946, 253.6688311688);}#graph-div .label6{fill:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);}#graph-div .arrow6{stroke:hsl(35.1315789474, 98.7012987013%, 40.1960784314%);}#graph-div .branch-label7{fill:undefined;}#graph-div .commit7{stroke:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);fill:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);}#graph-div .commit-highlight7{stroke:rgb(206.1818181817, 89.948051948, 241.051948052);fill:rgb(206.1818181817, 89.948051948, 241.051948052);}#graph-div .label7{fill:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);}#graph-div .arrow7{stroke:hsl(106.1538461538, 84.4155844156%, 35.0980392157%);}#graph-div .branch{stroke-width:1;stroke:lightgrey;stroke-dasharray:2;}#graph-div .commit-label{font-size:10px;fill:rgb(183.8476190475, 181.5523809523, 181.5523809523);}#graph-div .commit-label-bkg{font-size:10px;fill:hsl(180, 1.5873015873%, 28.3529411765%);opacity:0.5;}#graph-div .tag-label{font-size:10px;fill:#e0dfdf;}#graph-div .tag-label-bkg{fill:#1f2020;stroke:#cccccc;}#graph-div .tag-hole{fill:#ccc;}#graph-div .commit-merge{stroke:#1f2020;fill:#1f2020;}#graph-div .commit-reverse{stroke:#1f2020;fill:#1f2020;stroke-width:3;}#graph-div .commit-highlight-inner{stroke:#1f2020;fill:#1f2020;}#graph-div .arrow{stroke-width:8;stroke-linecap:round;fill:none;}:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g></g><g class="commit-bullets"></g><g class="commit-labels"></g><g><line class="branch branch0" y2="0" x2="350" y1="0" x1="0"></line><rect transform="translate(-19, -9.5)" height="23" width="53" y="-1.5" x="-69" ry="4" rx="4" class="branchLabelBkg label0"></rect><g class="branchLabel"><g transform="translate(-79, -10.5)" class="label branch-label0"><text><tspan class="row" x="0" dy="1em" xml:space="preserve">main</tspan></text></g></g><line class="branch branch1" y2="90" x2="350" y1="90" x1="0"></line><rect transform="translate(-19, 80.5)" height="23" width="95.15625" y="-1.5" x="-111.15625" ry="4" rx="4" class="branchLabelBkg label1"></rect><g class="branchLabel"><g transform="translate(-121.15625, 79.5)" class="label branch-label1"><text><tspan class="row" x="0" dy="1em" xml:space="preserve">basic-main</tspan></text></g></g></g><g class="commit-arrows"><path class="arrow arrow0" d="M 10 0 L 10 0  10 0 L 60 0"></path><path class="arrow arrow1" d="M 60 0 L 60 70 A 20 20, 0, 0, 0, 80 90 L 110 90"></path><path class="arrow arrow1" d="M 110 90 L 110 90  110 90 L 160 90"></path><path class="arrow arrow0" d="M 60 0 L 60 0  60 0 L 210 0"></path><path class="arrow arrow1" d="M 160 90 L 160 90  160 90 L 260 90"></path><path class="arrow arrow0" d="M 210 0 L 210 0  210 0 L 310 0"></path><path class="arrow arrow1" d="M 260 90 L 290 90 A 20 20, 0, 0, 0, 310 70 L 310 0"></path></g><g class="commit-bullets"><circle class="commit 0-2649c2e commit0" r="10" cy="0" cx="10"></circle><circle class="commit 1-ecceddb commit0" r="10" cy="0" cx="60"></circle><circle class="commit 2-679d9c2 commit1" r="10" cy="90" cx="110"></circle><circle class="commit 3-96c8df4 commit1" r="10" cy="90" cx="160"></circle><circle class="commit 4-dd42098 commit0" r="10" cy="0" cx="210"></circle><circle class="commit 5-8f60d6e commit1" r="10" cy="90" cx="260"></circle><circle class="commit 6-2bb54d7 commit0" r="9" cy="0" cx="310"></circle><circle class="commit commit-merge 6-2bb54d7 commit0" r="6" cy="0" cx="310"></circle></g><g class="commit-labels"><g transform="translate(-28.607812499999998, 25.4859375) rotate(-45, 0, 0)"><rect height="15" width="49.546875" y="13.5" x="-14.7734375" class="commit-label-bkg"></rect><text class="commit-label" y="25" x="-12.7734375">0-2649c2e</text></g><g transform="translate(-28.9521875, 25.794062500000003) rotate(-45, 50, 0)"><rect height="15" width="50.453125" y="13.5" x="34.7734375" class="commit-label-bkg"></rect><text class="commit-label" y="25" x="36.7734375">1-ecceddb</text></g><g transform="translate(-28.6553125, 25.528437500000003) rotate(-45, 100, 90)"><rect height="15" width="49.671875" y="103.5" x="85.1640625" class="commit-label-bkg"></rect><text class="commit-label" y="115" x="87.1640625">2-679d9c2</text></g><g transform="translate(-28.0675, 25.002499999999998) rotate(-45, 150, 90)"><rect height="15" width="48.125" y="103.5" x="135.9375" class="commit-label-bkg"></rect><text class="commit-label" y="115" x="137.9375">3-96c8df4</text></g><g transform="translate(-28.886875000000003, 25.735625) rotate(-45, 200, 0)"><rect height="15" width="50.28125" y="13.5" x="184.859375" class="commit-label-bkg"></rect><text class="commit-label" y="25" x="186.859375">4-dd42098</text></g><g transform="translate(-28.2575, 25.1725) rotate(-45, 250, 90)"><rect height="15" width="48.625" y="103.5" x="235.6875" class="commit-label-bkg"></rect><text class="commit-label" y="115" x="237.6875">5-8f60d6e</text></g></g></svg>

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
10. The IT team has wipe out your hard disk by mistake, clone the repository to your local machine from the address https://github.com/nirgn975/test.git
11. We need to create a new branch (with the name `fix457`) to fix some code, create it a move to it in one command.
12. Merge the `fix457` branch to the current branch you're in right now.

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
10. Use the `clone` command like so: `git clone https://github.com/nirgn975/test.git`.
11. Use the `checkout` command with the `b` flag, like so: `git checkout -b fix457`.
12. `git merge fix457`.

&nbsp;

## 7. Summary

We now know how to see the changes that were made from the last `commit`, how to go back if we regret something we did in a `commit` or the commit message, or even forget to add something to the `commit`.

We upload the project to a remote repository (GitHub in this case), we created new branches, worked with other team members, and merge our code to the `main` branch (we go over a `merge` with no changes in `main` and with one **with** changes in `main`, but not in the same file - we'll talk about it in future chapter).

We definitely learned a lot in this chapter! Don't forget to practice it through your fingers, it's the best way to learn something new. And don't hesitate to ask questions in the comments if something is not clear - I'll do my best to help.
