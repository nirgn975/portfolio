---
title: "New design for the blog!"
subtitle: ""
date: 2020-04-25T09:00:00+03:00
lastmod: 2020-04-25T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["hugo", "design", "blog", "github"]
categories: ["miscellaneous"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/images/logo.webp"
featuredImagePreview: "/images/logo.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---
I'm really excited for this! Don't ask me why because I can't explain it. This is not the first time I make a new design for this blog, it's actually the fifth time! and yet, I feel this is the best one yet. It have everything I ever wanted in my blog.

&nbsp;

## 1. New Design

I can't even start to describe to you how much I feel this design is perfect for this blog. It have all the features I wanted: automatic categories and tags, content section in the posts, comments system that isn't sell your privacy and take forever to load (yes disqus I'm looking at you!), and dark mode! Ohh dark mode (It's not for everyone, I know, that's why it's optional).

Let's break it down

### 1.1 Navigation

The navigation at the upper right side of the website contains all the configuration and links of the website.

![Navigation](/posts/2020/new-design-for-the-blog/navigation.webp "Navigation")

#### 1.1.1 Posts

The [Posts](/posts) page will have all of the posts of the blog, it'll be ordered by year and will show the title of the post and the date it was published. This is the simplest way to go over old posts and just browse them.

#### 1.1.2 Tags

Every post will have a list of tags, basically the main topics the post is about. The [Tags](/tags) page will host all of those tags. This way you can glance on all of the topics I write about and click on one of them and get a list of the posts that have that tag. This is really a great and easy way to search for a post topic.

#### 1.1.3 Categories

In Contrast to the Tags page the [Categories](/categories) page contains a list of all the posts divided by categories that I set in advance, each post can be in only one category so this is me trying to categorize all the posts by topics that I think are related and I want to explore (or maybe even write s series of posts about a single thing).

#### 1.1.4 About

The [About](/about) page is a simple one, it's just one static page with some information about me and the history of the blog. If you want to contact me, there is couple of ways to do that and it's all in there.

#### 1.1.5 GitHub Link

[GitHub](https://github.com/nirgn975) is the main platform I'm on right now (and [twitter](https://twitter.com/nirgn975)), it's the most important one because it's store all of my projects (work and private ones), my code examples, etc. And it makes sense to expect that I will direct readers there during the posts, so it's handy to have a direct link.

#### 1.1.6 Search

In time our blog will have a lot of posts. This will create a problem for new people who just came across this blog and went to search for a specific post related to a specific subject. To solve this problem I use [algolia](https://www.algolia.com/) to provide a web search through a SaaS model. That way I keep the blog lean and static like I want to (I can focus on creating content and not features) while provide superhero powers!

#### 1.1.7 Dark Mode!

People that know me, know how much I love dark mode! I can't explain it, it's just easier on my eyes. I loved the old design of the blog, but not having a dark mode was a major bug. So the new design solved this by implement a tiny button on the top right corner to toggle between light and dark mods.

This was a big motivation boost for me to move on from the old design. The toggle don't just add dark mode, it enable the option to choose for each user what is better for him/she, which is super important to me.

&nbsp;

### 1.2 Post

In the beginning of the old design I just have a title, text, pictures and code blocks. After some time I added the publish date of the post and how much time (approximately) it'll take to read the post (based on the number of words). In this new design we keep those features but add a content table to the right of the post, the category the post belong to, the tags list at the bottom of the post, and much needed share buttons for easy sharing via social media.

In the technical side of the post I added a few futures that will help me write better readable text, for example [KaTeX](https://github.com/KaTeX/KaTeX) to render TeX math on the screen and [mermaid](https://github.com/mermaid-js/mermaid) to generates diagrams and flowcharts.

&nbsp;

### 1.3 Comments

When I moved from blogger and then tried Wordpress for a bit, I had a comment system in place. But when I moved to static sites for a while I didn't have any comment system and I was missing that. Missing the interactions and the user that tried for themselves the things I wrote about and got some errors and needed help. I know I need help somethings when the documentation of a project isn't clear enough.

So after a while I implement [disqus](https://disqus.com/) but it was out of necessity. I didn't like it because it has a lot of privacy issues, it was really slow and the user couldn't make an anonymous comment (they force you to login via one of the social networks login buttons or sign up and open an account in their website).

&nbsp;

A new design make a new opportunity to change all of that! I searched for days for the best commenting system for static websites that will keep the user privacy, let the user make an anonymous comment, and will be beautiful and easy to use. And I think i found it! [commento](https://www.commento.io/) is (in my research) the best there is out there right now, it fulfills all my requirements and more.

![commento.io Platform](/posts/2020/new-design-for-the-blog/commento-io-platform.webp "commento.io Platform")

&nbsp;

## 2. New language

The hardest decision I had to make is to move to English or stay in Hebrew. The user base in Hebrew is very small, but there is something spacial and important in making quality content available to all (and by all I mean people how don't know Enligsh as a second language). And I did do that for years. But it's time to grow, my perspective has changed and I now think it's a must to at least be comfortable to read in English if you want to be successful in tech. I want to believe this will not be an issue to my Israeli readers and from now I'll start writing in English (I think it have a big part of my excitement).

English is not my native language (Hebrew is) so don't expect perfect. But I think I'm good enough to make it readable and I'm sure it'll get better over time, so bear with me.

&nbsp;

## 3. Summary

So the new design of the blog is beautiful, useful, and I'm very excited to move to writing posts in English.

I have a lot of great ideas for new posts and I can't wait to start writing them. Here is a little glimpse for one of them: a series of posts to build a little Twitter clone website with a live GitHub repo that will update at any post (so you could jump and `checkout` to the relevant post if you want), and in production level (deploy it to the [Google cloud](https://cloud.google.com/), monitor, backups, etc). We'll plan our architecture together, write a list of features (based on the real Twitter), build the client ([Angular](https://angular.io/)) and the server ([Node.js](https://nodejs.org)), write tests, build CI/CD with GitHub actions and GCP tools, and use [Docker](https://www.docker.com/) and [kubernetes](https://kubernetes.io/) for deployment at scale. All of that step by step, it'll be fun!

There is a lot to wait for! (;
