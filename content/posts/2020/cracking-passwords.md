---
title: "Crack the hash (password)"
subtitle: ""
date: 2020-10-27T09:00:00+03:00
lastmod: 2020-10-27T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["crack", "password", "hash", "hashcat", "gcp", "google cloud platform", "white hat", "pen test", "hacking"]
categories: ["hacking"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/crack-passwords/crack-passwords.webp"
featuredImagePreview: "/posts/2020/crack-passwords/crack-passwords.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

In earlier post (at [Passive.. Passive Recon.. Passive Reconnaissance.. OSINT!](/2020/06/open-source-intelligence/#6-pivoting)) I mention we can use [hashcat](https://hashcat.net) to try and crack a password we found, but it wasn't the meaning of the post (and it's a red line for me to do that and put his cleartext password on the web for someone who didn't actually try to hack my service).

But in this post we'll learn how to use hashcat to crack passwords, and even do that much faster on the cloud, and much cheaper with [vast.ai](https://vast.ai).

&nbsp;

## 1. Create the VM

We can create a VM with GPU in many of the cloud provider, but [vast.ai](https://vast.ai) is a platform that enable anyone to rent their GPU and basically create a decentralized cloud provider, which resulting in much lower prices (on their website they say they can reduce cloud compute costs by 3X to 5X).

So, the first thing we need to do is to create an account at [vast.ai](https://vast.ai) and confirm it via the email they send after registration. After that is done, let's add a billing method at the _"Billing"_ section under the _"Client"_ in the navigation.

Now, to being able to ssh into the machine we'll rent we need to create an ssh key (or upload your public key if you already created one). To do this


&nbsp;

## 7. Summary
