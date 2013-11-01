---
layout: post
title: Grunt, The JavaScript Task Runner
author: Bryan Shelton
categories:
  - webdev
tags:
  - grunt
  - JavaScript
  - build tool
  - task runner
lede: Automating Tasks
published: true
---

[Grunt](http://gruntjs.com/) is a very flexible task runner, or build tool, that runs in [Node.js](http://nodejs.org/), and helps you automate common tasks within your project.

Grunt uses a variety of specialized, well supported _modules_ to automate tasks, but if you're more of a do-it-yourself'er, it also allows you to easily write your own.

## A few common uses of Grunt
Some common tasks you can automate with Grunt to make your life easier include:

- Combining and minifying JavaScript source files into a single distribution file ([reducing file requests is an important web performance technique](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html))
- Compiling [LESS](http://lesscss.org/) and [SASS](http://sass-lang.com/)
- Unit testing
- Watching folders for changes in source files in order to automatically run necessary tasks

## How to get started with Grunt
Read Grunt's [Getting Started](http://gruntjs.com/getting-started) guide to learn how to install Grunt and get up and running. You'll need [Node.js](http://nodejs.org/).

## Example Project

Let's run through a very simple example web project. The example code can be found here:

[https://github.com/UWMadisonUcomm/grunt-simple-example](https://github.com/UWMadisonUcomm/grunt-simple-example)

Our project consists of a few javascript libraries, and an application javascript file. We also have a LESS stylesheet that will pull in some other CSS libraries. We'll be "compiling" all of this down to two minified production ready assets in the assets/ folder. The structure looks like this:

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
-- package.json
-- Gruntfile.js
```


There are two required Grunt files you need to get things going:

* `package.json`: will define Grunt, and the grunt modules we need, as dependencies.
* `Gruntfile.js`: is where we'll configure our grunt tasks. 


In this exercise, we're going to concatenate (combine) and minify the JavaScript files into `assets/app.min.js`, using the `grunt-contrib-uglify` module. We'll use the `grunt-contrib-less` module to compile `application.less` into `assets/app.min.css`. LESS can inherintly concatenate, so I usually target a single LESS file and use LESS to pull in other project files.

### The grunt file structure ###

```javascript
module.exports = function(grunt){
  grunt.initConfig({
    // Configure grunt modules
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['uglify', 'less']);
}
```

`Gruntfile.js` tasks will always be in a wrapper that looks similar to the above example. `loadNpmTasks` will load grunt tasks from modules. `registerTask` will register a task name.
Grunt runs the task named "default" if no tasks are given on the command line. 

In the above example, typing grunt in your project root will run the "uglify" and "less" tasks, both of which are defined by their respective contributed modules.

### Building our JavaScript ###

To get our JavaScript source files built to `assets/app.min.js`, we'll add some configuration for the `grunt-contrib-uglify` module.

```javascript
module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      main: {
        files: {
          'assets/app.min.js': [
            'src/javascripts/jquery-1.10.2.min.js',
            'src/javascripts/bootstrap.js',
            'src/javascripts/application.js'
          ]
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['uglify', 'less']);
}
```

Running the `uglify` command will compile all the specified JavaScript files into one compressed file, `assets/app.min.js`:

```bash
$ grunt uglify
```

### Compiling our LESS file ###

In this part, we will compile our LESS files into CSS and compress the resulting CSS file using the [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less) module.

First , take a look at the `less` task we've added to `grunt.initConfig`:

```javascript
module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      main: {
        files: {
          'assets/app.min.js': [
            'src/javascripts/jquery-1.10.2.min.js',
            'src/javascripts/bootstrap.js',
            'src/javascripts/application.js'
          ]
        }
      }
    },
    less: {
      application: {
        files: {
          "assets/app.min.css": "src/stylesheets/application.less"
        },
        options: {
          yuicompress: true
        }
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['uglify', 'less']);
}
```

In this example, we are configuring the `less` by passing two parameters:

* `files:` which takes the name of the resulting CSS file, and the source of the LESS file we're compiling it from, in that order.
  * Note that we are specifying only one source LESS file, `application.less`. In this example, this file itself pulls in the other LESS and CSS assets in the src directory via the @import statement, which keeps us from having to specify many source files in the `files` parameter.
* `options`: which takes configuration options for the `less` task. In this case, we're setting the `yuicompress` option to `true` to enable compression of the resulting CSS file using cssmin.js, a library included in `grunt-contrib-less`. There are [many other options](https://github.com/gruntjs/grunt-contrib-less#options) you can add to the `less` task.

At this point, running grunt from the command line should successfully build `assets/app.min.js`, and `assets/app.min.css`. We've told it to run the uglify and less tasks by default.

```bash
$ grunt
```

### Watching for changes ###

Grunt has a watch module that can watch for changes in certain files, and execute commands when changes are detected. As a final step, we'd like to execute the `uglify` task when javascript source files are changed, and the `less` task when less files are changed. Our final `Gruntfile.js` should look like this:

```javascript
module.exports = function(grunt){
  grunt.initConfig({
    uglify: {
      main: {
        files: {
          'assets/app.min.js': [
            'src/javascripts/jquery-1.10.2.min.js',
            'src/javascripts/bootstrap.js',
            'src/javascripts/application.js'
          ]
        }
      }
    },
    less: {
      application: {
        files: {
          "assets/app.min.css": "src/stylesheets/application.less"
        },
        options: {
          yuicompress: true
        }
      }
    },
    watch: {
      javascripts: {
        files: ['src/javascripts/**/*'],
        tasks: ['uglify']
      },
      stylesheets: {
        files: ['src/stylesheets/**/*'],
        tasks: ['less']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['uglify', 'less']);
}
```
The new `watch` task takes custom watch rules (in this case we named them `javascripts` and `stylesheets`, but you can name them whatever you want). Within these rules, you need to specify:

* `files:` the path to the files or directories you want to keep an eye on for changes. For example, in the `javascripts` watch rule, we're asking Grunt to look for changes in the `src/javascripts/**/*` directory. The `**/*` means that any changes to directories or files inside the `scr/javascripts/` directory will trigger the task. There are plenty of other combinations you can use.
* `tasks:` the name of the custom task(s) you want to execute when changes are detected in the specified directories.


Now, when we type `grunt watch` on the command line in our project, Grunt will standy by, watching for changes. Try editing the javascript or less source files, and grunt should rebuild the final assets automatically when you save your changes.

```bash
$ grunt watch
```

## Final thoughts

Grunt is a great general purpose automation tool with lots of existing contrib modules to make common project tasks easy to script and execute. We like it because it fits nicely into most projects. Node.js has become a common part of our workflow, even if the project itself is written in a different server side language.
