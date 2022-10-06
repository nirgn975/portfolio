---
layout: "../../../layouts/BlogPost.astro"
title: "Getting my feet wet with NestJS and GraphQL - part 1"
pubDate: 2021-03-01T09:00:00+03:00
draft: true
author: "Nir Galon"
authorLink: "/about"

tags: ["nestjs", "graphql", "mongodb", "expressjs", "node.js", "javascript", "typescript", "mongodb", "mongoose"]
category: "development"

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2021/nestjs-graphql-mongodb/nestjs-graphql-mongodb.webp"
---

For the longest time I wanted to start learning [GraphQL](https://graphql.org) and incorporate it into a project. I also started to hear a lot about [NestJS](https://nestjs.com) a few months ago and wanted to play with it as well. So I thought to myself why not doing both?

![Why Not Doing Both?](/posts/2021/nestjs-graphql-mongodb/why-not-both.gif "Why Not Doing Both?")

&nbsp;

## 1. Getting started

So, what are we actually going to do in this post? Create a backend server with [NestJS](https://nestjs.com) that will have the basic CRUD operations in [GraphQL](https://graphql.org) and will save the data to [MongoDB](https://www.mongodb.com) database.

But before we're getting started why even choose NestJS? And what is GraphQL?

### 1.1 NestJS

NestJS is a progressive [Node.js](https://nodejs.org) framework for building efficient, reliable and scalable server-side applications. It uses [TypeScript](https://www.typescriptlang.org) out of the box, and provides more structure, which helps large teams build complex backends more consistently than when using Express or other minimalistic frameworks and as a current user of [Express.js](https://expressjs.com) right now, I feel like it's a welcome change.

Also, it have similar architectures to Angular applications - which I already know, and it take a lot of their philosophy (like the battery included, the great CLI, the awesome docs, etc) which is excellent.

### 1.2 GraphQL

GraphQL on the other hand is an open-source data query and manipulation language for APIs. At the basic level it's just a specification, and there are a lot of implementations our there. The most popular one is [Apollo](https://www.apollographql.com) which have libraries implementations of GraphQL for all the major frontend clients, Node.js backend server frameworks, ios, android, and basically everything you'll ever need.

The NestJS GraphQL module we'll use ([`@nestjs/graphql`](https://github.com/nestjs/graphql)) is a wrapper around the [Apollo server](https://github.com/apollographql/apollo-server), and it'll help us use GraphQL with Nest.

&nbsp;

## 2 Create the project

So, the first thing we need to do is to install the Nest CLI tool globally and then create a project on our local machine. I'll call my project `server`, because I have such an active imagination.

```bash
$ npm i -g @nestjs/cli
$ nest new server
$ cd server
```

Once we created the project, our project directory tree will look like this

```
.
├── README.md
├── nest-cli.json
├── node_modules
├── package-lock.json
├── package.json
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```

Let's go over the files on the `src` directory:

- `app.controller.spec.ts` - The unit tests for the `app` controller.
- `app.controller.ts` - A basic controller with a single route. Controllers are where all route handling occurs.
- `app.module.ts` - The root module of the application. Modules organize controllers and providers into closely related feature sets. Modules can import functionality exported by other Modules. Each application contains a root module, the starting point of an application bootstrapped by the framework.
- `app.service.ts` - A basic service with a single method. Services are responsible for non-request logic such as fetching data, business logic, logging, etc. A service is part of a large group that called Providers. Providers can be a variety of things: Services, Classes, functions, values, etc. They are singletons provided via Dependency Injection (DI) to controllers, other providers, or other modules.
- `main.ts` - The entry file of the application which uses the core function `NestFactory` to create a Nest application instance.

So, we don't need the controllers and the service files for the root module, let's just delete them.

```bash
$ rm src/app.controller.spec.ts src/app.controller.ts src/app.service.ts
```

And then delete the `import` statements with their corresponding codes from the `controllers` and `providers` array, at the `app.module.ts` file. So at the end it'll look like this

```typescript
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

We'll create an API for a simple twitter clone, one with just users and tweets. So, let's create those two new modules with the Nest CLI.

```bash
$ nest g module users
$ nest g module tweets
```

&nbsp;

## 3. GraphQL

It's time to incorporate some GraphQL stuff into our Nest app. If you'll read the [Nest docs about GraphQL](https://docs.nestjs.com/graphql/quick-start) you'll see we have two different ways to do it: _code first_ and _schema first_.

My dream is to create a single model (as a typescript classes) and let Nest generate the GraphQL schema, and the MongoDB schemas. This can be done in the **code first** approach, so we'll choose that way.

The first thing we need to do is to install some required packages.

```bash
$ npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

Once the packages are installed, we can import the `GraphQLModule` and configure it with the `forRoot()` static method, and then we'll use `autoSchemaFile` to tell Nest where to auto create the the GraphQL schema file.

```typescript
// app.module.transform
import { join } from "path";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";

import { UsersModule } from "./users/users.module";
import { TweetsModule } from "./tweets/tweets.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
    UsersModule,
    TweetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

Now, we'll create a two classes, the first for our `User` model, in the `users` module (directory). And the second for the `Tweet` model, in the `tweets` module.

```bash
$ nest g class users/models/user.model
$ nest g class tweets/models/tweet.model
```

The `user.model` would be with those fields:

```typescript
// user.model.ts
export class User {
  _id: string;
  username: string;
  tweets: Tweet[];
  createdAt: Date;
  updatedAt: Date;
}
```

And the `tweet.model` will look like:

```typescript
// tweet.model.ts
export class Tweet {
  _id: string;
  text: String;
  createdAt: Date;
  updatedAt: Date;
}
```

The next step is to generate a service that handle all of the data stuff, because for now we'll not save it in the database, we'll just have an array to save data to and retrieve it from.

```bash
$ nest generate service users
$ nest generate service tweets
```

Now we can create the resolvers which are basically the controllers in GraphQL world.

```bash
$ nest generate resolver users
$ nest generate resolver tweets
```

&nbsp;

## 4. MongoDB

this

&nbsp;

## 5. Summary

The project will get into the showcase at Hugo - an issue has been opened and all the checks are green.

I really hope you find it useful and if you ever use it or just play with the theme, I’ll be thrilled to get a link or just hear from you. If you have any issues or any questions feel free to open a [new discussion at GitHub](https://github.com/nirgn975/devRes/discussions).
