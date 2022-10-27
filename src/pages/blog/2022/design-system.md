---
layout: "../../../layouts/BlogPost.astro"
title: "A Practical Guide to Design System"
pubDate: 2022-09-01T09:00:00+03:00
draft: false
author: "Nir Galon"
authorLink: "/about"

tags: ["design system", "component library", "vuejs", "storybook", "typescript", "tailwind", "sfc", "composition", "vite"]
category: "tutorials"

hiddenFromHomePage: false
hiddenFromSearch: false

featuredImage: "/posts/2022/design-system/hero.webp"
---

It's no secret that design systems are taking over the web development world and that's a good thing IMO. But non the less, it's still a challenge to setup one. I myself encounter it when I created our own design system in the startup I work for, so I thought I'll save others some time and document my proccess.

In my startup we use [Vue.js](https://vuejs.org) (version 3, with `composition` api and `sfc` style), so naturally we also use [Vite](https://vitejs.dev), and we use [Tailwind CSS](https://tailwindcss.com) so I'll go over it also in the setup process. The UI we choose to build the components with is [Storybook](https://storybook.js.org), it's support all the frameworks and have the biggest community adoption so it was an easy choice.

&nbsp;

But first, what is a "Design System"? It's a little different if you ask a designer or a developer, but for us devlopers it's just a component library. It help us standardize design language, maintain consistency across multiple different products or platforms, document our components, etc. If you want to read more about the architecture and methodology of design systems I recommand reading [Atomic Design Methodology by Brad Frost](https://atomicdesign.bradfrost.com/chapter-2).

&nbsp;

## 1. Scaffolding the project

The first thing we need to do is actually create a regular [Vue.js](https://vuejs.org) project

```bash showLineNumbers title=" "
npm init vue@latest
```

You'll be presented with prompts for a number of optional features, choose whatever you want, it's not importent for the rest of the tutorial. But, if you want to see my choices - they're in the screenshot below.

![Vuejs CLI setup](/posts/2022/design-system/vue-cli-setup.webp "Vuejs CLI setup")

After we have an empty vue.js project (I called mine `daisy` because Daisy the Design System sounds nice in my head) we can `cd` into it and install all the dependencies (`npm install`).

&nbsp;

The next setp is to install [Storybook](https://storybook.js.org). The current version is 6.x, but I choose to install the beta (7.x) version because it's close enough to release and there are a lot of changes that integrate well with our setup (like vite and typescript support out of the box).

```bash showLineNumbers title=" "
npx sb@next init --builder=vite
```

And once the Storybook CLI done running and doing it's thing, we can run it and see our storybook default components and documentation in action

```bash showLineNumbers title=" "
npm run storybook
```

![Storybook](/posts/2022/design-system/storybook.webp "Storybook")

&nbsp;

The last thing we need to do is to add [Tailwind CSS](https://tailwindcss.com) support to our Vue.js components and as well as our Storybook UI. Adding it to the vuejs project is really easy

```bash showLineNumbers title=" "
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

And all you have left to do is to edit your `content` section (in `tailwind.config.js` file) to include the vuejs files

```js showLineNumbers title="tailwind.js" {3}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Lastly, include the Tailwind directives to our CSS by creating a new `style.css` file inside the `src` directory and add to it the @tailwind directives:

```css showLineNumbers title="style.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

&nbsp;

Now if you'll lunch your Vue.js app (`npm run dev`) Tailwind class will work, but if you lunch your Storybook (`npm run storybook`) they'll not. That's because Storybook uses it's own Vite config to run the Vue.js app (as you can see, you don't run the `index.html` and `App.vue` files, so you can actually delete them - that's what I did).

To fix this we'll use a [Storybook addon](https://storybook.js.org/addons/@storybook/addon-postcss) to run the PostCSS preprocessor against our stories

```bash showLineNumbers title=" "
npm install -D @storybook/addon-postcss
```

then add it

```js showLineNumbers title=".storybook/main.js" {8-15}
const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
};
```

and also import the `style.css` file

```js showLineNumbers title=".storybook/preview.js" {1}
import "../src/style.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

&nbsp;

## 2. Build our first component

Building our first component is just like building a regular Vue.js component, expect we'll add it a stories file.

I'll call my component `Foo` and create a directory with that name in the `components` directory (I'll actually call it `DyFoo` because [ESlint require component names to always be multi-word](https://eslint.vuejs.org/rules/multi-word-component-names.html), and `D` is the first letter of our Design System name, and `Y` is the last), and I'll also create a `.vue` and a `.stories.js` files with the same component name.

```bash showLineNumbers title=" "
touch src/components/DyFoo/DyFoo.vue
touch src/components/DyFoo/DyFoo.stories.js
```

My `DyFoo.vue` component will be fairly easy, it'll take `variant` prop with `primary` or `secondary` options and give the text `foo` some color based on them.

```vue showLineNumbers title="DyFoo.vue"
<script setup lang="ts">
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator(value: string) {
      return ["primary", "secondary"].includes(value);
    },
  },
});
</script>

<template>
  <p :class="[variant == 'primary' ? 'text-sky-500' : '', variant == 'secondary' ? 'text-gray-500' : '']">foo</p>
</template>
```

Now let's create couple of stories to demo those 2 options for the `DyFoo` component

```js showLineNumbers title="DyFoo.stories.js"
import DyFoo from "./DyFoo.vue";

export default {
  title: "Example/Foo",
  component: DyFoo,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary"],
    },
  },
};

const Template = (args) => ({
  components: { DyFoo },
  setup() {
    return { args };
  },
  template: '<DyFoo v-bind="args" />',
});

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};
```

If you'll fire Storybook now, you'll see your `Foo` component and you can play with the color of the text by selecting the different options

![DyFoo component in Storybook](/posts/2022/design-system/DyFoo.webp "DyFoo component in Storybook")

&nbsp;

## 3. Bundle our library for distribution

Now that we have a Vue.js project with Storybook and our first component (`DyFoo`), we want to distribute it. So the first thing we need to do is to tell [Vite](https://vitejs.dev) to build a **component library** and not a **project**. And we can do so by set it up to [library mode](https://vitejs.dev/guide/build.html#library-mode).

To package the vite project as a library we need to change some configuration settings

```ts showLineNumbers title="vite.config.ts" {1,10-28}
import { resolve } from "path";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "Daisy",
      fileName: (format) => `daisy.${format}.js`,
      formats: ["es", "cjs"],
    },
    target: "esnext",
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
```

The next thing is to set the main entry file to the package (`main.ts` in our case), so add those sections right after the `"script"`

```json title="package.json"
"files": [
  "dist"
],
"main": "./dist/daisy.umd.cjs",
"module": "./dist/daisy.es.js",
"types": "./dist/main.d.ts",
"exports": {
  ".": {
    "import": "./dist/daisy.es.js",
    "require": "./dist/daisy.umd.cjs"
  },
  "./dist/style.css": "./dist/style.css"
},
```

And last but not least is to export our `DyFoo` component in our entry file

```ts showLineNumbers title="main.ts"
export { default as DyFoo } from "./components/DyFoo/DyFoo.vue";
```

&nbsp;

You can now run a build (`npm run build`) and see that a `dist` directory is created, with it there are our `style.css` file and 2 new files `daisy.cjs.js` and `daisy.es.js`. Basically that's it, we're all good. But if you want to add typing for Typescript support you'll want to add couple more things.

First, edit the `build-only` npm script to emit types declarations with `vue-tsc --emitDeclarationOnly`, like this

```json title="package.json"
"build-only": "vite build && vue-tsc --emitDeclarationOnly",
```

and then add `compilerOptions` and the files to `include` (right after the `references` array)

```json title="tsconfig.json"
"compilerOptions": {
  "lib": ["ESNext", "DOM"],
  "skipLibCheck": true,
  "types": ["vite/client"],
  "outDir": "dist",
  "declaration": true
},
"include": ["src/**/*.vue", "src/main.ts"]
```

&nbsp;

## 4. Publish your vite package into GitHub packages with GitHub actions

Now that you can build your vite library locally on your machine, it's time to build it in the cloud, in GitHub actions, automatically with every commit to `main` branch. We'll also setup a step in our workflow to bump the release version (with [semantic-release](https://github.com/semantic-release/semantic-release)).

So let's create a GitHub action workflow

```bash showLineNumbers title=" "
touch .github/workflows/cd.yaml
```

And put there 3 steps:

1. Test our components (currntly just linting).
2. Publish a release to GitHub (using [semantic-release](https://github.com/semantic-release/semantic-release)).
3. Publish the packge to GitHub registry.

```yaml showLineNumbers title=".github/workflows/cd.yaml"
name: Continuous Deployment

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    name: Test the project

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "16"

      - name: Install Dependencies
        run: npm install

      - name: Run Linter
        run: npm run lint

  publish-release:
    needs: test
    runs-on: ubuntu-latest
    name: Publish a release to GitHub
    outputs:
      version: ${{ steps.release_version.outputs.version }}
    steps:
      - uses: actions/checkout@v3

      - name: Create Release 🚀
        uses: ridedott/release-me-action@master
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          release-branches: '["main"]'
          node-module: true

  publish-gpr:
    needs: publish-release
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v3

      - name: Install Dependencies
        run: npm install

      - name: Build the project
        run: npm run build

      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://npm.pkg.github.com/
          scope: "@nirgn975"
      - run: npm ci
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

We also need to change a few things in our `package.json`. First the `"name"` should start with your organization name (or username). Second, you should add a `repository` section

```json title="package.json"
"repository": {
  "type": "git",
  "url": "git://github.com/nirgn975/daisy.git"
},
```

Once you commit all the changes and push your branch to GitHub, a new GitHub workflow will automatically start, and once it finish you'll see the packge in your "packages" section inside the repository.

![GitHub Package](/posts/2022/design-system/github-package.webp "GitHub Package")

If you want to publish to `npm` or `yarn` instead, you can follow the [github publishing-nodejs-packages guide](https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages).

&nbsp;

## 5. Publish your Storybook to Chromatic

First thing we need to do is ask ourselves what is [Chromatic](https://www.chromatic.com)? and why we should want to publish our Storybook to that platform?

Chromatic is a cloud solution for Storybook that offers: Free Storybook hosting, allowing you to publish your Storybooks with local or remote changes, visual regression testing with cross-browser support, DOM snapshots to pick code changes, gathering UI feedback on PRs, and more.

Now that we understand what is Chromatic and have a good reason to want to use it, let's [sign up on their website](https://www.chromatic.com/start?startWithSignup=true) (I just sign-in with my GitHub account) and add a new step in our GitHub action to push our storybook and host it on their platform.

If it's your first time on [Chromatic](https://www.chromatic.com), go to **"projects"** and click on **"Choose from GitHub"** and a list of all your GitHub repositories will be opened, choose the repo you have used for this Design System and you'll get a `token` for that project, like in the screenshot below.

![Chromatic API Key](/posts/2022/design-system/chromatic-key.webp "Chromatic API Key")

We can use that `token` to push our Storybook directly to Chromatic (with Chromatic npm package), but it's more convenient to just use [their GitHub action step](https://github.com/chromaui/action) and add it to our workflow at the end of the file

```yaml title=".github/workflows/cd.yaml"
deploy_chromatic:
  needs: [publish-release]
  name: Deploy Design System to Chromatic
  runs-on: ubuntu-latest

  steps:
    - name: Checkout repository
      uses: actions/checkout@v3
      with:
        fetch-depth: 0

    - name: Install dependencies
      run: npm install

    - name: Publish to Chromatic
      uses: chromaui/action@v1
      with:
        token: ${{ secrets.GITHUB_TOKEN }}
        projectToken: ${{ secrets.CHROMATIC_TOKEN }}
```

The token you got from Chromatic should stay a secret that only you know (as well as any other API or access tokens), or else everyone with that token will have the power to push to your Chromatic project and change things, that's way we use `${{ secrets.CHROMATIC_TOKEN }}` as our Chromatic `projectToken`, that's mean we can hide the actual token from the source code, and we'll control it via the **"Secret"** section in the repository **"Settings"**.

So all you need to do is to create a new secret, give it a name (`CHROMATIC_TOKEN`) and insert your token as it's value (`a85f7b330490` in our case)

![GitHub Secrets](/posts/2022/design-system/github-secrets.webp "GitHub Secrets")

That's it, we're ready to commit and push our branch to GitHub and our workflow will push our Storybook to [Chromatic](https://www.chromatic.com). Once your GitHub workflow finished running you can see your Chromatic project, in the next commit Chromatic will run and catch visual changes and error, and you also have a free hosting for your Storybook.

![Storybook hosting on Chromatic](/posts/2022/design-system/chromatic-storybook.webp "Storybook hosting on Chromatic")

&nbsp;

## 6. Summary

Wow! we have done a lot and we're ready to create some new components for our component library, and everything will just work automagically (bump version, release and publish package, etc).

We can now use our Vue.js component library in other frontend projects at our startup, develop new components in isolation with Storybook, and test for visual regression with Chromatic.
