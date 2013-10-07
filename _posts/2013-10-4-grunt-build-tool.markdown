---
layout: post
title:  "The Grunt build tool"
author: "Bryan"
categories: javascript
lede: "A javascript build tool"
---

Things I like about the grunt build tool, and why it's awesome.

```javascript
module.exports = function(grunt){  
  // You have the grunt object available to you

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  if (true) {
    console.log('of course');
  }

  // Register tasks
  grunt.registerTask('default', ['uglify', 'less']);
  grunt.registerTask('copy_submodules', ['copy:submodules']);
}
```

Another Test

```ruby
def bryan
  if true
    puts 'hi'
  end

  return 'yes'
end
```