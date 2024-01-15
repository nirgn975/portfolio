---
layout: "../../../layouts/BlogPost.astro"
title: "Getting to know my new neighbors"
pubDate: 2022-11-01T09:00:00+03:00
draft: true
author: "Nir Galon"
authorLink: "/about"

tags: ["wifi pineapple", "man in the middle", "wifi attack", "hacking", "white hat", "pen test", "hak5"]
category: "hacking"

featuredImage: "/posts/2024/getting-to-know-my-neighbors/cover.webp"
---

Recently, new neighbors moved in to the next door at the apartment building I live in. So I thought to myself that a good neighbor will take the time to know them a little bit, and it's just happened to be that I get my new Wifi Pineapple (mark vii) in the mail couple of week ago, so let's clear the dust from my Wifi Pineapple skills and play like a kid with a new toy.

&nbsp;

## 1. Setup

Let's set it up. First thing we need to do is to connect it to a power source, I choose to connect it to my computer usb-c port. Then we need to wait for the top (and single) LED to be a solid blue - that's mean it's ready (from blinking blue when it's starting up).

![The WiFi Pineapple is ready](/posts/2024/getting-to-know-my-neighbors/wifi-pineapple-ready-to-go.webp "The WiFi Pineapple is ready")

Now, according to the [setup guide from Hak5](https://docs.hak5.org/wifi-pineapple), if you connected it to the usb-c port, you can connect to the WiFi Pineapple via the usb instead of connecting into the WiFi Pineapple wifi. Which is more secure, so I let's do it that way.

In Linux and Windows the driver will be automatically downloaded, but if you're on MacOS Catalina and later you need to do this manually (thanks Apple!), so let's download the [ASIX driver for the AX88772C](https://www.asix.com.tw/en/support/download), and install it (you'll need to restart your computer for it to take effect. For more information about their MacOS support [click here](https://docs.hak5.org/wifi-pineapple/faq/macos-support)).

After your computer is started again, connect the WiFi Pineapple via the usb-c port and it will enumerate as a USB Ethernet adapter and that interface should receive an IP address from the WiFi Pineapple via DHCP in the 172.16.42.0/24 range. The WiFi Pineapple uses the 1471 port, so let's just open the browser at [http://172.16.42.1:1471](http://172.16.42.1:1471) and follow the on-screen instructions.

The first thing it tells us to do is to click on the physical button on the device, this is a security mechanism to see you're the owner of the device and it's near your (in the physical world, in case someone see it's wifi and try to connect to it and "steal" it).

The second thing is to checks for updates, in my case it needed to download one. I gave it my wifi SSID and password to connect to it. It download the new firmware, installed it, and restart itself, all alone - sweet (when it flashing a new firmware the LED blinks with blue/red lights, do not unplug the device until it finished and you see a solid blue light again).

Now we can start the _"General Setup"_ of the device. Let's give it a password, confirm it again, and choose our timezone. Next let's do the _"Networking Setup"_ (you can see in the screenshot below what I choose). At the _"Filters Setups"_ screen I choose _"Allow connections for only the listed devices..."_ and _"Allow associations for only the listed SSIDs..."_ so not everyone will be able to connect to the WiFi Pineapple, just the ones I'll target. And at the last screen, the _"Look and Feel"_, I choose the dark theme (did you expect anything else from me?).

![My Networking Setup](/posts/2024/getting-to-know-my-neighbors/wifi-pineapple-networking-setup.webp "My Networking Setup")

Finally we're at the WiFi Pineapple dashboard. Now, let's head over to the `Settings` (at the bottom left corner) -> `Networking` -> and `Wireless Client Mode`, from there scan your area and connect to your own wifi, so that the Pineapple will have internet.

&nbsp;

## 2. The plan

We'll do a [KARMA](https://en.wikipedia.org/wiki/KARMA_attack) attack, which is a variant of the the [Evil twin](<https://en.wikipedia.org/wiki/Evil_twin_(wireless_networks)>) attack, and then we'll do [DNS Spoofing (also called DNS cache poisoning)](https://en.wikipedia.org/wiki/DNS_spoofing).

**What is an Evil Twin attack?**

An evil Twin is a WiFi access point that appears to be legitimate but is set up to eavesdrop on wireless communication (it's the equivalent of a phishing scam, but in the WiFi world). This type of attack may be used to steal the passwords of unsuspecting users, either by monitoring their connections or by phishing (setting up a fraudulent web site and luring people there).

An example of that is to sit by an office building of some company and create a new open WiFi access point with a similar name (for example "Google guests") and wait for people to connect to it. We can also setup a popup browser window that ask them to login with their company's corporate account once they're conntect, and just steal their username and password (much like you need to do in hotels, McDonald's, Starbucks, etc).

&nbsp;

**What is a Karma attack?**

So first, a little bit about WiFi behaviour. By default, client devices broadcast a "preferred network list" (PNL), which contains the SSIDs of access points (names of the WiFi networks) to which they have previously connected and are willing to automatically reconnect without user intervention. These broadcasts are not encrypted and hence may be received by any WiFi access point in range.

This attack consists in an access point receiving this PNL list and then giving itself an SSID from the PNL (becoming an evil twin of an access point already trusted by the client). Once that has been done, if the client receives the malicious access point's signal more strongly than that of the genuine access point (for example, if the genuine access point is nowhere nearby), _**and if the client does not attempt to authenticate the access point**_, then the malicious access point becomes a man in the middle (MITM).

If you notice, the only thing that distinguishes KARMA from an Evil Twin is the use of the PNL, which allows the attacker to know, rather than simply to guess, which SSIDs (if any) the client will automatically attempt to connect to.

&nbsp;

**What is DNS spoofing?**

After the WiFi Pineapple become a man in the middle,

&nbsp;

## 3. Always start with reconnaissance

If you don't know your way around the WiFi Pineapple UI, read the [Hak5 docs](https://docs.hak5.org/wifi-pineapple), we'll not go over it, but I'll explain the things we do as we go. The first thing I always do is reconnaissance, just to understand and get a feeling of the area I'm working in. So go over to the **Recon** tab and start a scanning for a few minutes.

![Recon tab](/posts/2024/getting-to-know-my-neighbors/recon-tab.webp "Recon tab")

When you get the results, they will look something like the screenshot below. Now which one is my next door neighbors? We can eliminate my SSID, and the low signal ones, but still we have left with a bunch of them to choose from.

Now it's the time to do a bit of OSINT about your target. Chances are they use their own first or last name as the SSID, their phone number, their children's name, etc. In my case it was pretty easy, we have a WhatsApp group of all the tenants in the building so I know their first and last names, and by accident I overheard their child name in the lobby of the building the other day, and it's somewhat a unique name (e.g. not john), and in the list of SSID I saw that name with a strong signal.

![Recon results](/posts/2024/getting-to-know-my-neighbors/recon-results.webp "Recon results")

So I clicked on their SSID and add it to the **PinAP pool**.

![SSID menu](/posts/2024/getting-to-know-my-neighbors/ssid-menu.webp "SSID menu")

On this scan, I actually didn't see any clients connected to this SSID, and I also double chcked and saw their car isn't in their parking spot, so I'm sure they're not home right now. So the Karma attack will have to wait a little and we'll pivot and try a [Pixie Dust attack (or Offline brute-force attack)](https://en.wikipedia.org/wiki/Wi-Fi_Protected_Setup).

&nbsp;

## 4. Pivoting

**What is a Pixie Dust attack?**

On the bottom of some routers there are an 8 digit number (called WPS setup pin) that allows you to access the router in case you forget your credentials. During the login process you get this 8 digit number (in 2 seperate requests, each contains half the number, and they're [PSK](https://en.wikipedia.org/wiki/Pre-shared_key) encrypted).

Now if you go and read the small paragraph on Wikipedia about PSK you'll see

> Choosing keys used by cryptographic algorithms is somewhat different in that any pattern whatsoever should be avoided, as any such pattern may provide an attacker with a lower effort attack than brute force search. This implies random key choice to force attackers to spend as much effort as possible; this is very difficult in principle and in practice as well.

The crazy thing is, most of the implementations of the semiconductor companies are bad (they don't use a random key), they use zeroes (0) or the timestamp at the beginging of the WPS transaction. Because of their weak random numbers implementation we can guess it very quickly! (Note: This attack will not work on any router, just the ones with a poor random numbers implementation).

&nbsp;

## 7. Summary
