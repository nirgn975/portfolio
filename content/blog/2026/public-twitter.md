---
title: "Make Twitter Public Again!"
description: "Using Frida to try bypassing the Twitter mobile app's login wall (draft)."
image:
  src: /posts/2026/public-twitter/cover.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2026-12-01
badge:
  label: reverse engineering
draft: true
---

Everybody talks about Twitter these days, so I would do it too. I love browsing Twitter and if you don't know - you can do it without being registered, just go to [twitter.com](https://twitter.com) and you have a search bar at the top and _"Explore"_ button in the left menu, you can search posts, browse hashtags, go to users' profiles and see their info, tweets, media, following, followers - everything. Twitter is public and they're not hiding it.

But what if you go to their mobile app? I downloaded their mobile app to my Android device and was presented with a login/signup screen without a way to go around it. So I thought to myself, if their viewing API is public on the web, maybe it's open on mobile too and I just need to (somehow) go past that login/signup screen. But how would I do that?

Enter [Frida](https://frida.re)! Frida is a _*Dynamic instrumentation toolkit for developers, reverse-engineers, and security researchers*_ by its own definition, but in simple language it's just a tool that lets you inject snippets of JavaScript into native apps on Windows, macOS, GNU/Linux, iOS, Android, and QNX.

![Frida Toolkit](/posts/2025/public-twitter/frida-toolkit.webp){ .rounded-lg .mx-auto }

&nbsp;

## 1. The Plan

Another great tool that we'll need to install on our local machine is [Android Studio](https://developer.android.com/studio), this is an IDE that's used by Android app developers to develop their apps, it comes with an Android Virtual Device (AVD) to test and see the app while developing it, and we'll use it to run the Twitter app and Frida.

The last thing we need is the actual Twitter app, you can download the Twitter [apk](<https://en.wikipedia.org/wiki/Apk_(file_format)>) from [here](https://apkmirror.com).

### 1.1. AVD

I'll not go over the installation part of Android Studio and how to create an AVD, just search Google for it, there are plenty of tutorials about it. Once you have your AVD up and running on your local machine, and the Twitter apk, you can check that your virtual device is up and you can interact with it through [adb](https://developer.android.com/studio/command-line/adb) with the `adb devices` command, and then install the apk with the `install` command.

```bash [terminal]
adb install ~/Downloads/com.twitter.android_9.65.3-release.0-29653000_minAPI21\(arm64-v8a,armeabi-v7a,x86,x86_64\)\(nodpi\)_apkmirror.com.apk
```

This is how it'll look if it all went successfully

![ADB Install](/posts/2025/public-twitter/adb-install.webp){ .rounded-lg .mx-auto }

And then you'll see the Twitter app on your virtual device

![Twitter in AVD](/posts/2025/public-twitter/twitter-in-avd.webp){ .rounded-lg .mx-auto }

&nbsp;

### 1.2. Frida

Before we continue, let's talk a bit about [Frida](https://frida.re). In our case, Frida is split into 2 parts: the `frida-tools` which is a Python package that offers some CLI tools that can be used for quick instrumentation, and the `frida-server` which is just a daemon that exposes `frida-core` over TCP (listening on localhost:27042 by default) and accepts injection commands. This allows Frida to connect via ADB/USB debugging to our device.

So the first step is to install `frida-tools` on your local machine, which you can do with [pip](https://pypi.org/project/pip) (package installer for Python)

```bash [terminal]
pip install frida-tools
```

To check that frida was installed and everything is working as expected you can write `frida-ps` and see an output of all the running processes on your local machine.

Next let's download the latest `frida-server` from its [GitHub page here](https://github.com/frida/frida/releases), and unzip it and extract the file inside it. Then we need to rename it to `frida-server` (just for convenience) and push it to the virtual device and run it as a background process

```bash [terminal]
adb root
adb push frida-server /data/local/tmp/
adb shell "chmod 755 /data/local/tmp/frida-server"
adb shell "/data/local/tmp/frida-server &"
```

To check that `frida-server` is running on the virtual device and your local frida can talk to it, run `frida-ps` with the `U` flag (for `usb`)

```bash [terminal]
frida-ps -U
```

If you see all the running processes of the android device - you are good to go.

&nbsp;

## 2. Find the hook

To know which function to hook with Frida we need to do some digging in the app code, but we don't have its source code, just the compiled code. So we'll use some tools to decompile the app (using [dex2jar](https://github.com/pxb1988/dex2jar))

http://www.javadecompilers.com/ or https://www.decompiler.com/

```bash [terminal]
brew install dex2jar
d2j-dex2jar -d com.twitter.android_9.65.3-release.0-29653000_minAPI21\(arm64-v8a,armeabi-v7a,x86,x86_64\)\(nodpi\)_apkmirror.com.apk
```

And you'll see a `.jar` file with the same name of the `apk`. Now we need to open it some software that can

&nbsp;

## 5. Summary
