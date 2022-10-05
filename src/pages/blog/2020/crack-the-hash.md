---
layout: "../../../layouts/BlogPost.astro"
title: "Crack The Hash"
date: 2020-11-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "/about"

tags: ["crack", "password", "hash", "hashcat", "gcp", "google cloud platform", "white hat", "pen test", "hacking"]
category: "hacking"

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/crack-the-hash/crack-passwords.webp"

toc:
  enable: true
math:
  enable: false
---

In earlier post (at [Passive.. Passive Recon.. Passive Reconnaissance.. OSINT!](/2020/06/open-source-intelligence/#6-pivoting)) I mention we can use [hashcat](https://hashcat.net) to try and crack a password we found, but it wasn't the meaning of the post (and it's a red line for me to do that and put his cleartext password on the web for someone who didn't actually try to hack my service).

But in this post we'll learn how to use hashcat to crack passwords, and even do that much faster on the cloud with GCP ([Google Cloud Platform](https://cloud.google.com/)).

&nbsp;

## 1. Request a Quota

First thing you need to do it to request a quota, because by default the quota for GPU on GCP is zero. In this post I'll be using _""NVIDIA Tesla K80"_ GPU, so go to [this](https://cloud.google.com/compute/docs/gpus/#introduction) link and make sure they have this kind of GPU on the zone you want to deploy your VM.

![Available GPU Zones](/posts/2020/crack-the-hash/available-gpu-zones.webp "Available GPU Zones")

In my case I want to deploy the VM on `europe-west1-b`, so we're clear.

To make the quota request open the left menu and under _"IAM & Admin"_ you'll have a _"Quotas"_ button, click it and just filter by the _"GPU"_ keyword to see all the GPUs GCP offer. Choose _""NVIDIA Tesla K80"_, and click on _"ALL QUOTAS"_, now just mark the zone you want your quota in and click on the top button that says _"EDIT QUOTAS"_.

&nbsp;

## 2. Create the VM

After Google approved your quota, let's build the VM. Go to _"Compute Engine"_ tab on the left side menu in GCP, and then click on the _"CREATE INSTANCE"_ button.

![GCP Compute Engine](/posts/2020/crack-the-hash/gcp-compute-engine.webp "GCP Compute Engine")

Now you'll be redirect to a new page where you can configure your VM. I named my VM `crack-the-hash` and then I choose the the region I got the quota at (in my case `Belgium` and the zone `europe-west1-b`).

The next step is to choose the machine type. In our case we need to choose the _"old"_ series, `N1`, because this is the only one that have the option for GPU. After that, choose the machine type itself (I choose the `n1-standard-4` which has 4 vCPU and 15Gb memory, but you can choose which ever you want. Just keep in mind it'll affect the speed a bit).

The GPU is kinda hidden under the `machine configuration` section, you'll see a `CPU platform and GPU` button, click it and an option to choose a GPU will open up. I choose Nvidia Tesla K80, because we're just learning here and I want to keep the costs down

The final step is the boot disk, I choose 30GB SSD and the latest Ubuntu (20.04) LTS - which means we'll install CUDA manually (Google have images with CUDA installed by default, but we're trying to learn here so I choose the longer way).

![GCP Instance Configuration](/posts/2020/crack-the-hash/gcp-instance-configuration.webp "GCP Instance Configuration")

After you're all done, scroll down and click on the _"Create"_ blue button and just wait a couple of minutes until the machine will be created and boot up.

&nbsp;

## 3. Install CUDA and Hashcat

When the machine is up and running the first thing we need to do is to install [CUDA](https://developer.nvidia.com/about-cuda) first. CUDA is a parallel computing platform and application programming interface model created by Nvidia and [Hashcat](https://hashcat.net/hashcat) is using it.

First we need to SSH into the machine, the easiest way to do it is to click on the _"SSH"_ button and just let GCP open a new terminal right in the browser window.

![GCP Connect Via SSH](/posts/2020/crack-the-hash/gcp-connect-via-ssh.webp "GCP Connect Via SSH")

After that the terminal is open, go to the [CUDA Toolkit download page](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&target_distro=Ubuntu&target_version=2004&target_type=debnetwork) and chose the platform you want to install it to, it'll give you all the commands - just paste them in the terminal. In my case here they are:

```bash
$ wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/cuda-ubuntu2004.pin
$ sudo mv cuda-ubuntu2004.pin /etc/apt/preferences.d/cuda-repository-pin-600
$ sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/7fa2af80.pub
$ sudo add-apt-repository "deb https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2004/x86_64/ /"
$ sudo apt-get update
$ sudo apt-get -y install cuda
```

After everything is installed successfully it's time to install [Hashcat](https://hashcat.net).

```bash
$ wget https://hashcat.net/files/hashcat-6.1.1.7z
$ sudo apt install p7zip
$ p7zip -d hashcat-6.1.1.7z
$ sudo cp hashcat-6.1.1/hashcat64.bin /usr/bin/
$ sudo ln -s /usr/bin/hashcat64.bin /usr/bin/hashcat
$ sudo cp -Rv hashcat-6.1.1/OpenCL/ /usr/bin/
$ sudo cp hashcat-6.1.1/hashcat.hcstat2 /usr/bin/
$ sudo cp hashcat-6.1.1/hashcat.hctune /usr/bin/
```

And now let's test that Hashcat is installed properly and recognize our GPU by running `sudo hashcat --benchmark`.

![Hashcat recognize our GPU](/posts/2020/crack-the-hash/hashcat-benchmark.webp "Hashcat recognize our GPU")

&nbsp;

## 4. Let's get down to business

The first thing we need is a password list. You can make your own password (word) list, but there is no need to work that hard when there is so much stuff free on the internet just waiting for you. And it's not just free it's proven! There are cleartext passwords from leaked databases, so you know it's words/number combinations that are used in the real world by users.

The best place to get some of it is the [SecList on GitHub](https://github.com/danielmiessler/SecLists/tree/master/Passwords), and one of the most popular list is the [rockyou](https://en.wikipedia.org/wiki/RockYou) one. So let's download it to our VM and use that list to crack some passwords.

```bash
$ wget https://github.com/brannondorsey/naive-hashcat/releases/download/data/rockyou.txt
```

To crack a password you first need to know the hash type of that password - which hashing algorithm they use to encrypt the password (there are multiple ways to discover it, and also a lot of projects that are trying to do that automatically, but this is not the purpose of this post, so Google it).

For testing I encrypt some text with [Bcrypt hash function](https://en.wikipedia.org/wiki/Bcrypt), here are the result:

```txt
$2b$04$jysbNjr164hK4E7tqk2B.OJoj4qAg9xHF4gLqain2m9pGb1bcsRf6
$2b$04$T.E6VXlAlt/K/gfVBBrs8eULxwBTDGVZ1CNsE.yJX5Yt9LjqH5bDO
$2b$04$XMOmhaV4EM.8fDCVEk3GYOmSbHvVoSx1cDyxhSeebBmCZyGisq7sG
$2b$04$GIVH57JcU5wZyfwyu0A6Uuq.WrUDFLQfPC5HGHDsdfPfdWvP2jklS
```

Now, go to the [documentation of Hashcat](https://hashcat.net/wiki/doku.php?id=example_hashes) and check what `Hash-Mode` number is the hash algorithm that I used (in our case it's `3200`).

A basic running is just to use the `m` flag with the mode 3200, the `o` flag to point Hashcat where to put all of the cracked passwords, and then just the file with the hashs (I put them in `test.txt` on the VM) and the file with the cleartext passwords list (the `rockyou.txt` we downloaded earlier).

```bash
$ sudo hashcat -m 3200 -o cracked.txt test.txt rockyou.txt
```

![Basic Hash Cracking](/posts/2020/crack-the-hash/basic-hash-cracking.webp "Basic Hash Cracking")

While Hashcat is running you can write `s` on the terminal to check the status of the process. You'll see how much time it estimate the run will take, how much hash it's already cracked, and what the progress is (how much passwords it already checked from how much there is in the file we choose - `rockyou.txt`).

It'll take a while to go over all the passwords in `rockyou.txt`, because won't be able to crack all of the four hash I gave you. When it'll finish you can see in the `cracked.txt` file that Hashcat only cracked 3 out of 4 hashs. The fourth one is `$2b$04$GIVH57JcU5wZyfwyu0A6Uuq.WrUDFLQfPC5HGHDsdfPfdWvP2jklS` which is the Bcrypt of `aSd12345`, this text is present in the `rockyou.txt` file but as all lowercase letters (`asd12345`, which is also the third hash). This is where the rules of Hashcat come into play.

![Basic Cracking Results](/posts/2020/crack-the-hash/basic-cracking-results.webp "Basic Cracking Results")

Using a ruleset we can change our wordlist to contain more variations of the existing text. And again, we don't need to invent the wheel here, there are a lot of rules that people already write for Hashcat and one of them is [Hob0rules](https://github.com/praetorian-inc/Hob0Rules) which will help us do all the variations of lowercase and uppercase letters in our wordlist.

So let's use those rules, first download the repo, next we need to `unzip` the zip file, and finally change the directory name.

```bash
$ wget https://github.com/praetorian-inc/Hob0Rules/archive/master.zip
$ unzip master.zip
$ mv Hob0Rules-master/ Hob0Rules
```

To run Hashcat again, but now with the rules we downloaded all we need to do is to use the `r` flag and point it to the path of the rule file.

```bash
$ sudo hashcat -m 3200 -o cracked.txt -r Hob0Rules/hob064.rule test.txt rockyou.txt
```

Now if you write `s` in the terminal to check the status progress of the cracking process you can see that instead of 57,377,536 passwords combinations that the `rockyou.txt` file contains, Hashcat checks 3,672,162,304 passwords combinations, because it uses uppercase and lowercase combinations of the same text that the `rockyou.txt` file contains.

&nbsp;

## 5. Summary

That's it we cracked the hash! And we leverage the cloud to do it faster and cheaper. If you want to continue, you can rent couple of GPUs in Google (in the same VM) and leverage them to crack your hashs much faster! Also, you can read the Hashcat documentation and try to use other methods to speed up your cracking.
