---
title: "Simple Twitter - Chapter 4: Login (Server Side)"
subtitle: ""
date: 2020-09-01T09:00:00+03:00
lastmod: 2020-10-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "https://nir.galon.io"
description: ""

tags: ["twitter", "development", "github", "node.js", "expressjs", "angular", "ngrx", "modules", "jwt", "token", "controller", "model", "router", "mongodb"]
categories: ["development"]

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2020/chapter-4-simple-twitter/simple-twitter-cover.webp"
featuredImagePreview: "/posts/2020/chapter-4-simple-twitter/simple-twitter-cover.webp"

toc:
  enable: true
math:
  enable: false
lightgallery: true
license: ""
---

From here on out the posts will be shorter, we'll focus on a single topic in each post and it will probably be on the server or the client and not both of them in the same post.

In this chapter we'll build all of the user related stuff including the auth endpoint so we can login, and the auth middleware so we can protect our endpoint we don't want to make public (only to logged in users). When we create a new model in our server, you'll see we'll also create a dummy data for it - to populate the database with some data so we can use it for tests and also to see some data in the client (in the next chapter).

So, let's head over to our [server repo](https://github.com/nirgn975/simple-twitter-server) and create a new issue named _"User entity"_. This issue will layout all of our tasks:

```markdown
- [ ] User model.
- [ ] User routes.
- [ ] User endpoints.
- [ ] User dummy data.
- [ ] User tests for controllers.
- [ ] Auth endpoints.
- [ ] Auth middleware.
```

If you want to follow along with me, it's [issue #5 in my repo](https://github.com/nirgn975/simple-twitter-server/issues/5).

&nbsp;

## 1. Create a user model

First thing first we're in Typescript, and we want to have an interface to the `user` model (interfaces help us enforce certain properties on an object).

So let's create a file name `userModel.ts`.

```bash
$ mkdir -p "src/api/user" && touch "src/api/user/userModel.ts"
```

And then import `bcrypt` (we'll need it for the password encryption) and some mongoose stuff.

```typescript
import * as bcrypt from "bcrypt";
import { NextFunction } from "express";
import { Document, Schema, model } from "mongoose";
```

From where we `import` the `bcrypt` package? we didn't install it yet. If you're like me and using the [atom-typescript](https://github.com/TypeStrong/atom-typescript) package, then the `import` line of `bcrypt` will highlight in error. And the error will be _"Cannot find module 'bcrypt' or its corresponding type declarations."_. So, it's time to install the [bcrypt](https://www.npmjs.com/package/bcrypt) package.

```bash
$ npm install --save bcrypt
```

Now we're ready to create the interface. Based on [section 5.1](/2020/07/chapter-2-simple-twitter/#51-users-collection) on chapter 2 we already know what fields we need in the user model.

```typescript
export interface IUserModel extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profileImage: string;
  active: boolean;
  password: string;
  createdAt: Date;
  country: string;
  website: string;
  birthday: Date;
}
```

After the interface is created we can create the user schema with mongoose `Schema` - so we can enforce some properties on the Database level. A mongoose schema just takes a simple object with all the properties.

```typescript
const schema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  country: {
    type: String,
  },
  website: {
    type: String,
  },
  birthday: {
    type: Date,
  },
}, { timestamps: true });
```

As you can see we didn't create a `createdAt` field, that's because `{ timestamps: true }` as the second argument of the `Schema` will automatically add a `createdAt` and `updatedAt` fields to the MongoDB document.

Now we need to actually create the mongoose model from the schema.

```typescript
export const User = model<IUserModel>("user", schema, "users", true);
```

As you can see we add a field named `password` and it will be a `String` and not be `select` as default - it's mean it'll not come back when we get the document from the MongoDB database as default. If we do want it, we need to explicitly ask for it in the query.

Also, we'll not save the password as plain text in the database, this is not safe if we have a breach and the database is dumped. We need to add a middleware on every `save` to encrypt the password before we save the document and save the encrypted string instead of the plain text password string. So let's create it before we create the model.

```typescript
/**
 * Password hash middleware.
 */
schema.pre("save", function(next: NextFunction) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
```

The last thing we have to do is to create a `comparePassword` method, so we can compare the encrypted password in our database with the password the user will send us in the login (which is a plain text string). `bcrypt` has a function called [compare](https://github.com/kelektiv/node.bcrypt.js#api) that do all the hard work for us (encrypt the plain text password and compare the two).

```typescript
schema.methods.comparePassword = async (candidatePassword: string, userPassword: string): Promise<boolean> => {
  return await bcrypt.compare(candidatePassword, userPassword);
};
```

That's it, we have all we need for the user model. Let's commit the code to a new branch and open a PR.

```bash
$ git checkout -b 5
$ git add .
$ git commit -m "Add user model code"
$ git push origin 5
```

(This is the last time I'll use the `git` command and open the GitHub PR manually. From now I'll use the [GitHub CLI](https://github.com/cli/cli) since it now officially on version `1.x.x`, so if you want to follow a long and do exactly what I do install the new GitHub CLI).

&nbsp;

## 2. Create a user routes

something..

&nbsp;

## 3. Create user endpoints

something..

&nbsp;

## 4. Create user dummy data file

something..

&nbsp;

## 5. Load dummy data in seed script

something..

&nbsp;

## 6. Test the user endpoints

something..

&nbsp;

## 7. Create auth endpoints

something..

&nbsp;

## 8. Middleware of auth for relevant endpoints

something..

&nbsp;

## 9. Summary

something..
