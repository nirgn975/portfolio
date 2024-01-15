---
title: "Like A Spy With Hak5 Toys"
pubDate: 2020-10-01T09:00:00+03:00
draft: false
tags: ["spy", "screen crab", "key croc", "cloud c2", "hacking", "hak5", "white hat", "pen test", "digital ocean"]
category: "hacking"
featuredImage: "/posts/2020/like-a-spy-with-hak5-toys/spy-cover.webp"
---

One of the things you always see in spy movies is how the main character plant a covert device to monitor the user computer (screen and keystrokes). As a kid I thought "This is very cool!", and I always wanted be able to do this. [Hak5](https://hak5.org) making it very easy to accomplish with a combination of couple of their ~~toys~~ tools.

What we'll do is to connect 2 devices, the [screen carb](https://shop.hak5.org/products/screen-crab) to see the user screen (video stream, in real time), and a [key croc](https://shop.hak5.org/products/key-croc) to key log the user keystrokes.

&nbsp;

## 1. C2 Cloud

Before we even start to mess around with the physical toys, let's create a C2 Cloud instance on the cloud. You can do it on your local machine, but let's pretend this is a real operation and in a real environment we don't want the target to connect directly to our machine and we don't want to expose our local machine to the internet.

> Cloud C2 is a self-hosted web-based command and control suite for networked Hak5 gear that lets you pentest from anywhere.

I chose to do it in [digitalocean.com](https://digitalocean.com) because they're easy, cheap and I love their community and open source support. So, their VPS called `droplets`, after you registered and confirmed your email, you'll see it at the top of the left side menu. When you're at the [droplets page](https://cloud.digitalocean.com/droplets) you'll have a _"Create Droplet"_ button right at the center of the page (if you don't have any, if you already have some, you'll see it as a green button at the top of the page).

We'll choose an Ubuntu distribution, a basic plan (shared cpu, the $5/month should do the job), and add a volume (I chose to add 20GB, I think it'll be enough for all the loot). Now you can choose whichever datacenter region you want, and don't forget to add you SSH key.

![My digital ocean droplet configuration](/posts/2020/like-a-spy-with-hak5-toys/digital-ocean-create-droplet.webp "My digital ocean droplet configuration")

We have two ways to create the C2 instance, use the instance public IP (your droplet will receive one right after it will start) as a `hostname` or use a DNS name. I'll use the DNS name way, so we can add https support with [Let's Encrypt](https://letsencrypt.org). If you choose to do this the way I do it, you'll need a domain. I'll use `cloud-c2.dev`, and I'll create a custom DNS A record, so [https://cloud-c2.dev](https://cloud-c2.dev) will point to the instance public IP.

![Google Domains custom record](/posts/2020/like-a-spy-with-hak5-toys/google-domains-custom-record.webp "Google Domains custom record")

You'll need to wait a little (probably couple of hours) to let the DNS propagation to finish, plus [Let's Encrypt](https://letsencrypt.org) DNS seems to take a little bit longer then the Google ones (keep it in mind in case you encounter `TLS handshake error from **** acme/autocert: missing certificate` error).

To download the [c2 community edition from hak5](https://shop.hak5.org/products/c2#c2-versions) you need to choose _"FREE DOWNLOAD"_ and then to checkout, at the end of the checkout process you'll get an email with the download link and a license key, save it somewhere safe.

![Hak5 C2 Email](/posts/2020/like-a-spy-with-hak5-toys/c2-email.webp "Hak5 C2 Email")

Lets finish our droplet setup by opening the relevant ports. Click on the _"Networking"_ tab at the left menu, and from there go to the _"Firewalls"_ page. Click on _"Create Firewall"_ button, give it a name and add couple of inbound roles:

- Port `2022` so the Hak5 gear will be able to communicate with our C2.
- Port `443` so we can open our C2 dashboard in the browser with SSL/TLS.
- Port `80` so [Let's Encrypt](https://letsencrypt.org) can validate the the domain and put back the certificate.

![My Digital Ocean firewall configuration](/posts/2020/like-a-spy-with-hak5-toys/digital-ocean-firewall.webp "My Digital Ocean firewall configuration")

Don't forget to add our droplet in _"Apply to Droplets"_ input, right before the green _"Create firewall"_ button at the bottom.

Now the fun part begins, let's ssh to our server (replace `<DROPLET-IP>` with your droplet ip, in my case it's `165.227.156.17`).

```bash showLineNumbers title=" "
ssh root@<DROPLET-IP>
```

![SSH into droplet](/posts/2020/like-a-spy-with-hak5-toys/ssh-to-droplet.webp "SSH into droplet")

And install the `unzip` package so we can unzip the `zip` file we'll download with all the edition for Windows, Mac and Linux of C2 from Hak5.

```bash showLineNumbers title=" "
sudo apt install unzip
```

Now let's build a command to download the c2 (you can get the download URL from the email), save the file in the name `c2.zip`, unzip it, and run the relevant binary for our OS with the `hostname` point to our domain, and the `https` flag so [Let's Encrypt](https://letsencrypt.org) will automatically create a certificate for us.

```bash showLineNumbers title=" "
wget https://c2.hak5.org/download/community -O c2.zip && unzip c2.zip && ./c2_community-linux-64 -hostname cloud-c2.dev -https
```

The first time C2 runs, a database file is generated (named `c2.db` by default) in the same directory as the C2 binary. In that first run you'll see it print a _"Setup token"_, copy it, we'll need it to continue the setup process.

![First C2 Run](/posts/2020/like-a-spy-with-hak5-toys/c2-is-running.webp "First C2 Run")

Now, when we head over to [https://cloud-c2.dev](https://cloud-c2.dev) we can see the initial setup of C2. Now you'll need that setup token that the C2 generated in the first run, and also the license key.

![Cloud C2 initial setup](/posts/2020/like-a-spy-with-hak5-toys/cloud-c2-initial-setup.webp "Cloud C2 initial setup")

&nbsp;

## 2. Screen Crab

> A stealthy video man-in-the-middle that captures screenshots or videos to disk and streams live to the Internet for remote viewing.

The Screen Crab is, by default, save photos every couple of seconds to the SD card that you plug in the back of the device. But to get the most out of this device you need to connect it to the Cloud C2 dashboard, then you'll be able to to remotely view configure and manage the device.

It quit simple to do this, let's go to the `devices` tab, and then (if you don't have any device enrolled yet), you'll see a big blue button says _"Add Device"_.

![Add a new device](/posts/2020/like-a-spy-with-hak5-toys/c2-add-device.webp "Add a new device")

Then, call the device what ever you want, and choose the type, in our case right now it's _"Screen Carb"_, and click _"Add Device"_. After you did it, you'll see it in the list at the same `devices` page, click on it to configure the device.

At the left side a menu will be opened, click on the _"Setup"_ button and then _"Download"_, a file named `device.config` will start to be downloaded, copy this file to the root of the Screen Carb SD card.

![Screen Carb setup](/posts/2020/like-a-spy-with-hak5-toys/screen-carb-setup.webp "Screen Carb setup")

Also, create a file named `config.txt` and in it add the wifi configuration. The first parameter is the network name (SSID), and the second one is the network password. Note that if your network or password contains spaces or special characters you'll need to add a back slash (`\`) at the start of each and every one of them.

1. WIFI_SSID – the network name
2. WIFI_PASS – the WPA-PSK password

For example:

```txt title="config.txt"
WIFI_SSID This network
WIFI_PASS The P@$$word!!
```

Will be:

```txt title="config.txt"
WIFI_SSID This\ network
WIFI_PASS The\ P\@\$\$word\!\!
```

After you created this file, add it to the root of the SD card that goes into the Screen Carb (together with `device.config`). In my case I just add the configuration of my home wifi, but in a real environment I would add a simple old android device in the bathroom floor and create an AP from him, or a simple raspberry pi with an expansion card, or even crack the wifi password of that office in advanced.

Now we're ready to connect our device to any HDMI (computer screen, projector, a conference room tv, chromecast, etc). We need to connect the input HDMI to the port in the antenna (and the button) side, and the output (to the screen/tv/projector) to the port on the other side (where the usb-c port located). And finally the usb-c port to a power source.

After all is connected, we'll see a green light from the LED of the device for about 30 seconds. Then, a cyan color when it's connecting to the wifi, and finally a solid blue color when it have input from the HDMI port. And couple of seconds after that we can see our Screen Crab is online and connected to our C2.

![Screen Carb is online](/posts/2020/like-a-spy-with-hak5-toys/screen-crab-is-online.webp "Screen Carb is online")

When we toggle the `streaming` button we'll get the screenshots in live and can see everything right as it's happen. And if we want to download one of the images to our local machine we have all of them in the _"Loot"_ tab in the left menu.

![Screen Carb configuration](/posts/2020/like-a-spy-with-hak5-toys/screen-crab-configuration.webp "Screen Carb configuration")

{{< admonition type=bug title="Debugging" open=true >}}
If you encounter with some problems, you can add `DEBUG_LOG ON` as a third line in the `config.txt` file and the Screen Crab will save the the logs to a `crab.log` file so you can see what going on.

Another way is to just reset everything by delete all of the files the Screen Crab will create on the SD card (except from the `config.txt` and the `device.config` that we add earlier).
{{< /admonition >}}

&nbsp;

## 3. Key Croc

> A keylogger armed with pentest tools, remote access and payloads that trigger multi-vector attacks when chosen keywords are typed.

The Key Croc is the second part of our spy tool, because we don't want to get just the screen, we want the keystrokes too. And with the Key Croc we can even trigger stuff with it and inject keystrokes to the target computer, but this is out of scope for this post.

Plug your Key Croc to the computer and click on the hidden key at the back of the device with a sim tool or a paper clip, then the light of the LED will turn off and then turn on with a blue color. This means the device is in arming mode - the device will emulate both a serial device and USB flash disk, so it's easy to just see a new look inside the drive.

![The Key Croc drive](/posts/2020/like-a-spy-with-hak5-toys/key-croc-drive.webp "The Key Croc drive")

Let's connect our Key Croc to our C2. Go to the C2 dashboard and add a new device in _"Devices"_ page, choose the _"Key Croc"_ as the device type, and then enter to the device configuration page. From there just hit the _"Setup"_ button at the left menu and a `device.config` file will be downloaded, as with the Screen Crab, this file should go to the root directory in the Key Croc.

And let's add our wifi configuration so it would be able to connect to our C2 server. Like with the Screen Crab we need to edit the `config.txt` file (we already have the file in this case, and there're quit a few comments in there), we'll uncomment the `WIFI_SSID` and `WIFI_PASS` lines and add our wifi configuration there, in the same exact way we did with the Screen Crab, but in this case we have a new option to play with, an ssh one, so we can connect to the Key Croc via ssh and program it on the fly!

```txt title="config.txt"
WIFI_SSID This\ network
WIFI_PASS The\ P\@\$\$word\!\!
SSH ENABLE
```

We're ready to connect the device to a test keyboard. When we plug the device in, the LED is white, and once we connect the keyboard dongle to the usb of the Key Croc, the LED is turned off - which says that we're in business. Couple of minutes later and we have a connection to our C2.

![Key Croc is connected to our C2](/posts/2020/like-a-spy-with-hak5-toys/c2-key-croc-online.webp "The Key Croc is connected to our C2")

In the Key Croc configuration we can see live keystrokes (and the history), enable `QUACK` mode - which enable us to inject keystrokes using the Hak5 Ducky Script, view the payloads on the device and create new ones (Hak5 have a [repo with all the open source payloads](https://github.com/hak5/keycroc-payloads) people created for the Key Croc with the Ducky Script), and even open an ssh to the device.

![Key Croc configuration](/posts/2020/like-a-spy-with-hak5-toys/key-croc-configuration.webp "Key Croc configuration")

The Key Croc can literally be programmed to `match` keystrokes so every time the user type something we save the next `n` number of keystrokes or even the last `n` number of keystrokes (before the user typed that `match` string/regex). This is so powerful because now we don't have to filter from so much garbage like we usually need to with keyloggers.

&nbsp;

## 4. Cleanup

Everything is connected and working, but soon as we'll leave our Digital Ocean server, our C2 will stop. We need a way to keep it going without connecting to the server and run it manually (it also will stop if we'll get an error or something similar) - and the right way to accomplish it is with [systemd](https://en.wikipedia.org/wiki/Systemd).

> `systemd` is a suite of basic building blocks for a Linux system. It provides a system and service manager that runs as PID 1 and starts the rest of the system.

First we're going to move the c2 file to `/usr/local/bin`. Why this directory? Because this is the directory in linux for programs that normal user may run. _"usr"_ - **U**NIX **S**ystem **R**esources, the location that system programs and libraries are stored. _"local"_ - for resources that were not shipped with the standard distribution. _"bin"_ - binary compiled executables.

```bash showLineNumbers title=" "
sudo mv c2_community-linux-64 /usr/local/bin
```

and then to create a new directly (in `/var`) for our database (the `c2.db` file that was automatically created). Why in `/var`? Because according to linux it's abbreviation is _"variable"_, and it should contains things that are prone to changes (such as websites, temporary files (`/var/tmp`) and databases).

```bash showLineNumbers title=" "
sudo mkdir /var/c2
sudo mv c2.db /var/c2
```

Now we need to create a new `systemd` service. This is the "right way" to keep the process alive once we leave the ssh connection, because this way (with `systemd`) if it crash the `systemd` will automatically reboot it and also we can capture the process logs to check what happened.

```bash showLineNumbers title=" "
sudo touch /etc/systemd/system/c2.service
nano /etc/systemd/system/c2.service
```

And paste the text below (change the `cloud-c2.dev` to your domain name), save and exit nano.

```txt
[Unit]
Description=Cloud C2
After=c2.service
[Service]
Type=idle
ExecStart=/usr/local/bin/c2_community-linux-64 -hostname cloud-c2.dev -https -db /var/c2/c2.db
[Install]
WantedBy=multi-user.target
```

All we have left to do is to reload the `systemd` daemon, enable the new service we just created (if it's not enabled the service will start and stop only when you write the commands to start and stop it, if it's enabled it'll automatically start when the server is back up), and finally start it.

```bash showLineNumbers title=" "
sudo systemctl daemon-reload && systemctl enable c2.service && systemctl start c2.service
```

You can check the status of the service we created with the `status` command of `systemctl`.

```bash showLineNumbers title=" "
sudo systemctl status c2.service
```

![systemd service runs our c2 successfully](/posts/2020/like-a-spy-with-hak5-toys/systemd-service-running.webp "systemd service runs our c2 successfully")

&nbsp;

## 5. Summary

That's it, we are spies now :joy: . Everywhere will go we can implant those devices and see and read what's going on, even insert some keystrokes and cause a mayhem. In the right time and the right place, it can be very valuable. But we're just playing around here and learn new stuff, because it's fun and cool.

I don't know what about you, but I had really fun playing Q (from James Bond) for a day.
