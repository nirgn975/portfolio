---
title: "Gummy Bears Safe"
description: "Yesterday another article I wrote for Digital Whisper magazine was published, here it is."
image:
  src: /posts/2020/jekyll-starter-kit-generator-3.x.x/github-social-coding.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2013-01-01
badge:
  label: Android
---

Yesterday another article I wrote for [Digital Whisper](http://www.digitalwhisper.co.il/) magazine was published, here it is:

&nbsp;

### Introduction

This article is a follow-up to [Android - Security Mechanisms]({% post_url 2012-10-21-android-security-mechanisms %}) published in issue 31. In the previous article we touched on topics such as the importance of information security and the security fundamentals of the Android world, device access control, the dangers, and ways to deal with them. It's recommended to read the previous article. Learning about the topic is extremely important, but if we don't stay up to date - we've missed the point. In this article I'll present the updates and innovations that Jelly Bean versions 4.1 and 4.2 bring in the security field (such as ASLR, spyware scanning on Play, and more), and in addition we'll touch on a few points to think about regarding existing holes in the system.

<!--more-->

&nbsp;

### The root of Android's problem

Before we begin, I'd like to note that the Android world is moving fast, even very fast. Google fixes every security hole discovered and adds security layers at an extraordinary pace, but there's one thing they're missing, and that's security updates.

While Android apps update in the background, and it's now common to receive OTA updates that include fairly massive improvements, Android is still very much behind in this area. The root of the mistake is that the system is given to manufacturers who modify it, and as a result don't release updates at the required speed (not to mention that most of the time they don't release updates at all).

To illustrate the problem, the following page includes a version distribution chart (as of December 2012).

<div style="text-align: center;">
  <img src="/images/posts/gummy-bears-safe/Android_Version_Dec_Chart.png" alt="Android Version Chart">
</div>

Google announced at Motorola's announcement conference (the last conference at which we received official information, held about 4 months ago, this past September) that 480 million devices had been activated to date, worldwide (as of September, of course), at a rate (which keeps growing) of 1.3 million devices activated every day (imagine how many Android devices there will be next year at that growth rate).

Now, let's think for a second in numbers, to understand the orders of magnitude: version 1.6: 1.44 million devices (0.3% of 480 million). Version 2.1: 12.96 million devices. Version 2.2: 49.44 million devices. Versions 2.3 through 2.3.7: almost 244 million devices. In short, a bit more than 65% of the Android population (which is more than 310 million devices worldwide) have old versions.

We're talking about versions that came out before ICS (which came out a year and a half ago), and in the mobile world "a year and a half" is an eternity! Not to mention that this isn't a finished, "mature" system, but a system still under construction, and most of the features being added to it are essential and important features, not security luxuries (for example, facial recognition).

Regular security updates should be at the top of the consumer's priority list when purchasing a new device. Preventing these updates by the various manufacturers (usually accompanied by strange, baseless claims for why they're not updating devices) is a serious problem and consumers must condemn it.

&nbsp;

### Okay, what does this tell us?

There's a problem that's not under Google's control. Google updates and fixes security vulnerabilities, but the updates don't reach the end consumer. This means that discovered security vulnerabilities still exist for a very significant percentage of the population (and will likely continue to exist for a long time), and this means we don't necessarily have to exploit vulnerabilities that work on the latest version, which is only installed on 6.7% (JB - 4.1+4.2) of the Android population — even if we use an old vulnerability that's already been fixed in the new version, we can still use it against the vast majority of the population.

&nbsp;

### So you locked the device, and..?

Locking the device - most of us do it - is it actually safe? Not really, since the system "records" the pattern or the password; it needs something to compare against. Where does this recording sit? In the following paths: `data/system/gesture.key/` and `data/system/password.key/`.

Although the file is encrypted and you can't get into it and simply pull out the pattern or password, what you can do is simply delete the file. If there's nothing to compare against, the system will accept any password or pattern you enter.

So what's needed for this:

1. USB Debugging must be enabled; if it's not enabled, you can run the commands via Recovery (if available. If not, it won't be possible to delete the file once the device is already locked, though usually you can "force push" a custom recovery in Fastboot mode).
2. It should be noted that it doesn't matter whether root permissions exist or not.

Here's the command:

```bash
$ adb shell rm /data/system/gesture.key
```

or

```bash
$ adb shell rm /data/system/password.key
```

The command runs, of course, via Adb; for those unfamiliar with this, a quick Google search for "Android Adb" will help a lot.

What are we actually doing with this command? rm is short for remove. This way we remove the gesture.key (or password.key) file located at path `data/system/` (sometimes after running the command you need to power the device off and back on).

It should be noted that the vulnerability was tested and works on versions 2.1 - 2.2 - 2.3.3 - 4.0.3 - 4.1.2 - 4.2, which make up a bit more than 95% of all activated devices today (and it can be assumed the vulnerability also works on even earlier versions). In addition, I'll note that the vulnerability was tested on the AOSP version - a clean version of Android, and I'd be happy to hear if it works on devices with different overlays (HTC's Sense or Samsung's Touchwiz, etc.).

&nbsp;

### SD card access and the developer problem

More than once people have written about this - the SD card holds so much information about us, we simply don't realize how much. The SD card serves as a kind of 'trash bin' for the device; every app we install creates its own folder there and stores information (and usually, even after uninstalling it, leaves the information there, rather than deleting it as one might assume), and anyone can access the SD card (of course, permission is needed for that, but nearly every app requests read and write permission for the SD card, and without it, it can't function properly).

The problem is that the permission is given in full - either there's access to all content on the SD card, or there's no access at all (and as we said, the app won't be able to function properly). So the moment an app has access to the SD card, it has access to all the data on it - whether it's photos, videos, and other things that are stored there openly and unencrypted, fine. The problem grows when third-party apps don't store the data in encrypted form.

Here are a few examples of information we store (intentionally, or that gets "stored for us"):

1. Every app installed on our device creates a folder at path `Android/data/`, so you can get a list of all the apps installed on our device.
2. You can view / transfer all the videos, photos, and songs we have on the SD card.
3. If we performed a backup of our contacts to the SD card, the VCF file is completely exposed and everyone can see our contacts (with all the information listed for us, like a Facebook link, email addresses, etc.).
4. Access to app data. Examples:
   - [Dropbox](https://play.google.com/store/apps/details?id=com.dropbox.android&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5kcm9wYm94LmFuZHJvaWQiXQ), where anyone can see the photos / files / documents I downloaded / uploaded to / from the device.
   - [SMS Backup & Restore](https://play.google.com/store/apps/details?id=com.riteshsahu.SMSBackupRestore&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5yaXRlc2hzYWh1LlNNU0JhY2t1cFJlc3RvcmUiXQ), which backs up all my SMS messages, and anyone can open the file in Notepad and read all the SMS messages I've ever written.
   - [Waze](https://play.google.com/store/apps/details?id=com.waze&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS53YXplIl0), which saves a file called waze_log containing information about the app from the time of installation, such as which device it was installed on (exact model), which Android version (by API), when it was installed, ROM version, which app version, which network I connected to, etc.

Here's an image of the file from my device, I marked some of the details:

<div class="left">
  <img src="/images/posts/gummy-bears-safe/Waze_log.png" alt="Waze log">
</div>

- [Readitlater](https://play.google.com/store/apps/details?id=com.ideashower.readitlater.pro&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5pZGVhc2hvd2VyLnJlYWRpdGxhdGVyLnBybyJd), which saves websites and articles so we can read them later (and conveniently, at that) - where does it save the articles? At path `\Android\data\com.ideashower.readitlater.pro\files\RIL_offline\RIL_pages`. There, all the articles, images from the articles, and the sites themselves are exposed to everyone, for example:

<div class="left">
  <img src="/images/posts/gummy-bears-safe/ReadItLater.png" alt="ReadItLater">
</div>

- [WhatsApp](https://play.google.com/store/apps/details?id=com.whatsapp&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS53aGF0c2FwcCJd) - all the information we transferred via the app (photos, videos, voice files) is open to everyone. In addition, the backups sit on the device itself, at path: `WhatsApp\Databases\`, meaning it's easy to grab the backup files.  
  Of course, you can also open the backup files - here's the easiest way (that I know of): [here](http://forum.xda-developers.com/showthread.php?t=1583021).
- [1Weather](https://play.google.com/store/apps/details?id=com.handmark.expressweather&feature=search_result#?t=W251bGwsMSwxLDEsImNvbS5oYW5kbWFyay5leHByZXNzd2VhdGhlciJd), which saves a file that anyone can read showing where I was, by date, time, the weather at that location, etc.

Links to the apps' Play pages were intentionally included - go take a look and see that these aren't obscure apps, but very popular ones with millions (and sometimes tens of millions) of downloads. And these are simple examples from checking the external memory on my device.

The point is that most third-party apps don't encrypt the data they store. The platform (Android) is based on developers with third-party apps, and we love installing apps. The problem is that they store the data unencrypted, and in the case of the SD card, anyone can access these files (whether they're encrypted or not, and if they are, like with WhatsApp, it's not really a problem to open them anyway).

&nbsp;

### Encryption

From version 3.0 (Honeycomb) you can perform full encryption of the data on the device. And the encryption is good, and I have no issue with it - the problem is that the password for the encryption has its own rules.

The problematic "rule" is that the password the encryption requires must be the same one that unlocks the device (the lock screen). This creates a problem: every time we need to unlock the device, we'll need to type that same password to decrypt the encryption?! We unlock the device tons of times a day, and no one would want to type a difficult sequence of characters every time. So what we do is choose the wrong password - not a complex one with symbols, letters, and numbers, but a simple one that's easy to remember and type, so we can type it quickly and get past the lock screen swiftly.

Whoever encrypts all the data on their device does so specifically so that if the device falls into the wrong hands, the data on it won't be exposed. By choosing an easy-to-remember password with few characters, we're choosing a password that will be easy to crack via a [Brute-force attack](http://en.wikipedia.org/wiki/Brute-force_attack), and then we've lost the main reason we encrypted the device in the first place. In the worse case, most people use a PIN password - a 4-character password consisting only of digits. And that's already quite easy to crack via a [Brute-force attack](http://en.wikipedia.org/wiki/Brute-force_attack) - just a matter of a bit of time.

The solution to this "glitch" could be implemented in a very simple way: 2 passwords! The first password is the complex one, responsible for decrypting the encrypted data. We'd need to enter this password when powering on the device, for the initial decryption of the data. The second password is easier to type and remember and would be used to unlock the lock screen. After all, at the end of the day, we reboot the device far less often than we unlock the screen.

> It should be noted that the proposed solution to this "glitch" is conceptual only and doesn't exist in Android (at least until one of the Android team's employees comes up with such an idea).

&nbsp;

### Jelly Bean's security innovations (4.1-4.2)

Finally, it's worth noting the innovations and changes in the new version (namely JB - 4.1 - Jelly Bean and 4.2) that Google implements in order to secure the system.

**Face Unlock**

Let's start with the most talked-about security feature that came to us in ICS - 4.0. Google wanted to secure the device in the most secure way, and in their opinion, that was via a facial recognition algorithm. The problem is it didn't quite succeed - already on the day of the announcement, tons of videos went up on YouTube demonstrating how the device could be unlocked by showing a photo of the device's owner (and today, in the Facebook era, it's not hard to find a photo of anyone).

What Google did to fix this problem (which rendered the feature irrelevant) was to introduce a liveness check mechanism (loosely translated), what they're basically asking is simply to blink, to show that you're alive and not a photo. Most of the time this fixed the problem, but in my personal testing, the device unlocked several times just by moving the photo (and also in reality by moving one's head without performing the blink action).

Google is on the right track with this feature, but they still have a lot of work to do to prove its reliability.

&nbsp;

**ASLR**

Many attacks rely on the attacker's (the programmer's) ability to precisely identify where specific processes or system functions are located in memory. In order for an attacker to exploit a specific vulnerability in a function or leverage it to their advantage, they must first "tell" their code where to find the function/process to be attacked/exploited.

ASLR (short for Address Space Layout Randomization) is a security method whose basis is random (and independent) arrangement of a data region in memory on every reload. This method was fully implemented in JB 4.1, so that the location of libraries, the stack, the heap, and also the linker are all arranged randomly in memory.

<div class="left">
  <img src="/images/posts/gummy-bears-safe/ASLR.png" alt="ASLR">
</div>

As can be seen in the image:

In the two system runs (the system was rebooted by powering off and on), you can see that the files didn't load at the same location in memory.

It should be noted that ASLR support already existed as of version ICS (4.0), but due to the lack of linker randomization (memory-linking regions), the feature became useless. In 4.1, Google also added support for random arrangement of the linker.

&nbsp;

**Real-time app scanning on Play**

In version 4.2, a new spyware scanner was discovered, one that will make our lives a bit safer (it should be noted that the new spyware scanner is unrelated to Google's acquisition of VirusTotal).

The difference between this spyware scanner and Bouncer, which I wrote about in the previous article (beyond the fact that Bouncer already exists and has been operating for some time), is that Bouncer is a spyware scanner on the server side of Play, meaning every app uploaded to Play is scanned by it (it literally simulates full operation of the app on an Android device on a separate server), whereas the current spyware scanner being discussed scans apps as they're installed on the device. Bouncer performs additional actions - the above is just a one-sentence reminder. For full information, read the previous article.

<div class="left">
  <img src="/images/posts/gummy-bears-safe/Verify_Apps.png" alt="Verify Apps" style="width: 30%">
</div>

_The root of the problem_

Android is known for its openness, and as a result we can install whatever app we want (even if it's not from Play). In such a case, the Bouncer service doesn't help us, since the app wasn't scanned by it (because it wasn't uploaded to Play). It's exactly in this situation that a small window will pop up asking whether we want to allow Google to scan all apps that get installed on the device.

Hiroshi Lockheimer - VP of Engineering on the Android team explains about scanning apps on the device:

> "We have a catalog of 700,000 apps on Play, and beyond that, we're always scanning material on the internet in terms of APK files that appear. Now, we have a pretty good understanding of the app's makeup, regardless of whether the APK is on Play or not."

> He continues, noting: "Most of the time - if the apps we install are identified as safe - no one will feel like the service exists. The server does all the heavy lifting. The device only sends a signature of the APK so the server can identify it quickly. Only if you encounter an unsafe app will the installation process be interrupted."

&nbsp;

**The permissions screen**

In addition, in version 4.2 we get a few small but very important visual changes. The permissions screen during app installation underwent visual changes and will no longer hide information; in addition, next to every permission there will be a small icon related to the type of permission, making it easier to go through. A screenshot (on the right, the new state (version 4.2). On the left, the old state (version 4.1 and below)):

<div class="left">
  <img src="/images/posts/gummy-bears-safe/Apps_Installation.png" alt="Apps Installation">
</div>

&nbsp;

**SMS**

In version 4.2, a nice addition was made - there's now a new feature working behind the scenes that warns every time an app tries to send an SMS that might cost us money. If an app tries to send an SMS to a known code - one that will automatically charge the sender's carrier - the system pops up a message warning about the action. We can approve the action and allow the app to continue the process, or block it. This applies of course even if the app is running in the background, in which case the warning window will pop up "just like that" without us having performed any action.

&nbsp;

**SELinux**

SELinux (short for: Security-Enhanced Linux) is a set of kernel patches and user-space tools that can be added to various Linux distributions. The project itself was first started by the NSA. In SELinux, the concept of root doesn't exist. The security policy is set by the admin and applies to every process and object existing in the system, and no one can bypass it.

Users can gain high-level access via root permissions; if malicious apps are given the same permissions (root), the app will have access to everything, and the potential damage it can do grows by tens of times. Once we apply the security policy to it (and effectively it won't have root permissions), it won't be able to do anything, thereby reducing the chances of a breach into the device and major damage (because effectively no process can escape the security policy that's been set).

- Of course, Google isn't closing off the root option. This option will be a choice option on the device, and it's likely that mostly only large organizations will require their employees to use that option.
- As an open-source project, the Android development team is constantly receiving new code and integrating it into the system. The project to integrate SELinux into Android (also called SE Android) began this past January, driven by the NSA (while Android is based on Linux, it isn't Linux, and the NSA made changes to adapt the patches and tools to the Android system), and you can see that Google is indeed constantly integrating more pieces of code with the Android project.

&nbsp;

### Summary

The Android system is maturing year over year and gaining a ton of features, including in the security realm. But its Achilles' heel is mainly the openness of the system - in that it's given to manufacturers who, on their part, modify it and don't provide security updates in a reasonable and regular timeframe, and developers who can upload apps without even a single check performed by an external party, and who don't implement security policy (which, to tell the truth, doesn't really exist all that much anyway).

Don't get me wrong - I'm not calling to "close" the system, not even a little, but the issue needs to be expressed more strongly through the implementation of a clear security policy and through explanations/guides/videos (and whatnot), in order to direct developers' attention to the topic and its implementation in their apps.

At the last conference, Google announced the PDK tool, through which various manufacturers will have access to the new Android version several months in advance, thereby shortening the update time (theoretically). In the meantime, update time is only shortening for flagship devices, while the rest of the devices are neglected across the board. Here, in my opinion, the responsibility isn't Google's, but the consumers' to raise an outcry.

And finally, I hope you enjoyed reading the article at least as much as I enjoyed writing it, and see you in the next article.
