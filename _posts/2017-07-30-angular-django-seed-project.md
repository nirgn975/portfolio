---
title: Angular — Django Seed Project
author: nirgn
layout: post
summary: "A production ready Angular — Django RESTful seed repository"
category: Development and Contribution
---

פוסט זה פורסם במקור ב [medium](https://medium.com/@nirgn/angular-django-seed-project-5319c33d7bac).

## Load Balancing Applications with HAProxy and Docker

> A production ready Angular — Django RESTful seed repository

In the recent weeks I decided to build a repo that will contain a seed repo for a production ready Angular and Django RESTful apps: [https://github.com/nirgn975/Angular-Django-Seed-Project](https://github.com/nirgn975/Angular-Django-Seed-Project).

<!--more-->

<div>
  <img src="/images/posts/angular-django-seed-project/project-logo.png" alt="Project Logo">
</div>

&nbsp;

### What it means a “production ready” repo?

For me, it meant that the applications should contain a simple use case, but with all of the best practices from Django and Angular worlds, handle scalability, backups, logging, etc.

The use case I chose is to expose a users list form the [Django](https://www.djangoproject.com/) app and show that list in the [Angular](https://angular.io/) app. I also want to use the best tooling in Angular and Django worlds so I use [Angular-CLI](https://github.com/angular/angular-cli), [Angular Material](https://material.angular.io/) as a design library, [ngrx](https://github.com/ngrx) to handle state, and [Django REST framework](http://www.django-rest-framework.org/) to build the server api.

&nbsp;

### Tests

Writing tests are the best practice, it’s known. So even though the django and angular apps are small, tests are a must! We test the client and server for lint errors and has a 90+ test coverage. We run it in [Travis-CI](https://travis-ci.org/) and calculate coverage with [codecov](https://codecov.io) for every commit.

<div>
  <img src="/images/posts/angular-django-seed-project/tests-are-best-practice-its-known.jpeg" alt="Tests are best practice, it’s known.">
</div>

&nbsp;

### Load Tests

It’s essential to check how much requests our system can handle. We do it with [Locust](http://locust.io/) an open source tool to define user behaviour, and swarm our system with millions of simultaneous users. It has a nice web UI and can export the report in the end of the session.

<div>
  <img src="/images/posts/angular-django-seed-project/locust-web-ui.png" alt="Locust Web UI">
</div>

&nbsp;

### Scalability

All the parts are in a separate [Docker](https://www.docker.com/) containers and we use [Docker Swarm](https://docs.docker.com/engine/swarm/) to manage them all. There is already a `docker-compose.yml` file to configure all the services and their relationships. For every service there is a `deploy: replicas` setting in the `docker-compose.yml` file, it gives us control on how many containers to start. And of course we can also scale it up (or down) even after we start the docker containers with the `docker service scale` command. We can also can do a rolling updates — update the code without downtime. And there is a special section in the README on how to do it.

But scalability is not just docker containers. Something need to handle and manage all the requests before the apps containers gets them. For that we use an HAProxy container to get all the requests and load balance them between the containers.

We also have a [visualizer](https://github.com/dockersamples/docker-swarm-visualizer) container to visualize where is each container is located at (on which server).

<div>
  <img src="/images/posts/angular-django-seed-project/docker-swarm-visualizer.png" alt="Docker Swarm Visualizer">
</div>

&nbsp;

### Backups

Database backups are really important thing, and are something we forget to do until something goes wrong. So I really emphasis this part.

* Each day a backup of the PostgreSQL database will be created. The daily backups are rotated weekly, so maximum 7 backup files will be at the daily directory at once.
* Each Saturday morning a weekly backup will be created at the weekly directory. The weekly backups are rotated on a 5 week cycle.
* Each month, at the 1st of the month a monthly backup will be created at the monthly directory. Monthly backups are NOT rotated

The backups are saved at `/var/backups/postgres` at the host machine via a shared volume. It can be configured in the `docker-compose.yml` at the `volumes` section of the `database` service.

&nbsp;

### Logging

We use the [ELK Stack](https://www.elastic.co/products) for logging. The server (Django app) logs are sent to Logstash, and saved in Elasticsearch. There is separate container for every part of this stack. And of course we also have a Kibana instance to check and analyze all the logs.

<div>
  <img src="/images/posts/angular-django-seed-project/kibana-ui.png" alt="Kibana UI">
</div>

&nbsp;

### Security

Security is a whole subject of itself. And although we already get the best practice from django world, we need to do something more in that case. Everybody knows Django Admin interface is on `/admin` and it is a security concern. So we use [django-admin-honeypot](https://github.com/dmpayton/django-admin-honeypot) to fake the admin login screen and log and notify admins of attempted unauthorized access.

We put the read admin screen at `/secret-admin` but you really need to change it once you clone and start writing you own project. This setting will be where you expect it to be, at the path `server` -> `config` -> `urls.py`.

&nbsp;

### Summary

At the end we have all we need to start a new project based on Angular and Django. But this is not the end, it’s only the beginning. We have more to do, like update ngrx to version 4.0, integrate redis as a cache layer, etc.

I would love to get your help on this and make this project the go to seed app for everyone who want to start building an Angular and Django RESTful apps.

GitHub repo: [https://github.com/nirgn975/Angular-Django-Seed-Project](https://github.com/nirgn975/Angular-Django-Seed-Project)
