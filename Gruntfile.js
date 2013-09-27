module.exports = function(grunt){
  
  // Define js scripts to include
  
    // Bootstrap
    var bootstrap_js_files = [];
    [
      'transition',
      'tab',
      'affix',
      'collapse'
    ].forEach(function(item){
      bootstrap_js_files.push('_submodules/bootstrap/js/' + item + '.js');
    });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      submodules: {
        files: [ 
          {
            src: '_submodules/bootstrap/less/*.less', // bootstrap
            dest: '_assets/less/bootstrap/less/',
            flatten: true,
            expand: true
          },
          {
            src: '_submodules/uw_bootstrap/*.less', // uw bootstrap
            dest: '_assets/less/uw_bootstrap/',
            flatten: true,
            expand: true
          },
          {
            src: '_submodules/uw_bootstrap/img/*', // uw bootstrap images
            dest: 'img/',
            flatten: true,
            expand: true
          }
        ]
      }
    },
    uglify: {
      all: {
        options: {
          beautify: true,
          mangle: false
        },
        files: {
          "js/uw_devblog.js": [bootstrap_js_files, '_assets/js/uw_devblog.js']
        }
      }
    },
    less: {
      all: {
        options: {
          yiucompress: true
        },
        files: {
          'css/uw_devblog.css': ["_assets/less/uw_devblog.less"]
        }
      }
    },
    watch: {
      all: {
        files: ['_assets/js/*.js', '_assets/less/*.less'],
        tasks: ['default']
      },
      submodules: {
        files: ['_submodules/**/*'],
        tasks: ['copy:submodules', 'default']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register tasks
  grunt.registerTask('default', ['uglify', 'less']);
  grunt.registerTask('copy_submodules', ['copy:submodules']);

}
