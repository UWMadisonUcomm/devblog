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

Grunt is a very flexible build tool, or task runner, that runs in [Node.js](http://nodejs.org/). It helps you automate common tasks within your project. There are a huge number of contributed plugins to help you automate most common tasks, and it is fairly easy to write your own custom tasks when necessary.

## A few common uses of Grunt

- Concatenating and minifying JavaScript source files into a single distribution file [http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html](http://developer.yahoo.com/blogs/ydn/high-performance-sites-rule-1-fewer-http-requests-7163.html)
- Compiling [LESS](http://lesscss.org/) and [SASS](http://sass-lang.com/)
- Unit testing
- Watching folders for changes in source files in order to automatically run necessary tasks

## How to get started with Grunt
Read Grunt's [Getting Started](http://gruntjs.com/getting-started) guide to learn how to install Grunt and get up and running. You'll need [Node.js](http://nodejs.org/).

## Example Project ##

We're going to run through a very simple example web project. The example code can be found here:

[https://github.com/UWMadisonUcomm/grunt-simple-example](https://github.com/UWMadisonUcomm/grunt-simple-example)

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

Gruntfile.js will always be in a wrapper that looks similar to the above example. loadNpmTasks will load grunt tasks from modules. registerTask will register a task name.
Grunt runs the task named "default" if no tasks are given on the command line. In the above example, typing grunt in your project root will run the "uglify" and "less" tasks, both of which are defined by their respective contributed modules.

### Building our javascript ###

To get our javascript source files built to assets/app.min.js, we'll add some configuration for the grunt-contrib-uglify module.

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

### Compiling our Less file ###

Compiling our src/application.less file will look a lot like compiling our javascript. We will configure the grunt-contrib-less module.

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
        options: {
          yuicompress: true
        },
        files: {
          "assets/app.min.css": "src/stylesheets/application.less"
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

Here we've passed an option to the less parser. We've told it to use yuicompressor to compress the final CSS output. The application.less file itself pulls in the other CSS assets in the src directory, in the order it needs them. By specifying to import the files as less, by using @import (less), in the import statements, we've told Less to process the css stylesheets as less files, which will cause them to be concatenated rather than writing out an @import line in the final css stylesheet.

At this point, running grunt from the command line should successfully build assets/app.min.js, and assets/app.min.css. We've told it to run the uglify and less tasks by default.

### Watching for changes ###

Grunt has a watch module that can watch for changes in certain files, and execute commands when changes are detected. We'd like to execute the uglify task when javascript sources files are changed, and the less task when less files are changed. Our final Gruntfile.js should look like this:

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
        options: {
          yuicompress: true
        },
        files: {
          "assets/app.min.css": "src/stylesheets/application.less"
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

Now, when we type "grunt watch" on the command line in our project, we'll see that grunt is watching for changes. Try editing the javascript or less source files, and grunt should rebuild the final assets automatically when you save your changes.

## Final thoughts ##

