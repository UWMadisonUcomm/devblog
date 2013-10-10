---
layout: post
title: The Grunt build tool
author: Bryan Shelton
categories: 
  - webdev
tags: 
  - grunt
  - javascript
  - build tool
lede: A Javascript build tool
published: true
---

Grunt is a very flexible build tool, or task runner, for Node.js. Some common uses of Grunt are:

- Concatonating and minifying javascript source files into a singule distribution file
- Compiling Less or Sass
- Compiling Coffeescript
- Custom project build tasks

Read Grunt's [Getting Started](http://gruntjs.com/getting-started) guide to learn how to install and get up and running with Grunt.

## An example web project ##

A common use of Grunt for me is to build out less and javascript files for production.

Let's say we have a folder structure that contains multiple less files, and multiple javascript files. Something like this:

```xml
-- less/
    -- project.less
    -- lib/
        -- mixins.less
        -- variables.less
 -- javascripts/
    -- main.js
    -- lib/
        -- cool_library.js
```

## A note on asynchronous grunt tasks ##

Grunt assumes your tasks are running synchronously. The following grunt task will **not** output "1 second mark."

```javascript
grunt.registerTask('bryan', function() {
  setTimeout(function() {
    console.log('1 second mark');
  },1000);
});
```

To let Grunt know your task is running asynchronously, call the async() method on the task. This will return a callback you can call when your task is finished. If you don't call the done callback, grunt seems to still wait until nothing in your task is waiting. I think it's better practice to call done() when your task is complete.

The following task will output "1 second mark" and finish.

```javascript
grunt.registerTask('bryan', function() {
  var done = this.async();
  setTimeout(function() {
    console.log('1 second mark');
    done();
  },1000);
});
```
_Passing false to the done() callback will tell Grunt the task has failed._