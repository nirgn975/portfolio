---
layout: "../../../layouts/BlogPost.astro"
title: "Hugo Theme With Developer Focus In Mind"
pubDate: 2021-01-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "/about"

tags: ["hugo", "theme", "contribution", "dark mode", "generate", "optimization", "performance", "accessibility", "best practices", "seo"]
category: "contribution"

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2021/hugo-theme-with-developer-focus-in-mind/hugo-logo-wide.webp"
---

Lately I was redesign [my own resume website](http://nir.galon.io). I consider it version 4 of the website, because it's the fourth major change I did to it. This website is running for quite a few years now, and every now and then I want to change the underline technology that I use or redesign it, so I spend a weekend and do it.

This time I also wanted to change the design, but not that drastically. The main things wanted to change are the underline template generator (from [Jekyll](https://jekyllrb.com) to [Hugo](https://gohugo.io)), because I already use Hugo in my blog and I just love it. But I also wanted to add 2 sections that I never saw in any template (and I searched a lot because at first I didn't want to put the time and develop it myself): first is GitHub repos (projects) I want to highlight in my resume. The second section is for the blog, automatically get the latest posts in there.

So, I spent the weekend and did it. I was very pleased wit the results. So much pleased that I thought other people will also want this design and features in their own resume website.

&nbsp;

## 1. Hugo Theme

It took me some time to really sit down and do it, but I finally did it. I convert my own resume website to a Hugo theme and I [eating me own dog food](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) - My own resume website uses it, you can check the [source code](https://github.com/nirgn975/resume).

I call the theme **[devRes](https://github.com/nirgn975/devRes)**.

![devRes Mockups](/posts/2021/hugo-theme-with-developer-focus-in-mind/devres-mockups.webp "devRes Mockups")

To see this theme in action (without my own content), here is a [live demo](https://nirgn975.github.io/devRes) site which is rendered with this theme and some content for documentation.

There are a lot of other great features that this theme have, like:

- Responsive layout.
- Light / Dark mode.
- Generate GitHub project cards automatically from a repo name.
- Automagically get the latest posts from your blog.
- Use [Font Awesome](https://fontawesome.com) or [Devicons](https://devicon.dev) icons.
- Support [Google](https://analytics.google.com/analytics) and [Plausible](https://plausible.io) analytics.
- Optimized for Performance, Accessibility, Best Practices, and SEO: 90+ (out of 100) on mobile and desktop in [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) (lighthouse).
- CDN for all third-party libraries supported.
- Automated contact form with [formspree](https://formspree.io) and [getform](https://getform.io).

&nbsp;

## 2. Getting started

If you want to use this theme, it can't get any easier then this. All you need to do is to install [Hugo](https://gohugo.io), create a new website, and clone this theme as a submodule

```bash
$ brew install hugo
$ hugo new site myownresume
$ git submodule add git@github.com:nirgn975/devRes.git themes/devRes
```

Now all you have left to do is just add it as a theme in your `config.toml`

```toml
theme = "devRes"
```

You can look at the [exampleSite](https://github.com/nirgn975/devRes/tree/main/exampleSite) to check out the `config.toml` and the `data/content.yaml` for examples.

### 2.1 Customization

Your resume content should be added in the `data/content.yaml` file.

If you want to change the theme colors, just do it in the `config.toml` file.

And lastly your favicons should go in an `icons` directory inside `static`. You can easily generate them with [realfavicongenerator](https://realfavicongenerator.net), and set theme-color and background-color in `browserconfig.xml` and `site.webmanifest`.

### 2.2 Want to help?

Great! All issues and pull requests are welcome.

For local development just start [hugo](https://gohugo.io) with `exampleSite` as the source.

```bash
$ hugo server --source=exampleSite -v --gc
```

&nbsp;

## 3. Summary

The project will get into the showcase at Hugo - an issue has been opened and all the checks are green.

I really hope you find it useful and if you ever use it or just play with the theme, I’ll be thrilled to get a link or just hear from you. If you have any issues or any questions feel free to open a [new discussion at GitHub](https://github.com/nirgn975/devRes/discussions).
