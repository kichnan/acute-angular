---
layout: post
author: krishnan
title:  "Node could not find a binding for your current environment"
date:   2017-02-10 00:05:00 +0530
categories: Node
---

If you are a rookie or novice Node developer, just getting started, you may have
run across the following error when you ran a [Node][]-based application for the
first time.

    Error when running a Node application:
	Node 'xxx' could not find a binding for your current environment: Windows 64-bit with Node.js 6.x

The above error is for a typical Windows environment with Node v6.x, but this may
turn up in any other environment too, like Linux or Mac.

The reason this happens is if the code you downloaded or setup contained pre-existing
`node_modules` folders in it that was built/compiled (`npm install`) using a different
Node version or in a different operating system environment than yours.

The fix is simple:
- Delete node_modules folder
- `npm install` again


[Node]: https://nodejs.org/en/
