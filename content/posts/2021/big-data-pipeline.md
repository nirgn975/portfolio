---
title: "Big Data Pipeline"
subtitle: ""
date: 2020-06-01T12:00:00+03:00
lastmod: 2020-06-01T12:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["arangodb", "aql", "graph", "big data", "gcloud", "oasis", "elasticsearch", "neo4j", "jenusgraph", "dataflow", "pub/sub"]
categories: ["development"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2021/big-data-pipeline/big-data.webp"
featuredImagePreview: ""

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

When I started working on my current project at work I knew it was a matter of time until I'll have to face the problem of _Big Data_. This is the hardest problem to solve in my book, because I never faced it. I mean when most of the people talk about big data, it's just a buzz word, it's not really big. Maybe it's big for them, or the biggest database they ever have to deal with, but it's not really big.

When I talk about big, I mean Google Search index big, Gmail big, Facebook big. I don't talk about a few hundred of gigabytes, not even couple of terabytes, I mean hundreds of terabytes and even couple of petabytes. And to top of all of that, it's have to be high availability, tolerance fault, pretty cheap (as long as petabytes of data can be), and should been able to be built and maintain by couple of engineers (this was the hardest criteria).

So, this is a log of my journey in to the big data world. It's not every big data, it's specific to Graph data, because it's what we need in our project. It fits our data modeling of the world and help us answer questions we can't otherwise.

## 1. Research

So, when time have come to face my demons, I start with a big ass research! (maybe to big, because I really delayed to start of the project). First, I was really skeptical of graph databases, I thought that for most of the projects it's an over kill, it's not what people needs and it's a buzz word people love because most of them love to complicate things (over engineering as I love to say) and they just love to use the "hot" and shiny new tools.

And I still thinks I'm right in this assumption. But I come to see the benefits of graph data modeling, and I do think It's have it's place in the world. So after I give up on trying to model our data in [MongoDB](https://www.mongodb.com) and then in [Google Firestore](https://cloud.google.com/firestore) (2 NoSQL document databases), I started to research graph databases.

The first graph database I ran into was [neo4j](https://neo4j.com). neo4j is the oldest of the group, it's initial release was in 2007 (that is when the first iPhone was released to the world). It have a big compony behind it (for better and for worse). But couple of things bugged me about it. First they used [gremlin](https://tinkerpop.apache.org/gremlin.html) as traversal language (which is great, because it's open source and used by couple of other graph database projects which is lower the learning curve), but in 2011 they start to move to their own query language (called cypher).

Then I looked at the architecture of the database, they say that all of the data should be replicated to each node, and this is good for high availability (we can have couple of nodes), but not for scalability, I can't fit couple of petabytes in a single node (not to mention to replicate it, and the bottleneck performance we'll have). This was a red flag for scalability, as red as it can be. And when I looked at their license price and their cloud pricing I just closed the tab and move on.

The next graph database I ran into was actually two of the same family, [OrientDB](https://orientdb.com) and [ArangoDB](https://www.arangodb.com) which are a multi model database. It's mean they are NoSQL database that can save data as key value pairs, json documents, and graph model. it's sounds perfect! But when I dive deeper and actually start writing some scripts it's was not so good.

As a start I didn't even touch OrientDB, because It's have a lot of bad reviews on the web, so I choose ArangoDB. And ArangoDB was easy to setup on my local machine and even to start playing with it. They have a cloud service, which is pretty new and a little bit expensive, but easy to setup and manage. And I can't tell if they can handle couple of petabytes of data, I didn't find anyone that did it on their database and, but then again, they have "SmartGraphs" - a smart way to shard the data between nodes (so unlike neo4j, they look like they have a solution to the scalability problem).

So even as I was pretty much been locked on ArangoDB for a long time, and even start planning my models and the system around it, and build a cluster on their cloud, I wanted to keep research a little bit more. From this point it was really hard to keep going, my project is on [GCP (Google Cloud Platform)](https://cloud.google.com) and for a time I even thought about moving to Azure to use [Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db) and even to Amazon to use [Neptune](https://aws.amazon.comneptune). But then I encounter [TigerGraph](https://www.tigergraph.com) and as I keep reading their documentation and reviews about them they looked like they can answer my scalability problems. But their price was too high, and they didn't look like a developer friendly company. And it's bugged me that they're not really open source (like neo4j don't).

It was while I researched about TigerGraph that I came across [JanusGraph](https://janusgraph.org), JanusGraph is a distributed, open source, massively scalable graph database. It's a fork of TitanDB (which originally released in 2012 and developed by a company called Aurelius. It was acquired in 2015 by DataStax, the company behind the Apache Cassandra database).

The nice thing about JanusGraph is that it's fully open source and backed by companies who knows what they're doing in the world of big data (Google, IBM, Hortonworks), it use gremlin as traversal language, and supports various storage backends (I as a GCP user looked right at [BigTable](https://cloud.google.com/bigtable) for the cloud, but if you're using some other cloud you can always use [HBase](https://hbase.apache.org)) and also support external index storages (someone said an [ElasticSearch](https://www.elastic.co) Kubernetes cluster to index the data and do a full text or geo searches?).

Everything I ever wanted! BigTable can support a massive scale and take all the overhead of manage a database from me. It doesn't cost as much as the other solutions (still a lot, but compare to the massive scale of my data it's "cheap"), while JanusGraph can give me the Graph layer I wanted. But one thing was bugged me. There wasn't a whole lot of YouTube talks / blog posts / Stack Overflow questions about JanusGraph. Only IBM have a manage cloud of JanusGraph but it's not BigTable scale. So I had to choose between IBM Compose with a managed service that probably one man can handle, to manage the cluster on my own with BigTable as the storage layer which probably make me need another team member (which I don't have). And to top of all that, as there is not much information about it, it doesn't look like if I'll need help I'll have a wide community for help (their documentation is great through, but it's not enough).

So, I decided to go back to ArangoDB. Their scalability is a little bit in question, and the price is a bit high, but I'll probably can manage it on my own and I have a compony and a bigger community behind it that I lean on.

## 2. Let's play

The first thing we need to do is to get comfortable with the database and their query language (AQL). So let's install ArangoDB on our local machine and start playing with it. To install it I will use `brew`, and then run it with it.

```
$ brew install arangodb
$ brew services start arangodb
```

After we install and run the database we can use the web interface to interact with it on [http://localhost:8529](http://localhost:8529). Now we can create a `collection` in the UI and create some `document`s, but this is not the main reason we choose ArangoDB. We choose it because it can handle a graph, so let's play with it's graph features. First we need some data that we can model in a Graph way. For that ArangoDB has a default dataset we can use and download from [here](https://www.arangodb.com/arangodb_graphcourse_demodata). After we  download it let's load it to the Database.

```
$ arangoimport --file <pathToAirportsCsvOnYourMachine> --collection airports --create-collection true --type csv
$ arangoimport --file <pathToFlightsCsvOnYourMachine> --collection flights --create-collection true --type csv --create-collection-type edge
```

## 3. Move on the cloud

After we feel a bit more comfortable with JanusGraph on our local machine, it's time to create a JanusGraph Cluster with kubernetes on GCP and we'll use BigTable as our backend storage for that.

## 4. Big Data Pipeline

foo

## 5. Pub / Sub

bar

## 6. Dataflow

baz

## 7. Connect the dots

foobar

## 8. Summary
