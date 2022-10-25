---
layout: "../../../layouts/BlogPost.astro"
title: "Change your email in GitHub"
pubDate: 2022-08-01T09:00:00+03:00
draft: true
author: "Nir Galon"
authorLink: "/about"

tags: ["raspberry pi"]
category: "tutorials"

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2022/raspberry-pi/raspberry-pi-hero.webp"
---

When you change your email on GitHub you loss all your commits that were made with the old email - they no longer been counted in your `contributions heat map`.

![contributions heat map](/posts/2022/github-email/contributions-heat-map.webp "contributions heat map")

```
git filter-branch -f --tag-name-filter --commit-filter '
if [ "$GIT_AUTHOR_EMAIL" = "nir@galon.io" ];
then
  GIT_AUTHOR_EMAIL="nir@galons.io";
  git commit-tree "$@";
else
  git commit-tree "$@";
fi' HEAD
```
