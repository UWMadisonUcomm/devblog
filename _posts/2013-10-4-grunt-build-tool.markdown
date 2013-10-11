---
layout: post
title: The Grunt build tool
author: Bryan Shelton
categories: 
  - webdev
tags: 
  - grunt
  - JavaScript
  - build tool
lede: A JavaScript build tool
published: true
---

Grunt is a very flexible build tool, or task runner, for Node.js. A build tool is something that helps automate repetitive tasks in a project.

## A few common uses of Grunt

- Concatenating and minifying JavaScript source files into a single distribution file http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html
- Compiling [LESS](http://lesscss.org/) or [SASS](http://sass-lang.com/)
- Watching folders for changes in source files in order to automatically run jobs, like the examples above, when source files change

## How to get started with Grunt
Read Grunt's [Getting Started](http://gruntjs.com/getting-started) guide to learn how to install Grunt and get up and running.

## An example web project

**-ED: Break down this example into two: concatenaing and uglifying JS first, and compiling LESS second. People are more likely to be familiar with having multiple JS files, so they could see the benefit of putting them all into one file. Then, for more advanced peeps, compiling LESS will be useful as well**

A common use of Grunt for me is to build out JavaScript and LESS files for production. Let's take a look at both situations.

## A sample project

Let's say we working on a site and have a folder structure that contains multiple Javascript files, and multiple LESS files. Something like this:

```xml
-- javascript/
  -- main.js
  -- extras.js
  -- lib/
      -- cool_library.js
      -- cooler_library.js
-- index.html
```

Grunt can help us unify, compile, and optimize these files so they load faster on request. Let's start with the JavaScript files.

### Unifying and optimizing your JavaScript files
** Some context**
Now that JavaScript is more widely used to power web sites and apps, sometimes we end up with a bunch of files. In our sample project, we may end up with something like this:

```html
<script type="text/javascript" scr="javascript/main.js"></script>
<script type="text/javascript" scr="javascript/extras.js"></script>
<script type="text/javascript" scr="javascript/lib/cool_library.js"></script>
<script type="text/javascript" scr="javascript/lib/cooler_library.js"></script>
```
**-ED: talk about downside of several http requests: latency, page does not render til finished, etc, and how reducing http request can speed up the process, and minifying it even more so (link to Souders?)**

**-ED: talk about how Grunt can help unify (concatenate) and minify (uglify) your files**

...

**-ED: show how now you only need to include one resulting file ***
```html
<script type="text/javascript" scr="javascript/main.js"></script>
```

Voila!

## Watch if fly!
**-ED: talk about the watch task**

**-ED: closing**
## talk about why Grunt is such a cool tool to learn at this point
- it's becoming the default task running tool for many projects, including Bootstrap (link to it), replacing other, more complicated task runners
- it's easier to use
- it has an active community with new contribs every day (link to contribs)
- saves time, etc