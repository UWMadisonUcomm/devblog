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

Grunt is a very flexible build tool, or task runner, for Node.js **-ED: (what's a build tool/task runner? what does/can it help me do? why are they cool for me as a developer?)**.


## Common uses of Grunt

- Concatenating and minifying JavaScript source files into a single distribution file. **-ED: why should I concatenate and minify a file? Is there a place I can learn more about it?**
- Compiling [LESS](http://lesscss.org/) or [SASS](http://sass-lang.com/) **what are LESS and SASS?**
- Compiling [CoffeeScript](http://coffeescript.org/)
- Custom project build tasks

## Learn more and get started with Grunt
Read Grunt's [Getting Started](http://gruntjs.com/getting-started) guide to learn how to install and get it up and running.

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
  -- less/
    -- project.less
    -- lib/
        -- mixins.less
        -- variables.less
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


### Compiling LESS

**-ED: Some context**
LESS (like SASS) is a dynamic stylesheet language that helps you _program_ your stylesheets (with variables, functions, operators, etc), and then _compile_ them to generate your CSS files.

Grunt can help you compile LESS to generate your CSS files this on the fly, saving you the task to have to do so manually every time you make changes to your stylesheets. Let's see how:

**-ED: refer to sample structure**

**-ED: how grunt can be configured to compile less**

**-ED: show how now you only need to include one resulting file ***
```html
<link rel="stylesheet" type="text/css" href="css/style.css">
```

Voila!


## Watch if fly!
**-ED: talk about the watch task**


## A note on asynchronous grunt tasks

Grunt assumes your tasks are running synchronously (**-ED: what do you mean (some people still don't get that JS is asynchronous by nature)?**). **-ED: This is important to keep in mind because...**.

The following grunt task will **not** output "1 second mark."

```JavaScript
grunt.registerTask('bryan', function() {
  setTimeout(function() {
    console.log('1 second mark');
  },1000);
});
```

To let Grunt know your task is running asynchronously, call the async() method on the task. This will return a callback you can call when your task is finished. If you don't call the done callback, grunt seems to still wait until nothing in your task is waiting. I think it's better practice to call done() when your task is complete.

The following task will output "1 second mark" and finish.

```JavaScript
grunt.registerTask('bryan', function() {
  var done = this.async();
  setTimeout(function() {
    console.log('1 second mark');
    done();
  },1000);
});
```
_Passing false to the done() callback will tell Grunt the task has failed._

**-ED: closing**
## talk about why Grunt is such a cool tool to learn at this point
- it's becoming the default task running tool for many projects, including Bootstrap (link to it), replacing other, more complicated task runners
- it's easier to use
- it has an active community with new contribs every day (link to contribs)
- saves time, etc

