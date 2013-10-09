module.exports = function(grunt){
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      submodules: {
        files: [
          {
            src: '**/*',
            dest: '_assets/less/uw_bootstrap',
            cwd: '_submodules/uw_bootstrap/src/less',
            flatten: false,
            expand: true
          },
          {
            src: '_submodules/uw_bootstrap/src/img/*', // uw bootstrap images
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
          beautify: false,
          mangle: false
        },
        files: {
          "js/uw_devblog.js": ['_assets/highlight.js/highlight.pack.js','_assets/js/bootstrap.js', '_assets/js/uw_devblog.js']
        }
      }
    },
    less: {
      all: {
        options: {
          yuicompress: true
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
