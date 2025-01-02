---
title: "Microservices is more art than science"
pubDate: 2022-12-01T09:00:00+03:00
draft: true
tags: ["microservices", "pub/sub", "events", "kafka"]
category: "hacking"
featuredImage: "/posts/2024/getting-to-know-my-neighbors/cover.webp"
---

Recently I found myself more in a software architecture role then a software engineer role, and as the startup I work for build their microservices I drawn more and more to read and learn about microservices architecture, specifically how microservices communicate between one another. In this post, I want to talk about a way to communicate called _"events"_, using [GCP Pub/Sub](https://cloud.google.com/pubsub).

&nbsp;

## 1. Setup
