---
title: "Learn Git - Part 3: start collaborate"
pubDate: 2014-08-03T09:00:00+03:00
draft: true
tags: ["git", "learn", "github"]
category: "git"
featuredImage: "/posts/2014/learn-git-part-1-introduction/cover.webp"
---

This part is a direct continuation of [Learn Git - Part 2: getting our hands dirty](/blog/2014/learn-git-part-2-getting-our-hands-dirty), so if you haven’t read it, go and read it first. We based on the things we learned and do there, so make sure you don’t delete the repo we created in the part 2.

In the third part of our _**Lean Git**_ series, we will go through two different collaboration scenarios, in which not everything works as smoothly as it did in the previous part (the second part of the series). Next we'll continue with the topic of remote branches (similar to remote repositories), working together on the same branch, removing branches, etc. And finally, we'll go over tags.

&nbsp;

## First scenarios

Let's say Alice pushed her project to GitHub, and Bob wants a copy of the project, he will clone it with the `git clone <URL>` command. Alice will then make some changes to the project (let's say she added a new file called `words.txt` (`git add --all`), then commit it (`git commit -m "Add words.txt file"` and finally pushed the changes to GitHub (`git push`)). Now we'll move on to Bob, Bob was working while Alice made her changes, and made his own changes (changes to an existing file, which the git system is already following, and commit it(`git commit -m -a "Update the readme"`)). So now we have Alice's commit that has already been updated on GitHub and Bob's commit, which sits in his local repo (on his computer), and they are different.

<--- photo/memid -->

So what will happen if Bob tries to push his commit to GitHub? As you can see in the code below, it will rejected. And according to the description, it was rejected due to the fact that the end of it's branch (the last commit in his local branch) is different from the one in the remote branch.

```bash showLineNumbers title=" "
git push
```

output:

```txt title=" "
To http://github.com/nirgn975/test.git
![rejected] main -> main (non-fast-forward)
error:failed to push some refs to 'http://github.com/nirgn975/test.git'
hint: Update were rejected because the tip of your current branch is behind
hint: it's remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```
