---
title: "Elliot In The Meta"
description: "Recreating a Mr. Robot-style social engineering hack with Metasploit (draft)."
image:
  src: /posts/2026/elliot-meta/cover.webp
author:
  name: Nir Galon
  to: https://x.com/nirgn975
  avatar:
    src: /avatar.webp
date: 2026-02-21
badge:
  label: metasploit
draft: true
---

In the (great) show [Mr Robot](https://en.wikipedia.org/wiki/Mr._Robot) Elliot hacked his therapist's boyfriend's email account by calling him and pretending to be someone from his bank and asking him for some general info. And maybe you'll say it's not "real", but most breaches we hear about start with OSINT, phishing, and/or social engineering (e.g. gathering information, and tricking or outsmarting the target).

So I thought to myself it'll be a great exercise to try and mimic this attack, and also a great opportunity to dive deeper and learn one of the most famous tools out there in the pentest community: [Metasploit](https://www.metasploit.com).

&nbsp;

## 1. Metasploit
