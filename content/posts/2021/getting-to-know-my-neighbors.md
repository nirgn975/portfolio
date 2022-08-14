---
title: "Moving House And Getting To Know My Neighbors"
subtitle: ""
date: 2021-02-01T09:00:00+03:00
lastmod: 2021-02-01T09:00:00+03:00
draft: true
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["wifi pineapple", "man in the middle", "wifi attack", "hacking", "white hat", "hak5"]
categories: ["hacking"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/getting-to-know-my-neighbors/blue-wireless-connection.webp"
featuredImagePreview: "/posts/2020/getting-to-know-my-neighbors/blue-wireless-connection.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

Lately I was moving to a new house, and the first thing that I do after getting comfortable in the new house is to getting to know my neighbors, like any other person on the planet will do, right? wrong!

It's don't that I have something against getting to know my neighbors in person, it's just that it's not common in Israel like other places in the world. But none the less, I'm interested in my new area, and it's just happened to be that I get my new wifi pineapple (mark vii) in the mail couple of week ago, so let's clear the dust from my wifi pineapple skills and play like a kid with a new toy.

&nbsp;

## 1. Setup

Let's set it up. First thing we need to do is to connect it to a power source, I choose to connect it to my computer usb-c port, then we need to wait for the top (and single) LED to be a solid blue - that's mean it's ready (from blinking blue when it's starting up).

![The WiFi Pineapple is ready](/posts/2020/getting-to-know-my-neighbors/wifi-pineapple-ready-to-go.webp "The WiFi Pineapple is ready")

Now, according to the [setup guide from Hak5](https://docs.hak5.org/hc/en-us/articles/360053346334-Setup-Basics), if you connected it to the usb-c port, you can connect to the WiFi Pineapple via the usb instead of connecting into the WiFi Pineapple wifi. Which is more secure, so I let's do this that way.

In Linux and Windows the driver will be automatically downloaded, but if you're on MacOS Catalina and later you need to do this manually (thanks apple!), so let's download the [ASIX driver for the AX88772C](https://www.asix.com.tw/download.php?sub=driverdetail&PItemID=136), and install it (you'll need to restart your computer for it to take effect).

After your computer is started again, connected the WiFi Pineapple via the usb-c port and it will enumerate as a USB Ethernet adapter and that interface should receive an IP address from the WiFi Pineapple via DHCP in the 172.16.42.0/24 range. So let's just open the browser at [http://172.16.42.1:1471](http://172.16.42.1:1471) and follow the on-screen instructions.

The first thing it tells us to do is to click on the physical button on the device, this is a security mechanism to see you're the owner of the device and it's near your (in the physical world, in case someone see it's wifi and try to connect to it and "steal" it).

The second thing is to checks for updates, in my case it needed to download one. I gave it my wifi SSID and password to connect to it. It download the newer firmware, installed it, and restart itself, all alone - sweet (when it flashing a new firmware the LED blinks with blue/red lights, do not unplug the device until it finished and you see a solid blue light again).

Now we can start the _"General Setup"_ of the device. Let's give it a password, confirm it again, and choose our timezone. Next let's do the _"Networking Setup"_ (you can see in the screenshot below what I choose). At the _"Filters Setups"_ screen I choose _"Allow connections for only the listed devices..."_ and _"Allow associations for only the listed SSIDs..."_ so not everyone will be able to connect to the WiFi Pineapple, just the ones I'll target. And at the last screen, the _"Look and Feel"_, I choose the dark theme (did you expect anything else from me?).

![My Networking Setup](/posts/2020/getting-to-know-my-neighbors/wifi-pineapple-networking-setup.webp "My Networking Setup")

Finally we're at the WiFi Pineapple dashboard. Now, let's head over to the `Settings` (at the bottom left corner) -> `Networking` -> and `Wireless Client Mode`, from there scan your area and connect to your own wifi, so that the Pineapple will have internet connection.

&nbsp;

## 2. Reconnaissance

&nbsp;

## 7. Summary
