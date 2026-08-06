---
title: "Android - Security Mechanisms"
description: "Is Android secure or broken? Examining its sandbox, permissions, and encryption."
image:
  src: /posts/2020/jekyll-starter-kit-generator-3.x.x/github-social-coding.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2012-10-21
badge:
  label: Android
---

This post is an article I wrote for Digital Whisper magazine. The article appears in issue 31 (this month, May).  
To download the article [click here](http://www.digitalwhisper.co.il/0x53/). Below is the full article (reproduced from the magazine).

<!--more-->

&nbsp;

### Introduction

"There are tons of viruses on Android," a friend told me a few days ago, and that made me think that most of the (uninformed) public tends to think of open systems as systems that are easy to break into, and that's how they think about Android too. The following article deals with the question "Is Android a secure platform or a broken one", and to answer that question we'll attack the topic from several angles (the system's security model, developers and permissions, what users need to worry about, etc.).

&nbsp;

### Why should we care about security?

This is the question of questions. Most users don't care about the security of their device's data — at least not until it's breached/stolen/lost, and only then do we want to know that the device is protected and that not just anyone who finds it can access the data on it.

- Android is currently the most common platform, growing day by day, and like other systems with a large user base, the (not-so-good) hacker community will focus on Android. After all, it's more economical to find a vulnerability / write a trojan for a system with many users so we can maximize the exploitation of what we wrote.
- Large corporations use Android today. Employees hold an Android device and sync their email, share presentations, etc. (in short, opening a hole in the organization's defenses).
- We all hear every day about new spyware found on ~~the Market~~ PlayStore, and I'm sure that if we google "Android security" we'll find tons of articles.

&nbsp;

### Android's security fundamentals (or, what will we cover?):

1. Application isolation and the permission system (during app installation):
   - Can we control what the apps we install are able to do?
   - Can apps that turn out to be spyware affect the rest of the system?
2. The application's "author":
   - Can we trust the developer of the app?
   - Can we trust the apps we've already installed?
3. Encoding and encryption of data:
   - Is our data protected if our device is breached / stolen / lost?
4. Device access control.

Before we start going through these things, I recommend getting to know the system's kernel at a basic level; you can read about it here: [A little bit of Android Grammar]({% post_url 2012-09-16-little-android-bit-grammar %}).

&nbsp;

### Application isolation

To demonstrate this topic, let's connect the device to a computer (via USB) and enter ADB. We'll run PS and see the running processes. There are many running processes (as ROOT, by the way), for example:

- void
- neld
- installd
- service manger
- Zygote
- system_server
- com.foo.app1
- com.bar.app2
- and more

(the last 2 are already apps). We can see that they run as separate processes and don't (directly) share memory / system files, they have no permission to each other's files / components, and they also can't "talk" to each other.  
The operating system's kernel (the "Linux Kernel") provides the isolation (running each app as a separate process); another interesting detail (which we won't elaborate on now) is that each app runs its own Dalvik VM.

&nbsp;

**What do we learn from this?**

- By design, every app runs on a separate process with separate system permissions. This idea isn't new and is based on an old, well-understood idea implemented in UNIX systems, so Android is essentially riding on an idea that's been around for years (and works), which we can trust.
- System services (Framework) also run as separate processes (system_server).
- The operating system's kernel is essentially the foundation of app isolation, or in slightly more professional terms: an App Sandbox.
- Dalvik doesn't play a role here (unlike [JavaME](http://en.wikipedia.org/wiki/Java_Platform,_Micro_Edition), where apps run on the same "virtual machine" — here every app runs on a separate virtual machine, and all of them must meet the same permissions regardless of whether the code was written in C++ or Java).
- All of this also includes the built-in system apps.

&nbsp;

### So how do developers escape the 'sandbox'?

<div class="left">
  <img src="/images/posts/android-security-mechanisms/Play_Premission.png" alt="Play Premission">
</div>

In practice we don't feel like there's a "sandbox" — for example, in the Facebook app we pull a picture from the gallery, or when we check in we use the GPS app. So wait, is there a sandbox or isn't there?

The sandbox exists, but it can be overcome by requesting permissions. Every time we press the "Download" button to download and install an app, the permissions screen opens — the screen we're used to skipping and just tapping "Accept and Download" without reading what special permissions we're granting the app.

The permissions we see there are permission groups. For example, most apps request the "network communication" permission — this permission is a permission group that contains all the permissions for apps related to the internet (or more precisely, opening internet sockets), for example the ability to create internet sockets via WIFI as well as the ability to create internet sockets via cellular data.

Another example is the camera permission (as code, it looks like this: `android.permission.CAMERA`), which grants access to the still camera, video, camera effects, and panorama mode. (Requests considered "normal" are found below under "Show All"). More examples of permissions apps can receive:

|                                        Description                                        |      Permission      |
| :---------------------------------------------------------------------------------------: | :------------------: |
|                 The app will be granted access to Android's location data                 | ACCESS_FINE_LOCATION |
|                The app will be granted access to network connectivity data                | ACCESS_NETWORK_STATE |
| The app will be granted access to Wi-Fi network connectivity data near the Android device |  ACCESS_WIFI_STATE   |
|     The app will be granted access to change the Android device's Wi-Fi connectivity      |  CHANGE_WIFI_STATE   |
|        The app will be granted access to the Android device's battery status data         |    BATTERY_STATE     |
|          The app will be granted access to completely disable the Android device          |        BRICK         |
| The app will be granted access to read SMS messages sent / received on the Android device |       READ_SMS       |

For an extensive list of all existing permissions and what each one allows: [Manifest permission](http://developer.android.com/reference/android/Manifest.permission.html).

**The natural question is "Can a regular user tell whether this collection of requests is safe or not?"**

Google's logic (or more precisely, the Android team's logic) is "let's give the end user the power to decide" (something that's also reflected in everything related to the system's openness), but as we learn in practice, regular users simply tap "Next > Next > Next" without reading.

&nbsp;

**So what are the alternatives?**

The alternative is called "dynamic permissions" (which, by the way, is the situation on iOS), but not everything is perfect:

- It would annoy us if a small box popped up every time asking for approval.
- It makes clean, smooth transitions between apps harder (which is one of the main things the Android team emphasizes) if every time we enter an app we'd need to grant it all permissions again.
- It would lead to a "Next > Next > Next" situation even among users who normally do pay attention to this issue.
- There's no logic to it — after all, we've already downloaded the app, we've "committed" to it. There's no reason we wouldn't want to grant it the permissions to function properly.

&nbsp;

**So what do we do?**

The Android team created a review and rating system in the Market so we can see user reviews and app ratings, which helps regular users form an opinion about the app before installing it. But again, not everything is perfect, and we've reached a situation where users simply look at the app's download count and assume that if it's been downloaded many times, it must be safe.

So in the end we reach a silver lining (you can also look at it differently): Google reserved for itself the right to remotely "kill" apps it decides are harmful, meaning that if we've already downloaded an app that turns out to be harmful and gets removed from Google Play, Google can kill it remotely on our device, so we don't have to constantly stay updated on apps that have been found to be harmful (if an app is removed from the device this way, the user gets an email from Google).

But at the end of the day, the user is responsible for what happens on their device.

&nbsp;

### The app's developer

And this leads us to a few questions regarding the origin of the application:

**Can we trust the developer of the app we're about to install?**

The answer is probably no. One of the ways Android deals with this question is that apps must be signed, and the moment a harmful app is discovered, Google can remove all apps from the Market bearing the same signature (meaning all apps that came from the same developer, even if each was uploaded from a different developer account).

The signature is based on a public-private encrypted algorithm where, in principle, we have a private key used to digitally sign the app, and the public key responsible for writing the certificate, both attached together to the APK file (the signature is found in the Meta folder). We won't go into detail about exactly how the signature is built, but for in-depth reading on the topic click here. The bottom line is that anyone can sign their own app, even if it's malicious spyware.

**Can we trust that our apps are tamper-resistant once installed, and that no one will be able to mess with their code after they've been installed on our device?**

Here, on the other hand, the answer is probably yes; the role of the signature here is significant. Apps that update (whether manually or automatically) automatically remove the previous version and install the new version (meaning a new APK, or if you will, a completely new app), so how can we know the APK hasn't been swapped out for some kind of spyware? The reason is the signature — the signature of the new APK must be identical to the signature of the old APK, and this almost completely prevents the possibility of installing an APK from a foreign source.

&nbsp;

### Data encoding

By default, all app files are defined as "private" (meaning other apps cannot manipulate or edit the files directly), except:

- The creator of the app can create files defined as `MODE\_WORLD\_READABLE` and/or `MODE\_WORLD\_WRITABLE`.
- Apps with the same certificate + signature — meaning created by the same author (since they run under the same UID, they can share common files).
- Files we put on the SD card, which every app can access (of course, with a specific permission).

Here are the encryptions that exist in the Android system (I'm more familiar with some than others, but I won't explain each one due to lack of time and space, and because that's not our topic. If anyone is interested in a specific protocol/standard, they're more than welcome to check Google/Wikipedia):

- Mobile and internet [VPN](http://he.wikipedia.org/wiki/Virtual_Private_Network) (for organizations) (with [IPsec](http://en.wikipedia.org/wiki/IPsec) and [3DES](http://he.wikipedia.org/wiki/3DES) and [AES](http://he.wikipedia.org/wiki/Advanced_Encryption_Standard) encryption and a certificate system - CA).
- Wifi with [standard 802.11](http://he.wikipedia.org/wiki/IEEE_802.11) and [WPA/2](http://he.wikipedia.org/wiki/WPA) security protocols.
- The [OpenSSL](http://en.wikipedia.org/wiki/OpenSSL) protocol.
- [JCE](<http://en.wikipedia.org/wiki/Bouncy_Castle_(cryptography)>) (based on Bouncy Castle) provides us support for all common algorithms (public and symmetric encryptions).
- [Apache HTTP](http://he.wikipedia.org/wiki/Apache_HTTP_Server) (supports SSL).
- [Keychain API](http://developer.android.com/reference/android/security/KeyChain.html) - apps can install and store user security certificates.
- Full memory encryption (available from version 3.0 and up).

&nbsp;

**Full memory encryption:**

To perform this action, go to `Settings` > `Security` on ICS (or `Location and Security` on lower versions) > `Encryption`.

A few clarifications:

- This action requires a screen password (not a "pattern" password).
- This action encrypts all the data on the device's memory with [AES](http://he.wikipedia.org/wiki/Advanced_Encryption_Standard) 128bit and [CBC](http://en.wikipedia.org/wiki/Disk_encryption_theory#Cipher-block_chaining_.28CBC.29), with [ESSIV](http://en.wikipedia.org/wiki/Disk_encryption_theory#Encrypted_salt-sector_initialization_vector_.28ESSIV.29): [SHA](http://he.wikipedia.org/wiki/Secure_Hash_Algorithm) 256bit (the password is combined with [SHA](http://he.wikipedia.org/wiki/Secure_Hash_Algorithm) encryption).
- Canceling the encryption requires a full factory reset of the device!
- Encryption disables the "hardware acceleration" option for reading and writing data (estimates are that this reduces the device's performance by about 54% when reading and writing large files).

**The downsides are:**

- This action does not prevent physical attacks, meaning if your device is physically stolen, the attacker can install a key logger in order to recover / decrypt your password.
- This action does not prevent attacks called a [Cold-boot attack](http://en.wikipedia.org/wiki/Cold_boot_attack) — if someone manages to get hold of your device while it's on and the password is already active (even with a lock screen), they can (in principle) remove the RAM (not saying it's easy, but definitely possible), put it in another device, boot it up, and extract the data from the RAM onto a computer, etc. Basically, as long as you entered the password and it's in memory, it can be recovered.

&nbsp;

### DRM - Digital Rights Management

<div class="left">
  <img src="/images/posts/android-security-mechanisms/DRM.png" alt="DRM">
</div>

Acronym for: Digital Right Management. In API 11, Android added the "digital rights management" capability - this is an interface that provides OEM devices approval for certain content. The idea is to protect user content by using digital licenses for content usage. What provides this protection/barrier is the Binder.

The Binder provides communication between processes, using a scaled-down kernel model. The Binder (like the standard IPC activity in the Linux kernel) is like a messenger between processes; it knows how to identify whether there's a threat, and it "runs" between processes to pass information (so there's no direct communication). For deeper reading about the Binder, you can read [here](http://www.nds.rub.de/media/attachments/files/2012/03/binder.pdf).

**DRM framework API:** The API is exposed to apps (via the Android Framework) and runs via Dalvik for standard apps.  
**DRM manager:** Exposes the management interface for plugins (also called "agents") and performs license management and decryption for the programs.

&nbsp;

## Device access control

Device access control includes locking the screen via a password / PIN code / pattern shape. In addition, version 2.2 (Froyo) added the "admin" capability.

Why is this good? It doesn't help the regular user, but it's essential for organizations. Organizations can send employees an app requesting to be the Device Administrator, granting it control to do everything — from forcing the user to use a password for the lock screen to disabling the camera so it can't be used (even to the extent of disabling the camera app during certain hours, for example during working hours, 8-17).

This option is meant to protect the organization's data that's accessible on or stored on the device. Another example: if the device is stolen, the organization can send an instruction to the device to wipe itself.

&nbsp;

### Spyware filtering

At the beginning of February, the Android team revealed a new service called [Bouncer](http://googlemobile.blogspot.co.il/2012/02/android-and-security.html), which automatically scans the Market looking for spyware and malicious software. The service performs the process in the background without users or developers noticing.

**How the service works:**

1. When an app is uploaded, the service starts analyzing it in comparison to known malware and trojans.
2. The service then analyzes the app's "behavior" and compares it to the behavior of apps that were analyzed in the past and found to be malicious/trojans.
3. The service runs the app in a special Google cloud and simulates how the app would work on an Android device.
4. In addition, the service performs an analysis of new developer accounts to prevent malicious app developers from re-uploading the same apps again and again, or new apps.

It should be noted that the service has existed since 2011 but wasn't revealed to the public, and the Android team reports a 40% decrease in the appearance of malicious software. In addition, at the same time, security companies such as Lookout, AVG, Symantec, etc. reported an increase in the amount of spyware appearing on the Market and recommended installing their security software.

&nbsp;

## Summary

The Android team is constantly performing updates to existing mechanisms and introducing new ones (such as the spyware filter that was recently introduced). You can notice that the topic of security is on Google's agenda, but at the end of the day there's no system that's completely immune when it comes to security. Of course, along with the system's advantages come its disadvantages — Android is an open operating system (a serious plus in the development world, but a kind of minus in how the system is perceived by the general public and laypeople), and because of that, in the end the user is responsible for their device, and no matter how many mechanisms exist, they themselves are the weakest link in the system.
