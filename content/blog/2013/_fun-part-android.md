---
title: "The Fun Part of Android"
description: "How Android APKs are built, modified, and reverse-engineered with smali."
image:
  src: /posts/2020/jekyll-starter-kit-generator-3.x.x/github-social-coding.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2013-10-01
badge:
  label: Android
---

The following article was written for issue 45 of DW and can be downloaded [from here](http://www.digitalwhisper.co.il/files/Zines/0x2D/DigitalWhisper45.pdf).

&nbsp;

### Introduction

This article will explain in relative depth how the Android system works, how Apk files are built (images, strings, and smali parts), how Apk files can be modified, and finally, what they look like from a developer's point of view.

The purpose of the article isn't to explain how to open Apk files, and so as not to make the article overly long, if you'll allow me, I'll direct you to a post I wrote that explains in detail how to do that, using the Apktool software. [Analyze an Apk file]({% post_url 2012-11-18-analyze-an-apk-file %}).

So we're on the same page, I'll note that the package (app) I'll be working on later is the dialer; you can download mine [from here](http://www.lifelongstudent.io/files/Phone.apk).

<!--more-->

&nbsp;

### Let's start from the basics, how does Android really work?

First, let's distinguish between the terms. Everyone knows the famous diagram detailing the system's various layers (libraries), but that's not how it actually works (not exactly, anyway), rather it's how it's built. If we zoom out and look at the system's workings from a bird's-eye view, we'll understand that it works differently from other systems (not reinventing the wheel, but there are some clever tricks here).

&nbsp;

**To understand how it works, we need to understand how APK files work.**

What does that mean? Android as a system is a package of lines of code that run apps (or Apk files). Our dialer is an app (an Apk file) that, in this case, happens to be built into Android's source code. As an app, we can also remove it (so as not to create a mess, Google defined built-in apps as "non-removable", but that doesn't mean they're truly non-removable - with the right permissions, you can do anything). As a result, changes can be made to anything in the system, for example: you can remove the built-in dialer and install a different one from Play instead (e.g. Skype).

&nbsp;

### How are APK files built?

I won't argue about whether the term "app" is correct or not, but to understand it's better to call apps APK files, because what they actually are is packages, and these packages can contain 4 things:

1. **Activity -** An app is made up of many screens (Activities) that users move between (and usually each screen performs a different action). This screen is called an Activity (plural: Activities). The app's author basically writes several Activities, and using various buttons, the user moves between them, and when moving from app to app you move from Activity to Activity.

- _Example for understanding:_ You entered Gmail (you entered an Activity within the Package called gmail), from there you moved to the inbox (you moved to a new Activity within the gmail Package), from there you entered some email (you moved to another Activity within the gmail Package), and inside the email you clicked on some address (and from there you moved to an Activity within the Package called maps), and you saw that the address on the map has additional info, you clicked on it and it linked you to Wikipedia (so you moved to an Activity within the Package called chrome).
- The Activity (screen) is made up of buttons, text boxes, images, etc.; the Activity is designed via an XML document that lets us describe what the screen will look like and where each component will be placed. When moving from one Activity to another (e.g. within an app-package), the first Activity stops and the second Activity starts (but the system keeps the previous Activity on a stack - LIFO, last in is first out).

2. **Service -** The Service works in the background, and unlike the Activity, it has no user interface (it's described purely by lines of code and is invisible to the user). The Service helps us provide a service that our app comes to provide behind the scenes.

- _Example for understanding:_ The easiest example is the music package (app). The music package is made up of several Activities - we browse between songs and choose a song to play, and presumably then also move to a new Activity where you can rewind/fast-forward the song, stop it, play it, etc. But what happens when we leave the Activity (the music screen, and move for example to the Activity for sending a message) but want the music to keep playing in the background? The Service answers this situation. The Service is a component that runs in the background and comes to help us provide some service to the user, like continuing to play music.

3. **Content provider -** The Content provider manages access to the package's (app's) data set between one process and another. When a developer wants to access another app's data, they use an object called ContentResolver; it sends requests to the Content provider, which on the other end receives the request, performs the action, and returns the result.

- _Example for understanding:_ Contacts - we can develop an app that accesses the Contacts Content provider in order to access the package's data (in this case, our contact list) and ask it to read the list, modify it, etc.

4. **Broadcast receiver -** This component allows the developer to respond to various system events. The Android system releases various announcements during its operation; sometimes these announcements are intended for a specific Intent Filter, and sometimes they're simply "thrown into the air". This component lets us listen to announcements thrown out by the system and perform various actions in response to those announcements.

- _Example for understanding:_ I assume most of you know the app that pops up a small Popup window the moment we receive an SMS message. This app uses a Broadcast receiver - it's constantly listening to the system, and the moment the system announces it has received an SMS message, the app kicks into action and performs a few operations in order to pop up a notification on the screen showing the SMS content.

**Which app opens, when, why and how?** To understand a bit more deeply how Android works, we need to understand why one app opens and not another, and how the transition between Activities of package-A to package-B works.

&nbsp;

### So first, some concepts

**Intent and Intent Filter -** Every relatively large package (app) will usually contain a Service, an Activity, and a Broadcast receiver - these are the three core components of every package. All three are activated via messages called intents. An object of type Intent represents an intention of the user or of the operating system. There are 2 types of Intent - the first type is an Intent that clearly points to a specific Activity or Component, called an Explicit Intent.

<div class="left">
  <img src="/images/posts/fun-part-of-android/Intent_Filter_Browser.png" alt="Intent Filter Browser">
</div>

The second type is an Intent that doesn't clearly point anywhere, and you could say it's simply "thrown into the air". In such a case, the system (Intent Filter) will locate the Activity (or hardware component) it's aimed at using the Intent's attributes (which are Category, Action, and Data).

> The most common use of Intent is transitioning between Activities (UI screens within the package).

**Here's a situation:** on our device there are 2 dialers (the built-in dialer, and Skype); we're in the Contacts Activity and want to call a friend. Clicking on the contact and then on their number brings up a small window asking us to choose which app we want to use to dial the contact (via the built-in dialer or via Skype) - why does this happen?

When we click on the contact's number, we send an Intent "into the air" (the Intent isn't intended specifically for any Activity or hardware component). The Intent Filter locates the Activity (or hardware component) it's intended for based on the attributes mentioned above (Category, Action, and Data). In our case: the Action is performing a call. The Category is dialers. And the Data is the number we're going to dial.

The Intent Filter identifies 2 apps (packages) that match these attributes and can handle the task (the built-in dialer and Skype), and it's in a bind - there are 2 options, which to choose?  
The system has no preference, so a small Popup message pops up asking us to choose how to dial.

&nbsp;

### From the developer's point of view

To understand how these packages are built from the developers' point of view, I built a simple app made up of one Activity (one screen). On the left side we have the explorer with all the folders and files.

<div>
  <img src="/images/posts/fun-part-of-android/layout_main.png" alt="Main Layout in Eclipse">
</div>

- **The src folder:** This folder contains all the code and source files developed in the package, in JAVA.
- **The gen folder:** The R class is a class automatically generated by the ADT plugin, written in JAVA (generated independently, automatically). If we open it, we'll see tons of sub-classes according to the files we created in our project/package.
- **The android 4.2 folder:** This folder contains all the built-in packages (apps) that exist in Android, along with all their classes and methods. This way the developer doesn't need to create everything themselves, but rather makes use of existing classes and methods.
- **The Assets folder:** The 'assets' folder is used to store resources such as fonts (if needed), video files, sound files, etc.

&nbsp;

<div class="left">
  <img src="/images/posts/fun-part-of-android/Resolutions.png" alt="Resolutions">
</div>

**Resources:**

- **The "drawable-hdpi / ldpi / mdpi / xhdpi" folders** are folders that hold all the images the app needs. These are the same images but at different resolutions. And although there are many more resolution types in Android, these are the basic ones, and if we haven't created a folder for a specific resolution, when the user launches the app, the system will know to pick the image with the most suitable resolution and fit the image to the user's screen.
- **In the "layout" folder** is the Activity (screen) file I created, described via XML files. The XML files found in layout basically define the screen's arrangement.
- **The "Menu" folder** contains XML files for menus. Anyone who uses Android knows the three-dot button that represents the options/settings key. That's exactly what this is about - here the developer defines this key and its options.
- **The "values" folder** contains XML files with string values. Basically all the text strings in the app, which makes translation work for various languages easier since the languages aren't tied to the UI (in other words: not hard-coded).
- **AndroidManifest.xml:** The "AndroidManifest.xml" file contains all the relevant information about the package: starting from the package name (the app's JAVA package, which serves as a unique identifier for the app on Play), descriptions of the components the app is built from (the broadcast receivers, services, activities, content providers), explanations of the various classes and methods the app can perform (for example, the Intents the app can handle), a declaration of the minimum Android version the app can run on, a list of the libraries the app uses, and finally declarations of the permissions the app (package) needs (and if needed, also the permissions other apps need in order to work with it).

&nbsp;

### Opening and building an Apk

As noted in the introduction, the purpose of the article isn't to explain how to open Apk files, so, if you'll allow me, I'll direct you to a post I wrote that explains in detail how to do that, using the Apktool software. [Analyze an Apk file]({% post_url 2012-11-18-analyze-an-apk-file %}).

&nbsp;

### Take a look inside

<div class="left">
  <img src="/images/posts/fun-part-of-android/dial_num_7_wht.png" alt="Android Dial Number 7 png">
</div>

After opening the file, we get a folder named Phone (I chose to name the folder after the package's original name), but here we'll see the file is built a bit differently from what we saw above (from the developer's perspective) - now we're seeing the project/package in its final form (after being compiled by the Dalvik compiler from bytecode, which resulted from compiling the Java code).

**Let's start playing:**  
Let's open the dialer's Activity - so as we said, the Activity will be found at path `res/layout`, and we'll open the file dialpad.xml. Here's the line for the 7 button:

```java
<ImageButton android:id="@id/seven" android:src="@drawable/dial_num_7_wht" android:contentDescription="@string/description_image_button_seven" style="@style/DialpadButtonStyle" />;
```

And the button's image was taken from the `drawable-hdpi` folder, and you can see (based on the reference in the XML above) that its name is dial_num_7_wht (the image at the top left).

<div class="left">
  <img src="/images/posts/fun-part-of-android/Strings.png" alt="Strings">
</div>

As we said, text strings in the app are written in a different document, in an XML file called strings, and this file will be in the `values` folder (each language has its own values folder, combined with the 2-character country code). The strings.xml in Hebrew will be in the `values-iw` folder.

Here's part of the file's content (highlighted in green is the description for button 7):

And this way we can perform a variety of other changes, such as: changing the app's background, changing the various icons and images, if the app isn't in Hebrew - translating or changing the existing translation, etc.

In addition, it should be noted that within the system itself you can change an additional variety of things:

- Add / change fonts, found at path: `system/fonts/`.
- Device notifications, ringtones, system sounds (the camera click, low battery, dock connection, etc.) at path: `system/media/audio/`.
- The system's boot animation is found at path: `system/media/`, and editing it is very simple.
- If you want a certain app to not be removable (like system apps), simply move its Apk file to path: `system/app/` (regular apps are installed in the `DATA/app` folder with rwxrwx—x permission, while the `system/app` folder has rwxr-xr-x permissions).
- If you want to change the touch buttons (on Nexus devices), these are images found in SystemUI.apk.

&nbsp;

### The interesting part

When we opened the Apk, we got a folder with a few files and folders; one of the interesting folders is the smali folder, where all the magic is. Smali are bytecode files (not JAVA bytecode, but Dalvik bytecode) - the low-level language corresponding to Dalvik (Android's virtual machine), (you could say they're the equivalent of assembly).

Since the dialer app is large and complex, let's separate out the DW.apk file I built for the demonstration in the previous section ("from the developer's point of view") - it's a simple file that does nothing except display one Activity with `Hello world!` written on it. You can download the file [from here](http://www.lifelongstudent.io/files/DW.apk).

You can see that the smali library contains subfolders defining the unique identifier - mine is `com.example.dw`.

Let's enter the `dw/example/com/smali` folder. In the dw folder, you can see two types of files - those with a "$" sign in the name and those without:

- Files without the $ sign are a regular JAVA class.
- The $ sign in the file name indicates that this is an inner JAVA class within the file that comes before the $ (meaning the file R$id.smali is an inner class in the file R named id).
- The files without the $ sign are the file R.smali and the file Main.smali.

&nbsp;

The Main.smali file is our Activity (designed via an XML file at path `res/layout`), and the R.smali file is a file created automatically that maps the app's resources - meaning when the developer wants to reference, for example, a button, a string, a layout, or a certain image (from the drawable folder), they reference it from the R class.

**Let's look inside the Main.smali file:**

```java
.class public Lcom/example/dw/Main;
.super Landroid/app/Activity;
.source "Main.java"

# direct methods
.method public constructor &lt;init&gt;()V
    .locals 0

    .prologue
    .line 7
    invoke-direct {p0}, Landroid/app/Activity;-&gt;&lt;init&gt;()V

    return-void
.end method

# virtual methods
.method protected onCreate(Landroid/os/Bundle;)V
    .locals 2
    .parameter "savedInstanceState"

    .prologue
    .line 11
    invoke-super {p0, p1}, Landroid/app/Activity;-&gt;onCreate(Landroid/os/Bundle;)V

    .line 12
    const/high16 v0, 0x7f03

    invoke-virtual {p0, v0}, Lcom/example/dw/Main;-&gt;setContentView(I)V

    .line 13
    return-void
.end method

.method public onCreateOptionsMenu(Landroid/view/Menu;)Z
    .locals 2
    .parameter "menu"

    .prologue
    .line 19
    invoke-virtual {p0}, Lcom/example/dw/Main;-&gt;getMenuInflater()Landroid/view/MenuInflater;

    move-result-object v0

    const/high16 v1, 0x7f07

    invoke-virtual {v0, v1, p1}, Landroid/view/MenuInflater;-&gt;inflate(ILandroid/view/Menu;)V

    .line 20
    const/4 v0, 0x1

    return v0
.end method
```

&nbsp;

**Let's break the code into parts:**
In the first three lines there are declarations of the class.  
From line 5 to 14 we see the constructor method.  
From line 16 to 32 we see the onCreate method (responsible for what happens when the Activity is launched).  
From line 34 to the end we see the onCreateOptionMenu method (responsible for the top bar in the Activity, the panel).

The constructor seems to appear out of nowhere, but that's because the class will always extend the Activity class (you can also see this in the second line, based on the super reference to Activity), and therefore it inherits the Activity's constructor. If we look at the onCreate method, we can see it's no different from its Java equivalent. The method is protected, its name is onCreate, and it receives a parameter named savedInstanceState of type Bundle (if there are several parameters, they'd be separated by a semicolon), and at the end the method returns void.

It's easy to identify that returned object types begin with L and are written in the full namespace. Variables, on the other hand, appear in the following format:

- V - denotes void.
- Z - denotes boolean.
- B - denotes byte.
- S - denotes short.
- C - denotes char.
- I - denotes int.
- J - denotes long (64bit).
- F - denotes float.
- D - denotes double (64bit).

These are the basic variable types, and anyone more interested can keep reading [here](https://source.android.com/devices/tech/dalvik/dex-format.html) (search for the first "ShortyDescriptor").

A line after that, we see "locals." and a number - this line instructs the Dalvik VM how many registers to use. In addition, smali uses "v" and "p" for local registers or parameter registers (respectively).

Dalvik's opcodes are pretty clear, though there are tons of them. So I'll note here the important ones, and whoever wants to see the full list can go [here](http://developer.android.com/reference/dalvik/bytecode/Opcodes.html).

- `invoke-super {vx, vy}` – calls the method in the class of the instruction on object vx and passes the parameter(s) vy.
- `invoke-virtual {vx, vy}` – calls the virtual method on object vx and passes the parameter(s) vy.

&nbsp;

Let's add a popup message ([Toast](http://developer.android.com/guide/topics/ui/notifiers/toasts.html)) with the text Hack - we'd need to add it in smali, and honestly I have no idea how to write in smali, so here's the line in Java:

```java
Toast.makeText(getApplicationContext(), “Hack”,
Toast.LENGTH_SHORT).show();
```

Let's add it to the app, compile, export, open with apktool, and see the smali code we get - it should look like this:

```java
invoke-virtual {p0}, Lcom/example/dw/Main;-&gt;getApplicationContext()Landroid/content/Context;
move-result-object v1
const-string v2, "Hacked!"
const/4 v3, 0x0
invoke-static {v1, v2, v3}, Landroid/widget/Toast;-&gt;makeText(Landroid/content/Context;Ljava/lang/CharSequence;I)Landroid/widget/Toast;
move-result-object v1
invoke-virtual {v1}, Landroid/widget/Toast;-&gt;show()V
```

Let's add it at line 31, after "line 13." and before "return-void" (we're adding the Toast under the onCreate method, since we want the message to pop up right when we launch the app). Don't forget to raise the number next to "locals.", since we'll be using one more register. Let's save, rebuild the app, and sign it (again, go back to [Analyze an Apk file]({% post_url 2012-11-18-analyze-an-apk-file %})).

Transfer the app to the device, install it, and check that it works.

&nbsp;

### Summary

To conclude, we learned how the Android system works behind the scenes, we saw how Apk files are built from the developer's point of view, we opened Apk files, played around with XML files, and did a bit of reverse engineering by working with smali files.
