---
title: "Simple Twitter - Chapter 2: Planning"
date: 2020-04-22T14:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"

tags: ["twitter", "development", "mvp", "database", "collection", "architecture", "api", "schema"]
categories: ["development"]
hiddenFromHomePage: false

featuredImage: "/images/posts/2020/chapter-2-simple-twitter/simple-twitter-cover.jpg"
featuredImagePreview: ""

toc: true
autoCollapseToc: false
math: false
lightgallery: true
linkToMarkdown: true
share:
  enable: true
comment: true
---

Something about this chapter.


## 1. Planning Our MVP

What is even mean MVP? MVP is an acronyms of minimum viable product. It's a development technique in which a new product is developed with sufficient features to satisfy early adopters. The final, complete set of features is only designed and developed after considering feedback from the product's initial users.

An MVP has three key characteristics:
1. It has enough value that people are willing to use it or buy it initially.
2. It demonstrates enough future benefit to retain early adopters.
3. It provides a feedback loop to guide future development.

Let's start to think about the minimal number of futures, from a high point of view, we need on Twitter.

### 1.1. User

- We need users of course, they should have a way to sign-up and login with a username and password. We should validate their account by sending an email to their email address.
- Every user should be able to do something called Tweet, send a public message that is limited to 140 characters.
- Every user should have a profile page, with their basic information, and a list of all their tweets ordered from the last one by time (timeline page).
- Every user can follow and be followed by other users.
- Every user have a feed.

### 1.2. Following and Followers

- When a user decide to follow some other user, he will see all of his tweets from the begging (and not from when he start to follow that user).

### 1.3. Tweet

- Every tweet should be limited to 140 characters.
- Every tweet should have replays, they are also a tweet, so they are also limited to 140 characters.
- Every tweet have a `like` counter, which reflects how many people are liking the content of the tweet.
- Everyone can see the `like` counter and the list of people who `like` that tweet.
- A tweet will contain only text and images.
- All tweets need to be linkable (have a unique link people can share).
- When enter a tweet the user should be able to see all of the comments (also other tweets) of that tweet.

### 1.4. Replays

- A replay should be seen in the feed as a tweet.
- It should reflect to which tweet the current tweet is replay to.
- When enter to a replay, the user should be able to scroll up and see the original tweet this tweet is replays to.

### 1.5. Feed

- The feed will be custom to every user.
- The feed will show the tweets and replays other users tweeted. The only tweets that will be shown on the user feed are tweets from people he follows (not random people and not people who are follows him).

### 1.6. What we are not want to do for this MVP

This may not seem like a lot of work, but it does. We don't want to do things we don't know if our users will use. And the strongest reason to not build those features is that this book needs to end sometime soon (:

- We don't want to `retweet`.
- We don't want to add gifs or videos to a tweet.
- We don't want to quote a tweet.
- We don't want to send a private tweet (DM).
- We don't want to `pin` tweets.
- We don't do `Trends`.
- We don't suggest new people to follow.
- We don't plan to scale for 1 billion users, not even close to that. We'll think about performance but it's not the purpose of this book, so don't get distracted.

I think we have a good set of features, let's plan our architecture and database in the next chapter.

&nbsp;

## 2. Architecture

The next step we need to do is to plan our architecture. The first thing I decide is to use as much SASS I can. The reasons are:

- I'm a one man show here and I can't do everything alone.
- Most of the times it's better to pay to experts to do what they're do best, and do not get distracted from our product.
- This book needs to end sometime, it cannot cover all the things.

So, we're not going to host our website ourselves, we'll need [Google Cloud Platform](https://console.cloud.google.com/) (GCP for short). If it's your first time on their platform they're offer a credit worth $300, so just use your gmail and don't worry about payment, if you're already used your credit, you have 3 options:

1. Keep the uses on their products limited to the [free tier](https://cloud.google.com/free).
2. Open a new Google account just for this project.
3. Pay the bill.

The services we're going to use on GCP are:

- [Kubernetes Engine](https://cloud.google.com/kubernetes-engine) will manage our backend via a Docker containers (more on that in the future), and load balance between couple of backend instances (replicas), check our containers health, etc.
- A [Storage](https://cloud.google.com/storage) to create a 2 buckets, first to store our Client/UI (angular files, static files). Second to store all of our media files (mainly pictures).
- [Logging](https://cloud.google.com/logging) to collect all of the logs we print to the stdout.
- [Error Reporting](https://cloud.google.com/error-reporting) to collect all of the errors that are logged to the stdout.
- [Monitoring](https://cloud.google.com/monitoring) to monitor our API and alert us if anything goes wrong.
- [Cloud](https://cloud.google.com/cloud-build) Build to build our Docker images and `apply` them to Kubernetes.

### 2.1. Database

Our database of choice is MongoDB. On our local machine we'll use a single node of Mongo and Robo 3T as our GUI (to see what is going on inside of our database easily). But on the cloud we don't want to create an instance of MongoDB and manage it alone (update it, manage master/slave instances, automatically backup, round [robin backups](https://en.wikipedia.org/wiki/Round-robin_scheduling), check once in a while a backups is good and we are able to restore from it, etc).

So in the our production we're going to use MongoDB cloud called [Atlas](https://www.mongodb.com/cloud/atlas/lp/try2). We'll talk about that when we'll be ready to upload our project to the cloud.

### 2.2. Architecture Schema

Here is our schema:

![git bash output](/images/posts/2020/chapter-1-simple-twitter/macbook_git_installed.jpg "git bash output")


Every request to our website in going to first hit our frontend bucket (our angular app). From there we'll do a request to our backend to get the data we need, using a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) we'll write. Some of our endpoint will be protected (for example to post a tweet for a user we need to verify the request is sent from that user, we'll a `token` to do that, more on that in the future). From our backend we'll go to our database (MongoDB in our case) to get the data we need, we'll probably do some other things and then return a response to our client (frontend), everything we'll do on our backend (or server) we'll log to `stdout` so other services on the cloud (that we'll setup) will be able to collect and analyze our logs to give us a picture on what is happening on our product. That will also help us to monitor it, and catch and fix bugs.

Last thing is our media bucket. It'll store media files we'll upload from our backend service. When we'll return a response to our frontend (client), some of the response will be pure data that we'll show to the user, and some will be URL for picture and a like. Some of the pictures will be pictures from other locations on the internet and some will be from our bucket. Once we'll return the user (browser) a URL and our code in the client side will put those url in an `img` html tag, the browser will automatically go to this URL to get the image and show it, so your bucket need to be public and accessible.

&nbsp;

## 3. Screenshots

n order to be on the same page I take a bunch of screenshots of Tweeter and cleaned it up a bit (remove some of the feature we'll not build), let's go over them and see what we're building. This will determine the endpoints and the database schema.
First thing first, the home page when we are not connected
Press on Sign Up
Press on Log In
User Feed
User Timeline / Likes
User Following / Followers
User Settings Page
Search
Tweet
Tweet Likes
Tweet via URL (when not logged in)

&nbsp;

## 4. Routes

Let's plan all the routes that will be in our backend services. Why even do this? Because we need to check that we cover all the cases and our backend services can talk to each other and have all the things they need to do so.

### 4.1 Users

| Method | Path                        | Auth     | Description             |
|--------|-----------------------------|----------|-------------------------|
| GET    | /user                       | None     | Get own info            |
| GET    | /user/:username             | None     | Get the user info       |
| POST   | /user                       | None     | Create a new user       |
| POST   | /user/reset-password        | None     | Reset own password      |
| POST   | /user/follow/:user_id       | Token    | Start following a user  |
| POST   | /user/unfollow/:user_id     | Token    | Stop following a user   |
| PUT    | /user/info                  | Token    | Edit own info           |
| PUT    | /user/password              | Token    | Edit own password       |
| PUT    | /user/settings              | Token    | Edit own settings       |
| DELETE | /user/:username             | Token    | Delete a user           |

### 4.2 Tweets

| Method | Path                        | Auth     | Description             |
|--------|-----------------------------|----------|-------------------------|
| GET    | /tweets/:username           | None     | Get all the user tweets |
| POST   | /tweet                      | Token    | Create a new tweet      |
| PUT    | /tweets/:tweet_id           | Token    | Edit a tweet            |
| DELETE | /tweets/:tweet_id           | Token    | Delete a tweet          |
| DELETE | /tweets/:tweet_id           | Token    | Delete a tweet          |


### 4.3 Media

| Method | Path                        | Auth     | Description             |
|--------|-----------------------------|----------|-------------------------|
| GET    | /media/:media_id            | None     | Get an image            |
| POST   | /media/:media_id            | Token    | Upload a new image      |
| DELETE | /media/:media_id            | Token    | Delete an image         |

In the next chapter we look at some edited screenshots from twitter.com to see how our web app (how it'll look, which data is needed in which page, the layout, the colors, etc).

&nbsp;

## 5. Database Schema

### 5.1. Users Collection

| Field Name    | Type      | Description             |
|---------------|-----------|-------------------------|
| private_name  | string    | Get an image            |

### 5.2. Tweets Collection

| Field Name    | Type      | Description             |
|---------------|-----------|-------------------------|
| private_name  | string    | Get an image            |

### 5.3. Notifications Collection

| Field Name    | Type      | Description             |
|---------------|-----------|-------------------------|
| private_name  | string    | Get an image            |

### 5.4. Media Collection

| Field Name    | Type      | Description             |
|---------------|-----------|-------------------------|
| private_name  | string    | Get an image            |

&nbsp;

## 6. Summary

Something
