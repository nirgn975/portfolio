---
title: "Analyze an Apk file"
description: "How to decompile, edit, rebuild, and re-sign Android Apk files."
image:
  src: /posts/2020/jekyll-starter-kit-generator-3.x.x/github-social-coding.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2012-11-18
badge:
  label: Android
---

One of the useful (and cool) things about Android is knowing how to open and sign Apk files, and of course, as a result, being able to edit them.

As we know, Android is built entirely out of Apk files, so in this post we'll learn how to open them, make changes, and finally rebuild and re-sign them. I'll demonstrate on an Apk file of an app from Play, but of course you can do this with any application (including ones that come built into the system).

First, in order to know what an Apk file is and how it's built, read the post [A little bit of Android Grammar](/blog/2012/little-android-bit-grammar/). In addition, you'll need to install the JDK and JRE from [here](http://www.oracle.com/technetwork/java/javase/downloads/index.html).

&nbsp;

## 1. Preparations

In order to open Apk files and later rebuild them, we'll use the ApkTool software (download the file [apktool1.5.2.tar.bz2](https://bitbucket.org/iBotPeaches/apktool/downloads)).

In addition, the file [apktool-install-windows-r05-ibot.tar.bz2](https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/windows/apktool.bat) (if you're using Windows), or the file [apktool-install-linux-r05-ibot.tar.bz2](https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/linux/apktool) (if you're using Linux).

Then, extract the Jar file found inside the folder from the first file we downloaded (apktool1.5.2.tar.bz2) into the folder that came from the second file (the Windows or Linux one). Note that you can place this folder wherever is convenient for you, I recommend the path `usr/local/bin/` on Linux, or on Windows the path `C:\Program Files\Android\android-sdk\platform-tools`.

&nbsp;

## 2. Decompile

1. Move the application (the Apk file) to the apktool folder.
2. Open the Terminal (or Cmd), navigate to the location where you placed the apktool folder.
3. To open / break apart the file we write `apktool d namOfTheApp.apk nameOfTheFolder`.
   - Replace namOfTheApp with the file's name, and replace nameOfTheFolder with the name you want to give the folder (it'll be created inside the apktool folder).
   - On Linux add /. before the command.
   - The letter d that appears after apktool in the command is short for decompile.

Example (on Linux): if the name of the file we want to break apart is HelloWorld.apk, we write: `apktool d HelloWorld.apk appOne/.`, and a folder named appOne will be created (inside the apktool folder).

&nbsp;

## 3. Build

To rebuild the application, we're required (as a last step) to sign it. Every application must be digitally signed, the signing key is private and held by the app's developer.

The signature, in other words the digital certificate, provides the Android system with a way to identify the app's developer, and to establish trusted relationships between applications.

The important points to understand about signatures are:

- All applications must be signed. The system will not install unsigned applications on the device, or on the emulator.
- In order to test and debug applications developers are building, the Android SDK signs them automatically with a generic generated key, meant specifically for debugging.
- When the developer releases the version to Play, it must be signed with a private key, an application can't be released while signed with the key the Android SDK generates.
- Every certificate has an expiration date, once that date has passed the system won't install applications signed with that certificate. However, note that the system only checks this date at install time, so if the date has passed after the app was already installed, the app will keep functioning normally.
- You can use standard tools (such as Keytool and Jarsigner) to generate a key to sign the application with.

&nbsp;

**Let's start building:**

1. To build the application, we write the following command `apktool b nameOfTheFolder nameOfTheApp.apk`.
   - The command should, of course, be written in the terminal (or Cmd) while inside the apktool folder's path.
   - Replace nameOfTheFolder with the name of the folder containing the files, and replace nameOfTheApp with the name you want to give the application.
   - On Linux add /. before the command.
   - The letter b that appears after apktool in the command is short for build (or recompile).
2. In order to generate a key we can use to sign the apk file, you need to install the Android SDK. Then open the terminal (or Cmd) and write `keytool -v -genkey -v -keystore nameOfKey.keystore -alias aliasName -keyalg RSA -validity 10000`.
   - genkey is short for generate key.
   - v is short for verbose mode.
   - nameOfKey will be the key's name (you can replace it with whatever you'd like).
   - aliasName creates an alias (another name) for the key (you can replace it with whatever you'd like).
   - keyalg specifies the encryption algorithm used to generate the key (i.e. [RSA](<http://en.wikipedia.org/wiki/RSA_(cryptosystem)>), [DSA](http://en.wikipedia.org/wiki/Digital_Signature_Algorithm), etc.).
   - validity describes, in days, how long the key is valid for (in this case I wrote 10,000 days).
   - As part of generating the key you'll need to fill in personal details, and choose a password for the key.
3. Now let's sign the application, and to shorten the command, move the apk file and the key to the same folder, and write in the terminal (or Cmd) the command `jarsigner -verbose -keystore myKeyName.keystore appName.apk aliasName`.
   - myKeyName is the name of the key we created in the section above.
   - appName is the name of the apk file.
   - aliasName is the alias of the key you wrote in the section above.
   - Note that during signing you'll need to enter the key's password.

&nbsp;

## 4. Framework

In object-oriented programming there's a library that connects all the parts of the system into a single system, this library is called a Framework.

The Android system is written in Java, which is an object-oriented language, so Android also has a Framework. The Android AOSP Framework comes built into apktool's library, but as part of the changes the various manufacturers make to the system, they also make changes to the Framework, so if we want to open Apk files from Samsung, HTC, etc., we'll need to update their Framework files.

To update, you need to extract the framework-res.apk file (from the `system/framework/` directory).

- On Samsung devices, we'll need the framework-res.apk file and the twframework-res.apk file.
- On HTC devices, we'll only need the com.htc.resources.apk file.

We place the files in the apktool folder, and to install them we write in Cmd (or the terminal) `apktool if framework-res.apk`.

- If the command is written on Linux, add /. before apktool.
- if is short for install framework.

If the Framework was installed successfully, we'll get the result: `I: Framework installed to yourPath 1.apk`.

&nbsp;

## 5. Look Inside

Now that we've opened the Apk file we can make a variety of changes. For example, the res folder contains the application's resources, such as images, xml files, etc.

In the example on the left, I opened the Youtube application and went into the res folder, then into the values folder, and opened the settings file with [Notepad++](http://notepad-plus-plus.org/) (if you use some Linux distribution, I recommend the [Sublime Text 2](http://www.sublimetext.com/2) editor), and translated a few of the buttons (note that you translate what's in black, between the <>, you can see the mark in the image).

In addition, applications are made up of images, whether it's a background, buttons, etc. You can edit them with Photoshop (or Gimp), in the example on the right I opened the Shazam application and colored the app's familiar background (which is an image) red (why? because I can (; ).

And as we said, the system is made up of Apk files, so you can translate the entire system this way (the dialer app, messages, contacts, settings, etc.), if you open (with Winrar or 7Zip) the Rom you downloaded (which is actually a zip file) you'll notice there's a folder called system, and inside it a folder called app where all the Apk files we've talked about are located.

- In addition, the fonts folder contains the fonts (starting from Android 2.2 there are Hebrew fonts, but you can replace them with a different font if you'd like).
- The media folder contains notifications, ringtones, and system files (like the camera's shutter sound, etc.).
- The framework folder contains the framework.res.apk file which is responsible for translating the rest of the system (in places that don't belong to specific Apk files like the dialer), for example: the power-off menu, confirmation buttons, lock screen, etc.

&nbsp;

## 6. Summary

I hope the guide was clear and that you managed to do what you wanted without errors. I highly recommend sharing your results on various forums (you could save time for someone else who wants to make the same change). If you have any questions or ran into any error I'll be happy to try to help in the comments.
