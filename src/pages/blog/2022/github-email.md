---
layout: "../../../layouts/BlogPost.astro"
title: "Change your email in GitHub"
pubDate: 2022-10-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "/about"

tags: ["github", "private email", "domain"]
category: "tutorials"

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2022/github-email/google-email.webp"
---

Once in a lifetime a man changes his email address. Maybe you didn't changed your email even once, I completely understand you, but I did. And let me tell you - it's not an easy process!

## 1. Why did I do it?

I have a private domain and I used it with Gmail to have a private email address. But Google don't give you the option to setup a private domain because they'll lose a lot of small business that uses [Google workspace](https://workspace.google.com). So I setup a "small business" with the domain and paid Google a few dollars every month.

But then I got married and setup my wife her own custom email address and add a few more dollars to Google every month. And after couple of years, my first child was born, and I thought to myself - when I'll setup their email in the future I'll also had to pay for their user every month. And I started to realise that in a few years I'll set myself up to pay Google hundreds of dollars every year for an email address (I also pay a yearly fee for the domain).

But it's 2022 - an email address is basicly free noewdays. It doesn't make sense to me. And then Apple announced iOS 15, and one of the featres was "Custom Email Domain with iCloud Mail"! And I already subscribed to iCloud+, and uses iPhone and Mac, so it was a no brainer!

&nbsp;

## 2. Apple

I was a Mac and iPhone user and I used Google services, but iOS 15 and iOS 16 changed this. Apple catched up to most (if not all) the major features in Mail, Calendar, and Drive (they have a few more in Photos, and they're already better in Reminders IMO). But they even did a few more steps ahead with [Hide my Email](https://support.apple.com/en-om/guide/icloud/mm9d9012c9e8/icloud) and [Private Relay](https://support.apple.com/en-us/HT212614). So it was time to move all of my life (Mail, Calendar, Drive, and Photos) to Apple, and to make this procees a little easier for me I started with a fresh email address (so I'll not lose the old account for a little longer).

The first thing I did is to go over my [1Password](https://1password.com) login list and enter to all the services and change their email address (or delete the account if I didn't actually use the service, so it was actually a good time to clean things. You'll be surprised to how many services you're register over the years).

&nbsp;

## 3. GitHub

Everything was going according to plan, but little did I know that when you change your email on GitHub you loss all your commits that were made with the old email - they no longer been counted in your contributions heat map!

![GitHub Contributions Graph](/posts/2022/github-email/github-contributions-graph.webp "GitHub Contributions Graph")

So I wrote a command line script to change the commits author email. But before we continue I do have to warn you about a few things

1. **This action changes some of the history commit's fields. Be very careful to how you run it and on which repositories**.
2. Note that you'll need to have full access to the `main` branch to run this script.
3. Be aware that the commits that do change will change their sha, so if you have tags that links to that sha's - they'll no longer link to the right commit (you can change the tag sha by create it again, and you can set the same date when you create it).

```bash showLineNumbers title=" "
git filter-branch -f --commit-filter 'if [ "$GIT_AUTHOR_EMAIL" = "<OLD_EMAIL_ADDRESS>" ]; then GIT_AUTHOR_EMAIL="<NEW_EMAIL_ADDRESS>"; git commit-tree "$@"; fi' HEAD
```

All you have to do is to replace `<OLD_EMAIL_ADDRESS>` and `<NEW_EMAIL_ADDRESS>` with your old email address and new email address respectively, and run this bash command in everyone of the repositories you want to change your email address in (and then `git push --force origin main` to change the commints history in GitHub and not just on your local git).

&nbsp;

## 4. GitHub private email addresses

There is one thing I'll recommand GitHub users do to not relay on their email address in their commits, and that's using [GitHub private email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address) (it'll also keep your email private from GitHub emails to others and from people who search your repos commit history to find you email address).

So, GitHub have a feature called _"Keep my email address private"_ where they let you use a noreply email address from GitHub as your commit email address. To use your noreply email address for commits you push from the command line, use that email address when you set your commit email address in Git. To use your noreply address for web-based Git operations just set your commit email address on GitHub and choose _"Keep my email address private"_ in the settings (screenshot below).

![GitHub Private Email Settings](/posts/2022/github-email/github-private-email.webp "GitHub Private Email Settings")

&nbsp;

## 5. Summary

So I would recommand everybody to use GitHub _"Keep my email address private"_ feature, and if you want to change your old commits email to your new `noreply` email address from GitHub - use the bash command I created (don't forget to replace `<OLD_EMAIL_ADDRESS>` and `<NEW_EMAIL_ADDRESS>`).
