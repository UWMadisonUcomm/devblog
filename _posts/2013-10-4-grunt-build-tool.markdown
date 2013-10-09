---
layout: post
title: The Grunt build tool
author: Bryan Shelton
categories: 
  - javascript
  - webdev
tags: 
  - grunt
  - javascript
  - build tool
lede: A Javascript build tool
published: true
---

Grunt is a very flexible build tool, or task runner, for Node.js. Some common uses for Grunt include:

  * Building and minifying Less/Sass
  * Compiling Coffeescript
  * Minifying Javascript assets
  * Running test suites or JS Hint
 
Updating this from prose.io. I promise to start writing real content very soon.

### A note on asynchronous tasks ###

The following grunt task will finish before the 1 second timeout is reached,
and you will not see "1 second mark" printed to the screen.

```javascript
grunt.registerTask('bryan', function() {
  setTimeout(function() {
    console.log('1 second mark');
  },1000);
});
```

To let Grunt know your task is running asynchronously, call the async method on this, as shown below. This will cause your task to 
keep running until nothing inside of it is waiting.

```javascript
grunt.registerTask('bryan', function() {
  this.async();
  setTimeout(function() {
    console.log('1 second mark');
  },1000);
  setTimeout(function() {
    console.log('2 second mark');
  },2000);
});
```

The previous task will display "1 second mark" after 1 seconds, and "2 second mark" after two seconds. this.async() will return
a callback which you can call to let Grunt know your task is done. I like explicitly telling my task when to finish.
The following code will quit before the 2 second mark.

```javascript
grunt.registerTask('bryan', function() {
  var done = this.async();
  setTimeout(function() {
    console.log('1 second mark');
    // Call the done callback, telling Grunt our task is finished
    done();
  },1000);
  setTimeout(function() {
    // This will not execute because we called done() after 1 second
    console.log('2 second mark');
  },2000);
});
```

If you pass false to the done callback, Grunt will assume the task has failed.