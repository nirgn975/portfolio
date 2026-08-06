---
title: "Jekyll Starter Kit generator 3.x.x"
description: "The Jekyll Starter Kit generator jumps to version 3.x.x after Jekyll 4."
image:
  src: /posts/2020/jekyll-starter-kit-generator-3.x.x/github-social-coding.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2020-09-01
badge:
  label: open source contribution
---

First thing first, I want to send virtual thanks, gratitude and hugs to all the people that star, download, use, and contribute the project! This is huge for me, you don't know how much it affects and keeps me going. Thank you!!

And for those of you who has yet to hear about the Jekyll Starter Kit generator, it’s a [Yeoman](http://yeoman.io/) generator for creating [Jekyll](https://jekyllrb.com/) projects with PWA support and a lot more best practices stuff.

&nbsp;

## 1. Contribution

I want to call all of you who have an idea for a new feature, who have the general eagerness to contribute to open source, and the ones who have never contributed to open source. This is an easy project to get in to, and it's a pretty small codebase.

If you're new to GitHub, contribution, or even JavaScript, I would be happy to help you get started!

![Social Coding](/posts/2020/jekyll-starter-kit-generator-3.x.x/hello-world.webp){ width="732" height="138" .rounded-lg .mx-auto }

## 2. Jekyll Starter Kit 3.x.x

So, what's new in version 3 is about? And why the hell we jump from 2.3.2 to 3.x.x?

Honestly there haven't been much to improve, the project is very stable and is working for quite some time now. The reason we jump from version 2.x.x to version 3.x.x is because [Semantic Versioning](https://semver.org/). By this standard we have to bump the major when our project introduces breaking changes, and when [Jekyll](https://jekyllrb.com/) updated its project to version 4 they made some breaking changes (changes that force you to manually change things to be compatible with).

So when I updated the [Jekyll Starter Kit](https://github.com/nirgn975/generator-jekyll-starter-kit) to use Jekyll version 4, I also introduced some breaking changes, to mark this in the version number I bump the major from 2 to 3.

&nbsp;

### 2.1 The Jekyll update is a major change! But what else we have done?

- npm bought [nsp](https://github.com/nodesecurity/nsp) and incorporated it into `npm audit`. So we moved our security check to use `npm audit --audit-level high` before every publish of a new release.
- We removed [Travis-CI](https://travis-ci.org/) and moved to [GitHub actions](https://github.com/features/actions) for our CI. I think it's much easier to write and you don't need to sign in to yet another service, so it's a win win. We also add support for node version 12 in the CI and remove version 8.
- We also publish the package to [GitHub registry](https://github.com/features/packages) in addition to [npm](https://www.npmjs.com/package/generator-jekyll-starter-kit).
- All those changes break couple of badges in the `README.md` file, so we fix them and add a contribute badge so everyone will know this package is actively maintained (and this badge is good for one year, so if I stop maintaining this project it will automatically say it's not maintained).
- Update all of the dependencies and add the [dependabot](https://dependabot.com/) to automate the dependencies update process. And now that we have all the tests and a full CI system on GitHub actions, it's easier and more automated than ever! You can be sure the project will be up to date without any 1-day security issues.
- To make life easier for the contributors we added Issues and Pull requests templates. We also created `CODE_OF_CONDUCT` file.

&nbsp;

## 3. Summary

The project has been updated, maintained, bugs are squashed and everything is looking good and work great! I'm really happy with its current situation.

Just one more thing. If you ever used or try this project, I'll be thrilled to get a link or hear from you how you use it, and what it helps you accomplish. I want to hear about your issues and how this project can help you solve them.
