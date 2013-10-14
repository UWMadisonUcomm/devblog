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

Grunt is a very flexible build tool, or task runner, that runs in [Node.js](http://nodejs.org/). It helps you automate common tasks within your project. There are a huge amount of contributed plugins to help you automate most common tasks, and it is fairly easy to write your own custom tasks when needed.

## A few common uses of Grunt

- Concatenating and minifying JavaScript source files into a single distribution file [http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html)
- Compiling [LESS](http://lesscss.org/) and [SASS](http://sass-lang.com/)
- Unit testing
- Watching folders for changes in source files in order to automatically run necessary tasks

## How to get started with Grunt
Read Grunt's [Getting Started](http://gruntjs.com/getting-started) guide to learn how to install Grunt and get up and running. You'll need [Node.js](http://nodejs.org/).

## An example web project

We're going to run through a very simple example web project. The example code can be found here:

[https://github.com/UWMadisonUcomm/grunt-simple-example](https://github.com/UWMadisonUcomm/grunt-simple-example)

## The layout

Our project consists of a few javascript libraries, and an application javascript file. We also have a Less stylesheet that will pull in some other CSS. We'll be "compiling" all of this down to two minified production ready assets in the assets/ folder. The structure looks like this:

```xml
-- src/
  -- javascripts/
    -- application.js
    -- bootstrap.js
    -- jquery-1.10.2.min.js
  -- stylsheets/
    -- application.less
    -- bootstrap-theme.css
    -- bootstrap.css
-- assets/ (Assets will be generated here by Grunt)
-- index.html
-- pacakge.json
-- Gruntfile.js
```

Package.json will define Grunt, and the grunt modules we need, as dependencies. Gruntfile.js is where we'll configure our grunt tasks. We're going to concatenate (combine) and minify the javascripts into assets/app.min.js, using the grunt-contrib-uglify module. We'll use the grunt-contrib-less module to compile application.less into assets/app.min.css. Less can inherintly concatenate, so I usually target a single Less file and use Less' inherint ability to pull in other files.

This gives us a src structure that's easy to read through and work with that will easily render down to production ready assets.

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