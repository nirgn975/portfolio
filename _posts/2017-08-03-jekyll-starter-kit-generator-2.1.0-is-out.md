---
title: Jekyll Starter Kit generator 2.1.0 is out!
author: nirgn
layout: post
summary: "Creating Jekyll progressive web apps has never been easier"
category: Development and Contribution
---
<div style="direction: ltr;" markdown="1">
<div style="direction: rtl;" markdown="1">
פוסט זה פורסם במקור ב [medium](https://medium.com/@nirgn/jekyll-starter-kit-generator-2-1-0-is-out-5e2efd2311d9).
</div>

> Creating Jekyll progressive web apps has never been easier

<div style="text-align: center;">
  <img src="/images/posts/jekyll-starter-kit-generator-2.1.0-is-out/jekyll-starter-kit.png" alt="Jekyll Starter Kit">
</div>

<!--more-->

&nbsp;

### Jekyll Starter Kit

First thing first, for those of you who has yet to hear about the Jekyll Starter Kit generator, it’s a [Yeoman](http://yeoman.io/) generator for creating [Jekyll](https://jekyllrb.com/) projects or really Jekyll static websites.

It’ll create for you the default Jekyll website template, with all the best practices from [Google Web Starter Kit](https://github.com/google/web-starter-kit), all the things you need for your website to be a PWA (progressive web app), and some more cool stuff.

What more cool stuff? Here are couple of examples.

* You can write [pug](https://github.com/pugjs/pug) instead of HTML.
* You can use CSS or SASS or SCSS.
* Automagically minifies HTML, and automagically autoprefixing CSS.
* You can choose to write ES2015 with [babel](https://github.com/babel/babel).
* Concatenate and minify JavaScript.
* Built-in preview and auto update with BrowserSync.
* Automagically generates a service worker for your website for offline support.
* Test the website against [lighthouse](https://github.com/GoogleChrome/lighthouse) and fail Travis-CI if the score is below 80.
* Automagically optimizes image before deploy.
* Deploy the website to gh-pages or firebase with only one command.

<div style="text-align: center;">
  <img src="/images/posts/jekyll-starter-kit-generator-2.1.0-is-out/the-generator-in-action.png" alt="The generator in action">
</div>

If you can’t wait and already want to try it, all you need to do is `npm install -g generator-jekyll-starter-kit` and then just `yo jekyll-starter-kit`. And if you want to help improve this project, just head up to the [repo page on GitHub](https://github.com/nirgn975/generator-jekyll-starter-kit).

&nbsp;

### What’s new in version 2.1.0?

Not much actually. The project is pretty stable with more then 1k uses (through [npm](https://www.npmjs.com/) statistics). But some of the things we do for version 2.1 (from 2.0) is update dependencies, fix a small bug when the website output directory wont be removed before building the project, fix a small bug when deploy to gh-pages, switch from coverall to codecov (by the way the project has 100% coverage!), edit output `README.md` file with more clear instructions, and add a default favicons.

&nbsp;

### Summary

If you try to use it and need some help or just want to talk with the community (or with me), we have a [gitter chat room](https://gitter.im/jekyll_starter_kit/Lobby). And if you would like to help make this generator better, you’re awesome! Go to the [Want to help](https://github.com/nirgn975/generator-jekyll-starter-kit#want-to-help) section in the README and start from there.

</div>
