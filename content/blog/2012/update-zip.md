---
title: "Create an update.zip file"
description: "Building a flashable update.zip file for Android Recovery in 5 steps."
image:
  src: /posts/2020/jekyll-starter-kit-generator-3.x.x/github-social-coding.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2012-12-16
badge:
  label: Android
---

I assume the most common and lighthearted example is the battery mod. For some reason in Android (don't ask me why, I don't know) the battery doesn't have percentages, only a drawing that gives us a (pretty rough) estimate of the battery's state (even though the system knows exactly how many percent it has, they're just not shown in the top bar). That's why the most popular file people flash is the "battery with percentages" mod (and sometimes a different battery drawing too).

Note that you can see in the post [Analyze an Apk file](/blog/2012/analyze-an-apk-file/) a bit more information about opening and modifying applications (apk files). In addition, I'll mention that this guide is general, you can put inside the zip file a boot animation, an apk we modified, a mod to change the battery display, basically anything. In this case I'll demonstrate with a BootAnimation file I created for myself.

&nbsp;

## 1. How do you build a zip file that can be flashed in recovery?

**Step one, preparations:**

- The first thing we need is the file / files we want to add to the Rom (in my case it's the file I prepared for myself: BootAnimation.zip).
- Now we need to download the Testsign.jar file which will help us sign the zip, and it can be downloaded [from here](https://code.google.com/p/zen-droid/downloads/detail?name=testsign.jar&can=2&q=label%3AType-Executable).
- And last, we need to decide where (to which path) the files we want to add will go (in my case to the path `system/media/`).

&nbsp;

**Let's get to work:**

1. Open a folder with the name of the path it's going to. In this example we need to prepare a folder called media, and put the BootAnimation.zip file inside it. Note that it doesn't matter where we prepare the folder, you can open a new folder anywhere you'd like, even just on the desktop.
2. Now we need to prepare a few more folders, following the path `META-INF/com/google/android`, and inside it open a new text file in [Sublime](http://www.sublimetext.com/2) and name it `update-script`. This is the path Recovery goes to look for the update-script file, and it will read this file for the instructions, or "what to do".
3. Open the file and copy into it:

```shell [update-script.txt]
ui_print("Applying New Bootanimation");
run_program("/sbin/busybox", "mount", "/system");
delete("/system/media/bootanimation.zip");
package_extract_dir("media", "/system/media");
run_program("/sbin/busybox", "umount", "/system");
ui_print("New Bootanimation Installed");
```

And the last step is to understand what we wrote, for that we'll break the code down line by line and explain what's going on here:

- **The first line:** `ui_print("Applying New Bootanimation");` prints what's inside the quotes (which are inside the parentheses). This line isn't essential, the file will work without it too, but it's more elegant, clean, and lets whoever installs the script understand what's happening right now.
- **The second line:** `run_program("/sbin/busybox", "mount", "/system");` runs busybox which makes the `system/` folder writable (so we can write to it).
- **The third line:** `delete("/system/media/bootanimation.zip");` deletes the bootAnimation.zip file located at the path `system/media/` (so we can write the new file).
- **In the fourth line:** `package_extract_dir("media", "/system/media");` we tell the device to find, inside our file (the Package), the `media` folder (inside the folder where we put the bootAnimation.zip file) and move its contents to the path `system/media/`.
- **In the fifth line:** `run_program("/sbin/busybox", "umount", "/system");` we run busybox again and give it the umount command on the `system/` folder.
- **The sixth line:** `ui_print("New Bootanimation Installed");` like the first line, prints a message to the user.

&nbsp;

_Tip:_ A guy on XDA wrote a small program that can do this whole process for you. It's always better to know how everything is done and the lines of code, but this is a fairly technical operation, and the program definitely helps save time and simplify the process (especially for people who do this every day). In addition, the program has a few more options that can help. Here's the [link to the post on XDA](http://forum.xda-developers.com/showthread.php?t=1248486).

&nbsp;

## 2. Summary

In a few steps you've prepared a file that can be flashed through Recovery and in which you can put anything you want (new Apk files to flash, replacing existing apk files, various mods, add-ons, a new Rom, etc.).

Note, that when you're changing something existing, for example an Apk file, you need to delete the old file first, and only then copy the new Apk file (as I demonstrated in this case, the delete line comes before the copy line for the file). If it's new files you simply need to copy them and not write the delete line.
