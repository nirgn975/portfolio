---
title: "Like A Spy With Hak5 Toys"
subtitle: ""
date: 2020-09-01T09:00:00+03:00
lastmod: 2020-09-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["", "", "screen crab", "key croc", "cloud c2", "hacking", "hak5", "white hat"]
categories: ["hacking"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/like-a-spy-with-hak5-toys/spy-cover.webp"
featuredImagePreview: "/posts/2020/like-a-spy-with-hak5-toys/spy-cover.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

One of the things you always see in spy movies is how the main character plant a covert device to monitor the user computer (screen and keystrokes). As a kid I thought "This is very cool!", and I always wanted be able to do this. [Hak5](https://hak5.org) making it very easy to accomplish with a combination of couple of their ~~toys~~ tools.

What we'll do is to connect 2 devices, the [screen carb](https://shop.hak5.org/products/screen-crab) to see the user screen (video stream, in real time), and a [key croc](https://shop.hak5.org/products/key-croc) to key log the user keystrokes.

&nbsp;

## 1. C2 Cloud

Before we even start to mess around with the physical toys, let's create a C2 Cloud instance on the cloud. You can do it on your local machine, but let's pretend this is a real operation and in a real environment we don't want the target to connect directly to our machine and we don't want to expose our local machine to the internet.

> Cloud C2 is a self-hosted web-based command and control suite for networked Hak5 gear that lets you pentest from anywhere.

I chose to do it in [digitalocean.com](https://digitalocean.com) because they're easy, cheap and I love their community and open source support. So, their VPS called `droplets`, after you registered and confirmed your email, you'll see it at the top of the left side menu. When you're at the [droplets page](https://cloud.digitalocean.com/droplets) you'll have a _"Create Droplet"_ button right at the center of the page (if you don't have any, if you already have some, you'll see it as a green button at the top of the page).

We'll choose an Ubuntu distribution, a basic plan (shared cpu, the $5/month should do the job), and add a volume (I chose to add 20GB, I think it'll be enough for all the loot). Now you can choose whichever datacenter region you want, and don't forget to add you SSH key.

![My digital ocean droplet configuration](/posts/2020/like-a-spy-with-hak5-toys/digital-ocean-create-droplet.webp "My digital ocean droplet configuration")

We have two ways to create the C2 instance, use the instance public IP (your droplet will receive one right after it will start) as a `hostname` or use a DNS name. I'll use the DNS name way, so we can add https support with [Let's Encrypt](https://letsencrypt.org). If you choose to do this the way I do it, you'll need a domain. I'll use `cloud-c2.dev`, and I'll create a custom DNS A record, so [https://cloud-c2.dev](https://cloud-c2.dev) will point to the instance public IP.

![Google Domains custom record](/posts/2020/like-a-spy-with-hak5-toys/google-domains-custom-record.webp "Google Domains custom record")

You'll need to wait a little (probably couple of hours) to let the DNS propagation to finish, plus [Let's Encrypt](https://letsencrypt.org) DNS seems to take a little bit longer then the Google ones (keep it in mind in case you encounter `TLS handshake error from **** acme/autocert: missing certificate` error).

To download the [c2 community edition from hak5](https://shop.hak5.org/products/c2#c2-versions) you need to choose _"FREE DOWNLOAD"_ and then to checkout, at the end of the checkout process you'll get an email with the download link and a license key, save it somewhere safe.

![Hak5 C2 Email](/posts/2020/like-a-spy-with-hak5-toys/c2-email.webp "Hak5 C2 Email")

Lets finish our droplet setup by opening the relevant ports. Click on the _"Networking"_ tab at the left menu, and from there go to the _"Firewalls"_ page. Click on _"Create Firewall"_ button, give it a name and add couple of inbound roles:

- Port `2022` so the Hak5 gear will be able to communicate with our C2.
- Port `443` so we can open our C2 dashboard in the browser with SSL/TLS.
- Port `80` so [Let's Encrypt](https://letsencrypt.org) can validate the the domain and put back the certificate.

![My Digital Ocean firewall configuration](/posts/2020/like-a-spy-with-hak5-toys/digital-ocean-firewall.webp "My Digital Ocean firewall configuration")

Don't forget to add our droplet in _"Apply to Droplets"_ input, right before the green _"Create firewall"_ button at the bottom.

Now the fun part begins, let's ssh to our server (replace `<DROPLET-IP>` with your droplet ip, in my case it's `165.227.156.17`).

```bash
$ ssh root@<DROPLET-IP>
```

![SSH into droplet](/posts/2020/like-a-spy-with-hak5-toys/ssh-to-droplet.webp "SSH into droplet")

And install the `unzip` package so we can unzip the `zip` file we'll download with all the edition for Windows, Mac and Linux of C2 from Hak5.

```bash
$ sudo apt install unzip
```

Now let's build a command to download the c2 (you can get the download URL from the email), save the file in the name `c2.zip`, unzip it, and run the relevant binary for our OS with the `hostname` point to our domain, and the `https` flag so [Let's Encrypt](https://letsencrypt.org) will automatically create a certificate for us.

```bash
$ wget https://c2.hak5.org/download/community -O c2.zip && \
unzip c2.zip && \
./c2_community-linux-64 -hostname cloud-c2.dev -https
```

The first time C2 runs, a database file is generated (named `c2.db` by default) in the same directory as the C2 binary. In that first run you'll see it print a _"Setup token"_, copy it, we'll need it to continue the setup process.

![First C2 Run](/posts/2020/like-a-spy-with-hak5-toys/c2-is-running.webp "First C2 Run")

Now, when we head over to [https://cloud-c2.dev](https://cloud-c2.dev) we can see the initial setup of C2. Now you'll need that setup token that the C2 generated in the first run, and also the license key.

![Cloud C2 initial setup](/posts/2020/like-a-spy-with-hak5-toys/cloud-c2-initial-setup.webp "Cloud C2 initial setup")

&nbsp;

## 2. Screen Crab

Something..

&nbsp;

## 3. Key Croc

Something..

&nbsp;

## 4. Summary

something..
