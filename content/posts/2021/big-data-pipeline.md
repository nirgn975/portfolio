---
title: "Big Data Pipeline"
subtitle: ""
date: 2020-09-01T09:00:00+03:00
lastmod: 2021-02-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["arangodb", "aql", "graph", "pipeline", "gcloud", "oasis", "elasticsearch", "neo4j", "jenusgraph", "dataflow", "pub/sub", "nodejs", "python", "big data"]
categories: ["development"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2021/big-data-pipeline/big-data.webp"
featuredImagePreview: "/posts/2021/big-data-pipeline/big-data.webp"

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

&nbsp;

## 1. Database Research

So, when time have come to face my demons, I start with a big ass research! (maybe too big, because I really delayed the start of the project). First, I was really skeptical of graph databases, I thought that for most of the projects it's an over kill, it's not what people needs and it's a buzz word people love because most of them love to complicate things (over engineering as I love to say) and they just love to use the "hot" and shiny new tools.

And I still thinks I'm right in this assumption. But I come to see the benefits of graph data modeling, and I do think It's have it's place in the world. So after I give up on trying to model our data in [MongoDB](https://www.mongodb.com) and then in [Google Firestore](https://cloud.google.com/firestore) (2 NoSQL document databases), I started to research graph databases.

The first graph database I ran into was [neo4j](https://neo4j.com). neo4j is the oldest of the group, it's initial release was in 2007 (that's when the first iPhone was released to the world, to keep in perspective). It have a big compony behind it (for better and for worse). But couple of things bugged me about it. First they used [gremlin](https://tinkerpop.apache.org/gremlin.html) as traversal language (which is great, because it's open source and used by couple of other graph database projects which is lower the learning curve), but in 2011 they start to move to their own query language (called cypher).

Then I looked at the architecture of the database, they say that all of the data should be replicated to each node, and this is good for high availability (we can have couple of nodes), but not for scalability, I can't fit couple of petabytes in a single node (not to mention to replicate it, and the bottleneck performance we'll have). This was a red flag for scalability, as red as it can be. And when I looked at their license price and their cloud pricing I just closed the tab and move on.

I keep research a little bit more. My project is on [GCP (Google Cloud Platform)](https://cloud.google.com) and for a time I even thought about moving to Azure to use [Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db) and even to Amazon to use [Neptune](https://aws.amazon.comneptune). But then I encounter [TigerGraph](https://www.tigergraph.com) and as I keep reading their documentation and reviews about them they looked like they can answer my scalability problems. But their price was too high, and they didn't look like a developer friendly company. And it's bugged me that they're not really open source (like neo4j don't).

It was while I researched about TigerGraph that I came across [JanusGraph](https://janusgraph.org), JanusGraph is a distributed, open source, massively scalable graph database. It's a fork of TitanDB (which originally released in 2012 and developed by a company called Aurelius. It was acquired in 2015 by DataStax, the company behind the Apache Cassandra database).

The nice thing about JanusGraph is that it's fully open source and backed by companies who knows what they're doing in the world of big data (Google, IBM, Hortonworks), it use gremlin as traversal language, and supports various storage backends (I, as a GCP user looked right at [BigTable](https://cloud.google.com/bigtable) for the cloud, but if you're using some other cloud you can always use [HBase](https://hbase.apache.org)) and also support external index storages (someone said an [ElasticSearch](https://www.elastic.co) Kubernetes cluster to index the data and do a full text or geo searches?).

Everything I ever wanted! BigTable can support a massive scale and take all the overhead of manage a database from me. It doesn't cost as much as the other solutions (still a lot, but compare to the massive scale of my data it's "cheap"), while JanusGraph can give me the Graph layer I wanted. But one thing was bugged me. There wasn't a whole lot of YouTube talks / blog posts / Stack Overflow questions about JanusGraph. Only IBM have a managed cloud of JanusGraph but it's not BigTable scale. So I had to choose between IBM Compose with a managed service that probably one man can handle, to manage the cluster on my own with BigTable as the storage layer which probably make me need another team member (which I don't have). And to top of all that, as there is not much information about it, it doesn't look like if I'll need help I'll have a wide community for help (their documentation is great through, but it's not enough).

The next graph database I ran into was actually two of the same family, [OrientDB](https://orientdb.com) and [ArangoDB](https://www.arangodb.com) which are a multi model database. It's mean they are NoSQL database that can save data as key value pairs, json documents, and graph model. it's sounds perfect! But when I dive deeper and actually start writing some scripts it's was not so good.

As a start I didn't even touch OrientDB, because It's have a lot of bad reviews on the web, so I choose ArangoDB. And ArangoDB was easy to setup on my local machine and even to start playing with it. They have a cloud service, which is pretty new and a little bit expensive, but easy to setup and manage. And I can't tell if they can handle couple of petabytes of data, I didn't find anyone that did it on their database, but then again, they have "SmartGraphs" - a smart way to shard the data between nodes (so unlike neo4j, they look like they have a solution to the scalability problem).

So, I decided to continue with ArangoDB. Their scalability is a little bit in question, and the price is a bit high, but I'll probably can manage it on my own and I have a compony and a bigger community behind it that I can lean on for help.

&nbsp;

## 2. Let's play

The first thing we need to do is to get comfortable with the database and their query language (AQL). So let's install ArangoDB on our local machine and start playing with it. To install it I will use `brew`, and then run it.

```bash
$ brew install arangodb
$ brew services start arangodb
```

After we install and run the database we can use the web interface to interact with it on [http://localhost:8529](http://localhost:8529). Now we can create a `collection` in the UI and create some `document`s, but this is not the main reason we choose ArangoDB. We choose it because it can handle a graph, so let's play with it's graph features. First we need some data that we can model in a Graph way. For that ArangoDB has a default dataset we can use and download from [here](https://www.arangodb.com/arangodb_graphcourse_demodata). After we  download it let's load it to the Database.

```bash
$ arangoimport --file <pathToAirportsCsvOnYourMachine> --collection airports --create-collection true --type csv
$ arangoimport --file <pathToFlightsCsvOnYourMachine> --collection flights --create-collection true --type csv --create-collection-type edge
```

If we head back to the web UI, and click on the _"Collections"_ tab, we can see the 2 collections that we import.

![ArangoDB Collections](/posts/2021/big-data-pipeline/arangodb-collections.webp "ArangoDB Collections")

Now, we can do some queries like loop over all the airports in the `airports` collection and print only the ones that have a vip lounge.

```aql
FOR airport IN airports
  FILTER airport.vip
  RETURN airport
```

And it's very cool we have those features in [AQL](https://www.arangodb.com/docs/stable/aql/index.html), but it's not why we choose to use ArangoDB, we choose it because it can do graph stuff, so let's ask some graph questions, like printing all the names of all airports one can reach directly (in 1 step) from Los Angeles International (LAX).

```aql
FOR airport IN 1..1 OUTBOUND 'airports/LAX' flights
  RETURN DISTINCT airport.name
```

Or to find all the connections which depart from or land at BIS on January 5th and 7th and print the destination city and the arrival time.

```aql
FOR airport, flight IN ANY 'airports/BIS' flights
  FILTER flight.Month == 1 AND flight.Day >= 5 AND flight.DAY <= 7
  RETURN { city: airport.city, time: flight.ArrTimeUTC }
```

And when we click on _"Execute"_, we can see the results right there, on the ArangoDB web interface.

![ArangoDB Graph Query](/posts/2021/big-data-pipeline/arangodb-graph-query.webp "ArangoDB Graph Query")

&nbsp;

## 3. Move on the cloud

After we feel a bit more comfortable with ArangoDB on our local machine, it's time to create an ArangoDB Cluster on their cloud platform called [ArangoDB Oasis](https://cloud.arangodb.com). After a quick sign up we're redirected to the dashboard page, where we can create a new _"Project"_. A project in Oasis is like a project in real life, every organisation probably have couple of projects / teams, so we'll create a project and because we're not an organisation, we'll probably have only one project.

When we create the project, we need to give it a name, id doesn't really matter what name we give it, I'll call it `test`, and leave the description empty. After the project is created (will take couple of seconds), we'll go to the _"Security"_ tab to add our own IP to the whitelist (we can go to [wtfismyip](https://wtfismyip.com) to check our IP). Let's press on the _"New IP whitelist"_ button. I'll call that list `local-machine`, leave the description empty, and add my IP with a `/32` CIDR at the end of the IP address to the list below (we can add couple of IPs, each in every line, but one is enough for now), after we than that press _"Create"_.

![ArangoDB New IP Whitelist](/posts/2021/big-data-pipeline/arangodb-new-ip-whitelist.webp "ArangoDB New IP Whitelist")

Now that we have our local machine IP in the whitelist, when we'll create a deployment we'll use that whitelist so only we can connect to the cluster. This will give us an extra layer of security. Below the _"IP whitelists"_ section there is _"Certificates"_ section. This is used to connect to our cluster via `https` and encrypt our network traffic. It's nice to see that ArangoDB already provide us with a default SSL certificate, we'll use it in our deployment.

The last thing we need to do is actually create a deployment, so let's head over to the _"Deployments"_ tab and click on the _"New deployment"_ button. Now we have to give it a name, I'll call it `myproject`, and again, leave the description empty. For the _"Provider"_ I choose GCP (Google Compute Platform), because my other stuff for this project is hosted on GCP so there will be shorter path from ine server to the other (and GCP is the cheapest), and for the same reasons I will choose _"Eemshaven, Netherlands"_ for the region.

The _"DB Version"_ and _"Certificate"_ should already be configured so we don't need to change anything there, but we do need to add our _"local-machine"_ list to the _"IP whitelist"_. In the _"Configuration"_ let's choose the `Sharded` button, and leave the Database Memory/CPU/Disk/Nodes like they're already configured, we don't need something more than that just to learn and experiment.

The last thing we left to do is to choose the _"Basic"_ support and accept the terms and conditions so we will have the option to create the cluster. After we created it we'll be redirect to a new page where we can see it's `Bootstrapping` and that we don't have an `Endpoint`, it's empty.

![Deployment myproject Bootstrapping](/posts/2021/big-data-pipeline/deployment-myproject-bootstrapping.webp "Deployment myproject Bootstrapping")

We need to wait couple of minutes for the cluster to start, and once it's going we can see the `status` changed to _"OK"_ and we'll have a URL Endpoint. We can click on it, and use the default username (`root`) and the password that was created for us by ArangoDB cloud, and get in to our  cluster.

It's actually that easy to setup a secure ArangoDB cluster on the cloud, and we don't have to do anything to maintain it (no schedule backups, if one node is down we get a new one without doing anything and chances are we'll not notice any downtime). It's one of the reasons we choose to go with ArangoDB.

![ArangoDB Cluster](/posts/2021/big-data-pipeline/arangodb-cluster.webp "ArangoDB Cluster")

&nbsp;

## 4. Pipeline Research

Until now we only talk about the database, which is important don't get me wrong, but it's not the main reason we're here. The title of the post is _"Big Data **Pipeline**"_, so we need to talk about that pipeline.

Our pipeline have some strong requirements (that we cannot live without). For start it's need to be high availability, with fault tolerance and handle a lot of data. And our system so far have them, it's high availability (3 nodes that can answer queries, and we can increase it if we need to), it's fault tolerance (if one of the node is down we have 2 more to answer queries and take his load, and Oasis cloud will spin up a new node for us in no time), and we can handle a lot of data (it's true that we can only have 30GB of storage right now but we can increase it to 16 nodes, 6400GB storage for each node, and 256GB memory for each node, which is 102 terabytes of data - this is not the end goal but it's enough for now).

On the other hand, we have noticed some requirements that are not mandatory, and can direct us in a different way regarding the choice of tools we will use. For example, the most influence one is that we don't need to be sync with the database, we want to save the data in the database in an async way, for couple of reasons:
1. Not increase the response time of our service.
2. We don't need it to the response, we just want to save the data for future use and analysis.

So, if it can be async we choose to go with a publish/subscription model, and if we're on GCP and we want a managed one we cannot find batter then [pub/sub](https://cloud.google.com/pubsub). In a nutshell pub/sub is an asynchronous messaging service that decouples services that produce events from services that process events. If you want to learn more about pub/sub there is a really good [YouTube playlist from GCP](https://www.youtube.com/watch?v=cvu53CnZmGI&list=PLIivdWyY5sqKwVLe4BLJ-vlh9r9zCdOse).

But how we'll process the data? Because every service can subscribe to pub/sub and get the data. First I thought about creating a [Kubernetes](https://kubernetes.io) cluster that subscribe to the subjects and have the logic to save the data to ArangoDB, but then I need to write a scalability policy because what if we need more or less processing power because it's a busy time and everyone uses our system, or it's night time and we don't have any requests right now? And as I said before I don't want to manage things myself, it's a small team and if I can use a managed services I prefer to. So I researched some more and find [Dataflow](https://cloud.google.com/dataflow).

Dataflow is a unified stream and batch data processing that's serverless, fast, and cost-effective, It's basically a managed [Apache Beam](https://beam.apache.org). And it's great! I can write the scripts in Python, it's a well known tool with a strong community, it marks all the checkboxes we're looking for in a tool.

&nbsp;

## 5. Pub / Sub

It's time to get into some coding again. My service is in [Node.js](https://nodejs.org), so I'll use this [npm package for pub/sub by Google](https://github.com/googleapis/nodejs-pubsub). We can install it in our project like every other npm package.

```bash
$ npm install --save @google-cloud/pubsub
```

Once we have it installed we need to create a service account on GCP to use their managed pub/sub. Let's head over to GCP and then to the _"IAM & Admin"_ page and from there to _"Service Accounts"_ tab (here is a [link](https://console.cloud.google.com/iam-admin/serviceaccounts) to the place). Now we need to _"CREATE SERVICE ACCOUNT"_ and we'll be redirect to a new page to insert some details.

![GCP Service Accounts](/posts/2021/big-data-pipeline/gcp-service-accounts.webp "GCP Service Accounts")

In the _"Service account name"_ let's write _"Pub Sub"_ and it'll auto fill the _"Service account ID"_. The _"Service account description"_ can be leaved empty, and let's click on the _"CREATE"_ button. In the second step we need to select a role, so we'll open the selector and write _"pub sub"_ in the filter so find _"Pub/Sub Admin"_ role and select it.

![Service Account Role](/posts/2021/big-data-pipeline/service-account-role.webp "Service Account Role")

Now we can click on the _"CONTINUE"_ button, and in step 3 just click _"DONE"_. We'll be redirect to the main _"Service Accounts"_ tab, and we can see on the list the new service account we created, with _"No keys"_ in it's _"Key ID"_ column. So let's create one to use it in our project. Click on the 3 dots in the _"Actions"_ column in our newly created service account row and we'll open a menu, now choose _"Create key"_, and in the pop up that opened up choose _"JSON"_ and click _"CREATE"_. We'll be automatically start to download a `json` file - this is the service account key, we need to move this file to our project and reference it in our code.

![Service Account Create Key](/posts/2021/big-data-pipeline/service-account-create-key.webp "Service Account Create Key")

&nbsp;

### 5.1. Pub/Sub code

As I said before my project is written in Node.js, and to be more exact in [Typescript](https://www.typescriptlang.org), so I'll create a function that get the topic name and the data itself, and just publish a message, then we can use this function wherever we want. My code will start with importing the `PubSub` object and key, and create a pubSub client.

```typescript
import { PubSub } from "@google-cloud/pubsub";
import { join } from "path";

const pubSubClient = new PubSub({
  keyFilename: join(__dirname, "./pub-sub-key.json"),
  projectId: "<gcp_project_id>",
});
```

Now that we have the pubSub client we can create the function we talked about above.

```typescript
export let publishMessage = async (topicName: any, payload: any) => {
  const dataBuffer = Buffer.from(JSON.stringify(payload));

  const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);
  console.log(`Message ${messageId} published.`);
  return messageId;
};
```

And that's it, we can use this function to publish messages to pub/sub, like this `publishMessage("test", data);`, where the `test` is the topic name and the `data` is a variable with the data we want to save in our database in a json representation.

&nbsp;

## 6. Dataflow

The next step is to subscribe to this topic in a Dataflow script and to write the code that save the data to our database. But first, to save the response we probably need to know what we're going to save, how the data looks like. So, let's imagine we get a `json` response containing 2 keys, the first named `message` and the second `data`, and the `data` value it's what we want to save. The data value is an `array` of users, and we want to save each user in the `users` collection as a document.

The primary index here is the `username` field, because I created this example based on Twitter, and it's a unique field there, so it'll be a unique field on our database too. we also want to create graph based on those documents with a `follow` edge between the two users in this example, because we see that the user with the username `johnny1` is following the user `john_doe`.

Here is an example of the response we imagine above.

```json
{
  "message": "success",
  "data": [{
    "username": "johnny1",
    "first_name": "Johnny",
    "age": "31",
    "follow": "john_doe"
  }, {
    "username": "john_doe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "example@example.com"  
  }]
}
```

Now we're ready to work, so let's create a simple python file that will host a basic template for a streaming Dataflow job.

```bash
$ touch basic-pubsub-streaming.py
```

Now let's paste there the code for the most basic Dataflow job there is

```python
import argparse
import logging

import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
import apache_beam.transforms.window as window


class GroupWindowsIntoBatches(beam.PTransform):
    """A composite transform that groups Pub/Sub messages based on publish
    time and outputs a list of dictionaries, where each contains one message.
    """

    def __init__(self, window_size):
        # Convert minutes into seconds.
        self.window_size = int(window_size * 60)

    def expand(self, pcoll):
        return (
            pcoll
            | "Window into Fixed Intervals" >> beam.WindowInto(window.FixedWindows(self.window_size))
            | "Add Dummy Key" >> beam.Map(lambda elem: (None, elem))
            | "Groupby" >> beam.GroupByKey()
            | "Abandon Dummy Key" >> beam.MapTuple(lambda _, val: val)
        )


class WriteBatchesToArangoDB(beam.DoFn):
    def __init__(self):
        pass

    def process(self, batch, window=beam.DoFn.WindowParam):
        # Process the data itself.
        pass


def run(input_topic, window_size=1.0, pipeline_args=None):
    pipeline_options = PipelineOptions(
        pipeline_args, streaming=True, save_main_session=True
    )

    with beam.Pipeline(options=pipeline_options) as pipeline:
        (
            pipeline
            | "Read PubSub Messages" >> beam.io.ReadFromPubSub(topic=input_topic)
            | "Window into" >> GroupWindowsIntoBatches(window_size)
            | "Write to ArangoDB" >> beam.ParDo(WriteBatchesToArangoDB())
        )


if __name__ == "__main__":
    logging.getLogger().setLevel(logging.INFO)

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input_topic",
        help="The Cloud Pub/Sub topic to read from.\n"
        # '"projects/<PROJECT_NAME>/topics/<TOPIC_NAME>".',
    )
    parser.add_argument(
        "--window_size",
        type=float,
        default=1.0,
        help="Output file's window size in number of minutes.",
    )
    known_args, pipeline_args = parser.parse_known_args()

    run(
        known_args.input_topic,
        known_args.window_size,
        pipeline_args,
    )
```

First, the lines 51-72 are running, we get some arguments from the environment variables and then the `run` function (line 68) is running with those arguments. Next we go over to line 37 where the `run` function create a beam pipeline, in this beam pipeline we have 3 steps:

1. We're reading the pub/sub messages.
2. Group all of them in a window.
3. Loop over all the messages in the window time frame and save them to the database.

The first step in the pipeline is a built in step from beam, we don't do anything spacial there. The second step (`GroupWindowsIntoBatches`) is a custom one, there we group all the messages in the window time frame (default is 1 minutes, but it's a custom argument we can change it when we run the script. You can see it in lines 60-65). And the last step, step 3 (`WriteBatchesToArangoDB`), is also a custom code (class) that for now does nothing. There we're going to write our code to save the message in the ArangoDB database.

Last thing, in line 58 you can see the argument to subscribe to the pub/sub topic, instead of get it from the input argument when we run the script we can uncomment this line and replace the `<PROJECT_NAME>` with our GCP project ID and `<TOPIC_NAME>` with the topic name we created earlier (in our case it's `test`).

&nbsp;

### 6.1 Save the data

We get an array of messages from the `batch` (even if it's only 1 message in that 1 minute of the time frame window it'll be wrap in an array), so we need to loop over the batch elements and then we get the single message. Now we need to convert it to `json` because we get the message as a string. So let's import the `json` package at the top of the file.

```python
import json
```

And then loop over the elements and convert them to `json` (it'll be a dictionary in python), instead of line 34 (in the `process` function).

```python
for element in batch:
    message = json.dumps(element.decode("utf-8"))
```

The next step is to connect to the database and I'll use the [python-arango](https://github.com/joowani/python-arango) package to do that. First let's install it in our local environment (I use [pipenv](https://github.com/pypa/pipenv) to create and manage my Python virtual environments).

```bash
$ pipenv shell
$ pipenv install python-arango
```

Next we'll need to use it in the Dataflow environment, and it's not a beam package so we need to install it there, or tells Dataflow to install it. We can add custom packages to the Dataflow environment by adding a `requirements.txt` file when we'll run the Dataflow script. So let's create a `requirements.txt` file and add there all of our dependencies.

```bash
$ touch requirements.txt
$ pipenv lock -r > requirements.txt
```

Now we're free to use the [python-arango](https://github.com/joowani/python-arango) package in our Dataflow script. So let's import it at the top.

```python
from arango import ArangoClient
```

And then connect to our database.

```python
# Initialize the client for ArangoDB.
client = ArangoClient(hosts='https://<YOUR_ARANGODB_ENDPOINT>.arangodb.cloud:8529')

# Connect to "_system" database as root user.
sys_db = client.db('_system', username='<YOUR_USERNAME>', password='<YOUR_PASSWORD>')
```

Before we save the data we need to create the collections and the connections between them. Let's create a new graph and a new `users` collection (we'll only create it if it's not already exist). After that, we can create the new `follow` edge collection from and to the `users` vertex.

```python
# Get the API wrapper for "twitter" graph, create it if not exist.
if sys_db.has_graph(name='twitter'):
    graph = sys_db.graph(name='twitter')
else:
    graph = sys_db.create_graph(name='twitter', smart=True)

# Get the API wrapper for "users" vertex collection, create it if not exist.
if graph.has_vertex_collection('users'):
    users_collection = graph.vertex_collection('users')
else:
    users_collection = graph.create_vertex_collection('users')

# Get the API wrapper for edge collection "follow", create it if not exist.
if graph.has_edge_definition('follow'):
    follow_edge = graph.edge_collection('follow')
else:
    follow_edge = graph.create_edge_definition(
        edge_collection='follow',
        from_vertex_collections=['users'],
        to_vertex_collections=['users']
    )
```

Now that we have all the collections in place we can actually save the data, so let's loop over the array of users and save the users in a new documents and create a `follow` edge if there is any.

```python
# Insert new documents into the collection.
for user in message['data']:
    # Check if user already exist.
    exist_user = users_collection.get(user['username'])

    # # Copy the user to a different dictionary.
    copy_user = user.copy()

    # Remove the `follow` field from the new dictionary.
    if 'follow' in copy_user:
        del copy_user['follow']

    # Update user if already exist.
    if exist_user:
        exist_user.update(copy_user)
        users_collection.update(exist_user)
    else:
        # Insert a new document if it isn't exist already.
        copy_user['_key'] = copy_user['username']
        users_collection.insert(copy_user)

    # If follow is present, insert new user with only the key, and create an edge.
    if 'follow' in user:
        new_user = users_collection.insert({'_key': user['follow']})
        follow_edge.insert({
            '_from': 'users/{}'.format(copy_user['username']),
            '_to': 'users/{}'.format(user['follow']),
        })
```

Here is the final file, with all of the pieces piece together.

```python
import argparse
import datetime
import json
import logging

import apache_beam as beam
from apache_beam.options.pipeline_options import PipelineOptions
import apache_beam.transforms.window as window

from arango import ArangoClient
from google.cloud import storage

client = storage.Client()
bucket = client.get_bucket('bucket-id-here')


class GroupWindowsIntoBatches(beam.PTransform):
    """A composite transform that groups Pub/Sub messages based on publish
    time and outputs a list of dictionaries, where each contains one message
    and its publish timestamp.
    """

    def __init__(self, window_size):
        # Convert minutes into seconds.
        self.window_size = int(window_size * 60)

    def expand(self, pcoll):
        return (
            pcoll
            # Assigns window info to each Pub/Sub message based on its
            # publish timestamp.
            | "Window into Fixed Intervals" >> beam.WindowInto(window.FixedWindows(self.window_size))
            # Use a dummy key to group the elements in the same window.
            # Note that all the elements in one window must fit into memory
            # for this. If the windowed elements do not fit into memory,
            # please consider using `beam.util.BatchElements`.
            # https://beam.apache.org/releases/pydoc/current/apache_beam.transforms.util.html#apache_beam.transforms.util.BatchElements
            | "Add Dummy Key" >> beam.Map(lambda elem: (None, elem))
            | "Groupby" >> beam.GroupByKey()
            | "Abandon Dummy Key" >> beam.MapTuple(lambda _, val: val)
        )


class WriteBatchesToArangoDB(beam.DoFn):
    def __init__(self):
        pass

    def process(self, batch, window=beam.DoFn.WindowParam):
        for element in batch:
            message = json.loads(element.decode("utf-8"))

            # Initialize the client for ArangoDB.
            client = ArangoClient(hosts='https://<YOUR_ARANGODB_ENDPOINT>.arangodb.cloud:8529')

            # Connect to "_system" database as root user.
            sys_db = client.db('_system', username='<YOUR_USERNAME>', password='<YOUR_PASSWORD>')

            # Get the API wrapper for "twitter" graph, create it if not exist.
            if sys_db.has_graph(name='twitter'):
                graph = sys_db.graph(name='twitter')
            else:
                graph = sys_db.create_graph(name='twitter', smart=True)

            # Get the API wrapper for "users" vertex collection, create it if not exist.
            if graph.has_vertex_collection('users'):
                users_collection = graph.vertex_collection('users')
            else:
                users_collection = graph.create_vertex_collection('users')

            # Get the API wrapper for edge collection "follow", create it if not exist.
            if graph.has_edge_definition('follow'):
                follow_edge = graph.edge_collection('follow')
            else:
                follow_edge = graph.create_edge_definition(
                    edge_collection='follow',
                    from_vertex_collections=['users'],
                    to_vertex_collections=['users']
                )

            # Insert new documents into the collection.
            for user in message['data']:
                # Check if user already exist.
                exist_user = users_collection.get(user['username'])

                # # Copy the user to a different dictionary.
                copy_user = user.copy()

                # Remove the `follow` field from the new dictionary.
                if 'follow' in copy_user:
                    del copy_user['follow']

                # Update user if already exist.
                if exist_user:
                    exist_user.update(copy_user)
                    users_collection.update(exist_user)
                else:
                    # Insert a new document if it isn't exist already.
                    copy_user['_key'] = copy_user['username']
                    users_collection.insert(copy_user)

                # If follow is present, insert new user with only the key, and create an edge.
                if 'follow' in user:
                    new_user = users_collection.insert({'_key': user['follow']})
                    follow_edge.insert({
                        '_from': 'users/{}'.format(copy_user['username']),
                        '_to': 'users/{}'.format(user['follow']),
                    })


def run(input_topic, window_size=1.0, pipeline_args=None):
    pipeline_options = PipelineOptions(
        pipeline_args, streaming=True, save_main_session=True
    )

    with beam.Pipeline(options=pipeline_options) as pipeline:
        (
            pipeline
            | "Read PubSub Messages" >> beam.io.ReadFromPubSub(topic=input_topic)
            | "Window into" >> GroupWindowsIntoBatches(window_size)
            | "Write to ArangoDB" >> beam.ParDo(WriteBatchesToArangoDB())
        )


if __name__ == "__main__":
    logging.getLogger().setLevel(logging.INFO)

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input_topic",
        help="The Cloud Pub/Sub topic to read from.\n"
        # '"projects/<PROJECT_NAME>/topics/<TOPIC_NAME>".',
    )
    parser.add_argument(
        "--window_size",
        type=float,
        default=1.0,
        help="Output file's window size in number of minutes.",
    )
    known_args, pipeline_args = parser.parse_known_args()

    run(
        known_args.input_topic,
        known_args.window_size,
        pipeline_args,
    )
```

&nbsp;

## 7. Connect the dots

So, how do we run this Dataflow script? We can do it in two ways:

1. It's just an Apache Beam script, so we can run it on our local machine (we'll do it probably when we build it, for debugging).
2. And the second way is in the cloud (on GCP, in Dataflow).

For both ways, it doesn't matter which one we choose we'll need to setup an environment variable named `GOOGLE_APPLICATION_CREDENTIALS`, and it's value should be the absolute path to the service account file. We need it to get the messages from pub/sub.

So let's go to GCP again and create another service account just like we did in the [Pub / Sub section](#5-pub--sub) and give it _"Dataflow Admin"_ role, click create and then download the `json` file.

Now let's place the `json` file in the same directory as the `basic-pubsib-streamin.py` file is, and create the environment variable.

```bash
$ export GOOGLE_APPLICATION_CREDENTIALS=$(pwd)/service-account.json
```

We're ready to run the script, let's start with the first option, to run it locally we need

```bash
$ python basic-pubsub-streaming.py \
  --input_topic=projects/gcpProjectId/topics/test
  --requirements_file requirements.txt
```

We run the Python script and add two argument variables, the first one is our topic address and the second one is the regular requirements file, so we can add custom packages.

To run the same script on GCP Dataflow we just need to add some more arguments.

```bash
python basic-pubsub-streaming.py \
  --project=<gcpProjectId> \
  --region europe-west1 \
  --input_topic=projects/<gcpProjectId>/topics/test \
  --runner=DataflowRunner \
  --temp_location=gs://<bucketNAme>/dataflow/tmp \
  --requirements_file requirements.txt
```

Notice we add the project id, the region we want to Dataflow script to run in, and a bucket to host temp files and errors. We can notice the cool thing that we're referring to code as a single thread and the Dataflow service will handle the autoscaling.

&nbsp;

## 8. Summary

That's it, we built a Data Pipeline. We publish the data using Pub/Sub, and we consume it using a Dataflow script. In the Dataflow (Python) script we can manipulate the data to fit our models, and then save it in our Database.

The most important thing for me is - it can be a one man job. The GCP platform is handling all the hard stuff like scaling our messages and our Dataflow script. While on the other hand the ArangoDB Oasis is handling the hard stuff like scaling our database cluster, doing backups, etc.
