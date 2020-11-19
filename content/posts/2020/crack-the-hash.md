---
title: "Crack The Hash"
subtitle: ""
date: 2020-11-01T09:00:00+03:00
lastmod: 2020-11-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["crack", "password", "hash", "hashcat", "gcp", "google cloud platform", "white hat", "pen test", "hacking"]
categories: ["hacking"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/crack-the-hash/crack-passwords.webp"
featuredImagePreview: "/posts/2020/crack-the-hash/crack-passwords.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

In earlier post (at [Passive.. Passive Recon.. Passive Reconnaissance.. OSINT!](/2020/06/open-source-intelligence/#6-pivoting)) I mention we can use [hashcat](https://hashcat.net) to try and crack a password we found, but it wasn't the meaning of the post (and it's a red line for me to do that and put his cleartext password on the web for someone who didn't actually try to hack my service).

But in this post we'll learn how to use hashcat to crack passwords, and even do that much faster on the cloud with GCP ([Google Cloud Platform](https://cloud.google.com/)).

&nbsp;

## 1. Request a Quota

First thing you need to do it to request a quota, because by default the quota for GPU on GCP is zero. In this post I'll be using _""NVIDIA Tesla K80"_ GPU, so go to [this](https://cloud.google.com/compute/docs/gpus/#introduction) link and make sure they have this kind of GPU on the zone you want to deploy your VM.

![Available GPU Zones](/posts/2020/crack-the-hash/available-gpu-zones.webp "Available GPU Zones")

In my case I want to deploy the VM on `europe-west1-b`, so we're clear.

## 2. Create the VM

After Google approved your quota, let's build the VM. Go to _"Compute Engine"_ tab on the left side menu in GCP, and then click on the _"CREATE INSTANCE"_ button.

![GCP Compute Engine](/posts/2020/crack-the-hash/gcp-compute-engine.webp "GCP Compute Engine")

Now you'll be redirect to a new page where you can configure your VM. I named my VM `crack-the-hash` and then I choose the the region I got the quota at (in my case `Belgium` and the zone `europe-west1-b`).

The next step is to choose the machine type. In our case we need to choose the _"old"_ series, `N1`, because this is the only one that have the option for GPU. After that choose the machine type itself (I choose the `n1-standard-4` which has 4 vCPU and 15Gb memory, but you can choose which ever you want. Just keep in mind it'll affect the speed a bit).

The GPU is kinda hidden under the `machine configuration` section, you'll see a `CPU platform and GPU` button, click it and an option to choose a GPU will open up. I choose Nvidia Tesla K80, because we're just learning here and I want to keep the costs down

The final step is the boot disk, I choose 30GB SSD and the latest Ubuntu (20.04) LTS - which means we'll install CUDA manually (Google have images with CUDA installed by default, but we're trying to learn here so I choose the longer way).

![GCP Instance Configuration](/posts/2020/crack-the-hash/gcp-instance-configuration.webp "GCP Instance Configuration")

After you're all done, scroll down and click on the _"Create"_ blue button and just wait a couple of minutes until the machine will be created and boot up.

## 3. Install CUDA and Hashcat

After the machine is up and running we need to install [CUDA](https://developer.nvidia.com/about-cuda) first. CUDA is a parallel computing platform and application programming interface model created by Nvidia and [Hashcat](https://hashcat.net/hashcat) is using it.

&nbsp;

## 7. Summary
