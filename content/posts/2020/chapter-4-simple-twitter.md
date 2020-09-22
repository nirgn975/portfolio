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
- [ ] User controllers.
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

Now that we have a commit in the new branch, I can open a new Pull Request and you can follow my commits [here](https://github.com/nirgn975/simple-twitter-server/pull/6).

&nbsp;

## 2. Create a user routes

Our Model is ready, but we don't do nothing with it yet. It's time to create some new routes for our `user` entity, and _"register"_ them in the main `app` routes. And as before, we can check our [section 4.1](/2020/07/chapter-2-simple-twitter/#41-users) on chapter 2 to see what routes we need to create.

First thing we need to do is to `import` the express `Router` and create a `Router`. Then, at the end of the file, let's `export` that `Router` so we can `import` it later in the `app` routes - to register that router (with it's routes).

```typescript
import { Router } from "express";

const router: Router = Router();

export default router;
```

Now, we don't have the controllers yet (the function that will run when we hit each of the endpoints - routes), but let's pretend we already created them and write the controllers names in the right endpoint. We'll add them between the `router` variable to the `export`.

```typescript
router.param("username", usernameParam);

router.route("/followers/:username")
  .get(getFollowersList);

router.route("/following/:username")
  .get(getFollowingList);

router.route("/follow/:username")
  .post(followUser);

router.route("/unfollow/:username")
  .post(unfollowUser);

router.route("/:username")
  .get(getUserInfo);

router.route("/feed")
  .get(getOwnFeed);

router.route("/reset-password")
  .post(resetOwnPassword);

router.route("/password")
  .put(changeOwnPassword);

router.route("/settings")
  .put(changeOwnSettings);

router.route("/")
  .post(createUser)
  .put(editMyInfo)
  .delete(deleteMe);
```

The first one is a little different from the rest, it's a `param` route. You can see in the other `route`s we have a url param named `username` (you can see it have a `:` before the actual param name, this is the way we do [url parameters in express](http://expressjs.com/en/api.html#router.route)). So the first one (named `param`) is a way to create a middleware that will run first, in each of the endpoints that have this url parameter (named `username`).

This way, when we get to the actual controller (in `getUserInfo` for example), we **know** that `usernameParam` middleware (just a function) already run. In this middleware we'll get the `user` by it's `username` and attach it to the request, so when we'll be in `getUserInfo` controller (again, also, just a function), we just need to get the user from `request.user` to get the user.

Every other route is just an endpoint, where the HTTP method is the method of the route and we chains them one after the other in the same path. For example the last one (`/`) will be the `/user`, and it'll have a POST endpoint, a PUT endpoint, and a DELETE endpoint (all of them on the same `/user` path).

Notice the way we write the endpoints, from the very detailed one to the least detailed one (without any more words in the URL path or parameters). This is because the express router is a lazy one, it doesn't check all of the routes, it check the routes until one of them can answer the requested one and run it's controller.

So if we'll put the `/` at the top, even if we send request to `user/foo` (_"foo"_ here is the `username` param), we'll run the `/user` controller if we have a GET method (in our case it will not going to happen because we don't have a `/user` GET route, and also we prevent that by order the routes correctly).

Now that we have all the routes in place, we need to import the controllers from `userController` (although we don't have any of them yet, and don't even the file itself, let's pretend there is).

```typescript
import {
  usernameParam, getOwnFeed, getUserInfo, getFollowersList, getFollowingList, followUser, unfollowUser, resetOwnPassword,
  changeOwnPassword, changeOwnSettings, createUser, editMyInfo, deleteMe,
} from "./userController";
```

The final thing in this section is to import the route at the `app.ts` file.

```typescript
import * as userRoutes from "./api/user/userRoutes";
```

And before the root (`/`) route, in the `configureRoutes` function, let's register the `user` router.

```typescript
this.app.use("/user", userRoutes.default);
```

{{< admonition type=warning title="Warning" open=true >}}
Don't forget to commit the code and push it to GitHub.
{{< /admonition >}}

&nbsp;

## 3. Create user controllers

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
