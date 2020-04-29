---
title: "Simple Twitter - Chapter 3: Started Coding"
subtitle: ""
<!-- date: 2020-07-05T10:00:00+03:00 -->
date: 2020-03-05T10:00:00+03:00
lastmod: 2020-07-05T10:00:00+03:00
draft: true
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["twitter", "development", "angular", "angular cli", "node.js", "express", "git", "workflow", "github", "github actions", "nodemon", "lint", "unit tests", "coverage", "codecov"]
categories: ["development"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/images/posts/2020/chapter-3-simple-twitter/simple-twitter-cover.webp"
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: false
license: ""
---

In this chapter we're going to open a new repository on GitHub and commit everything to it. We will learn about issues, pull requests (PR), branches, etc. And talk about the way we're going to work with GitHub for the rest of the series. We'll also start a new [Angular](https://angular.io/) application with [Angular CLI](https://cli.angular.io/), create the backend project with [Node.js](https://nodejs.org) and the [express](https://expressjs.com/) framework, and install all the packages we'll need for the client and backend.

&nbsp;

## 1. GitHub Workflow

There are a lot of workflows out there for software development, but 2 of them are the most popular in the git world. The first is [git-flow](https://nvie.com/posts/a-successful-git-branching-model) written by Vincent Driessen back in 2010. The second one, and the one we'll be using is [GitHub flow](https://guides.github.com/introduction/flow).

The reason we choose Github flow instead of git-flow lies in what we build, a web app. We'll not have "releases", not roll back changes, and not support multiple versions of our software. This is because we'll have a [CI](https://en.wikipedia.org/wiki/Continuous_integration)/[CD](https://en.wikipedia.org/wiki/Continuous_delivery) that will automatically run tests and deploy our changes to production.

It'll probably be a bit wired to work by GitHub flow when we're working alone on the project. But it will keep our `master` branch clean, and it's important for you to know this workflow and get used to it, because this is how you'll work in a team and in an open source project.

So, every project have a `master` branch. This is the main branch, the production branch. It's a regular branch, nothing fancy about it, it's just called `master` (we actually can call it however we want, but this is the naming convention). And when we have a feature, idea, bug, etc we open an issue for it. In the issue we describe the problem, what we're going to do, maybe write some ToDos, upload a picture, discuss about it with other team members, and when we're ready to start working on it we create a branch.

Like we already said, a branch can be called anything, but it's got to be unique in the repo (you cannot have 2 active (not deleted) branches with the same name), and naming things is one of the hardest problems in computer science, so I love to just called it be number, the number of the GitHub issue, because it's also unique in the repo (an increasing number).

When we create a branch in your project, we're creating an environment that don't affect the `master` branch, so we're free to experiment and commit changes, safe in the knowledge that our branch won't be merged until it's ready.

{{< admonition type=info title="Pro Tip" open=true >}}
Branching is a core concept in Git, and the entire GitHub flow is based upon it. There's only one rule: anything in the `master` branch is always deployable. Because of this, it's extremely important that our new branch is created off of master when working on a feature or a fix.
{{< /admonition >}}

Once our branch has been created, it's time to start making changes. Whenever we add, edit, or delete a file, we'll make a commit, and adding the changes to our branch. This process of adding commits keeps track of our progress as we work on a feature branch.

{{< admonition type=info title="Pro Tip" open=true >}}
Commits also create a transparent history of out work that others can follow to understand what we've done and why. Each commit has an associated commit message, which is a description explaining why a particular change was made. Furthermore, each commit is considered a separate unit of change. This lets you roll back changes if a bug is found, or if we decide to head in a different direction.
{{< /admonition >}}

Pull Requests initiate discussion about our commits. We can open a Pull Request at any point during the development process: when we have little or no code but want to share some screenshots or general ideas, when we're stuck and need help or advice, or when we're ready for someone to review our work.

In our case, we're going to open a new Pull Request (PR) right after the first new commit in our new branch (all we need to open a PR is just one change, so right after the first commit we have a change and we can open it). This is a good practice, it let others see the direction and progress we are making.

In a real world environment we'll probably have a CI/CD that will deploy our branch to a test environment so we can test our changes before merge them to `master`, in our case we'll settle just for passing the tests. Every commit we'll push on our branch will trigger a GitHub action *workflow* that will build our project, run tests and check the coverage of our tests. This is another good reason to push commits as early and as often as possible.

When we'll finish the feature, bug, etc another team member will probably review our code (assuming our tests pass and everything is green). In our case we'll do it to ourselves. Once we're sure everything is good we'll *squash and merge* our branch to `master` branch, this will close our PR and our issue (that's good because we no longer have a need for them).

And then in our local machine we'll `checkout` to `master` branch, and `pull` the changes we just merge to the remote (GitHub) `master` (usually called `origin`), and the cycle will start all over again with a new issue (feature, bug, etc).

{{< admonition type=info title="Pro Tip" open=true >}}
Once merged, Pull Requests preserve a record of the historical changes to your code. Because they're searchable, they let anyone go back in time to understand why and how a decision was made.
{{< /admonition >}}

Once our web apps are use in production we'll sometimes need to do a quick bug fix, assuming it's an emergency (all hell break loss in our production site) we'll not want to go over the whole process, we'll just want to add one commit to the `master` branch, and that's it, a really quick fix to fix some production issue.

This will not happen often (assuming we're working correctly, writing test, doing peer code review, etc) but sometimes it will, in those cases we'll just push a commit or two to `master` and then will have to `merge` `master` branch to our PR branch so that they will by in sync and to resolve code conflicts that emerge during the quick fix.

This is how the whole process will look like on our `git log`:

{{< mermaid >}}
gitGraph:
options
{ "nodeSpacing": 150, "nodeRadius": 10 }
end
    commit
    branch feature
    checkout feature
    commit
    commit
    checkout master
    commit
    merge feature
{{< /mermaid >}}

&nbsp;

## 2. Scaffolding Basic Client

Now that we know how to work with git and GitHub are going to open our client repository and scaffold our frontend project. The first commit will be on `master` (without an issue and a pull request), because when we are open a PR it need a *base* branch to merge it to, and when we first open a repository we don't have and branch.

### 2.1 Create A Repository

So let's start by open a new repository on GitHub, we can do it by pressing on the `+` sign in next to our profile picture, and then choose *New repository*

![Open a New Repository](/images/posts/2020/chapter-3-simple-twitter/new-repository.webp "Open a New Repository")

After that we'll be redirect to a new page when we need to fill some basic information about our repo. The name I choose for the repo is `simple-twitter-client` and it'll be a `public` repo, other then those you can leave everything as is and press on the big green button that says *Create Repository*.

### 2.2 Scaffold an Angular Project

In *Simple Twitter - Chapter 1: Setup* we installed the [Angular CLI](https://cli.angular.io), now we're going to use it. Let's open our terminal on our local machine, I'm using [Hyper](https://hyper.is/) but you can use which ever terminal you used to, and navigate to the directory we want our project to be in (in my case it'll be a `web` directory in home).

```shell
cd web
```

Once we're in the desirable directory we will create a new Angular project, using the [Angular CLI](https://cli.angular.io). To do that we use the `new` command and after it give the name of the project (will be the name of the repo we created). After the Angular CLI start to work it'll ask us a bunch of questions, and we'll answer `y` to the routing one (yes we want the cli to add a routing file for us) and we'll choose [SCSS](https://sass-lang.com/) for the stylesheet (don't worry if you don't know `scss`, it's just like `css` but with superpowers. We'll go over them when we'll start coding).

```shell
ng new simple-twitter-client
```

![Create a new project](/images/posts/2020/chapter-3-simple-twitter/ng-create-a-new-project.webp "Create a new project")


Once the cli stop working we can see (with the `ls` command) that he created a new directory for us (with the name we gave it earlier). Let's navigate inside it (with the `cd` command), and, again, list the files inside the directory we're in (with `ls` command, but now let's use the `-a` flag to also see all of the hidden files - files and directories that start with `.` and by that not listed = hidden, in our file explorer).

![List all the files and directories](/images/posts/2020/chapter-3-simple-twitter/list-files-ng-directory.webp "List all the files and directories")

We can see there is a git directory called `.git`. This directory hold all of the git stuff for our project, it's like a mini database with a log of all the commits and changes we do. Angular CLI created it for us, but it doesn't know our GitHub repository, we need to manually let our git know about it. So let's head back to the GitHub repo, and there we can see couple of instructions, we'll use the *…or push an existing repository from the command line* one.

![Our Newly Created Repo](/images/posts/2020/chapter-3-simple-twitter/empty-repo.webp "Our Newly Created Repo")

{{< admonition type=warning title="Pro Tip" open=true >}}
If you haven't setup you SSH key on GitHub yet, [generating a new SSH key](https://help.github.com/en/enterprise/2.17/user/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#generating-a-new-ssh-key) and then [add it to your GitHub account](https://help.github.com/en/enterprise/2.15/user/articles/adding-a-new-ssh-key-to-your-github-account). Now you can clone and push to repos with ssh (you can also do it with `https` but you'll need to enter your password every time).
{{< /admonition >}}

add origin

commit "init"

push to master

### 2.3 Install additional modules

create an issue

Install ngrx

install material

### 2.4 Some basic stuff

core module

basic scss style

### 2.5 Tests

github action to run lint and tests

### 2.6 Last things

add codecov

add badges to readme

&nbsp;

## 3. Scaffolding Basic Server

something

typescript, express, nodemon, .env, dummy data import, github action to run lint and tests, add codecov, add badges

&nbsp;

## 4. Summary
