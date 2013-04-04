module.exports = function(grunt) {
  "use strict";

  var bower_dir = "components";
  var dist_dir = "dist"

  grunt.initConfig({
    clean: {
      start: ['components/', 'tmp/', dist_dir],
      finish: ['components/', 'tmp/']
    },
    copy: {
      main: {
        files: [{
          src: [bower_dir + '/bootstrap/less/*.less', '!' + bower_dir + '/bootstrap/less/sprites.less'],
          dest: './' + dist_dir + '/less/',
          filter: 'isFile',
          expand: true,
          flatten: true
        }, {
          src: [bower_dir + '/font-awesome/less/*.less'],
          dest: './' + dist_dir + '/less/',
          filter: 'isFile',
          expand: true,
          flatten: true
        }, {
          src: [bower_dir + '/font-awesome/font/fontawesome-webfont.*'],
          dest: './' + dist_dir + '/font/',
          filter: 'isFile',
          expand: true,
          flatten: true
        }]
      }
    },
    concat: {
      'tmp/bootstrap.js': [
        bower_dir + '/bootstrap/js/bootstrap-transition.js',
        bower_dir + '/bootstrap/js/bootstrap-alert.js',
        bower_dir + '/bootstrap/js/bootstrap-button.js',
        bower_dir + '/bootstrap/js/bootstrap-carousel.js',
        bower_dir + '/bootstrap/js/bootstrap-collapse.js',
        bower_dir + '/bootstrap/js/bootstrap-dropdown.js',
        bower_dir + '/bootstrap/js/bootstrap-modal.js',
        bower_dir + '/bootstrap/js/bootstrap-tooltip.js',
        bower_dir + '/bootstrap/js/bootstrap-popover.js',
        bower_dir + '/bootstrap/js/bootstrap-scrollspy.js',
        bower_dir + '/bootstrap/js/bootstrap-tab.js',
        bower_dir + '/bootstrap/js/bootstrap-typeahead.js',
        bower_dir + '/bootstrap/js/bootstrap-affix.js'
      ]
    },
    combine: {
      default: {
        input: 'components/bootstrap/less/bootstrap.less',
        output: 'components/bootstrap/less/bootstrap.less',
        tokens: [{
          token: "sprites.less",
          string: "font-awesome.less"
        }]
      }
    },
    uglify: {
      bootstrap: {
        options: {
          report: 'gzip'
        },
        src: 'tmp/bootstrap.js',
        dest: dist_dir + '/js/bootstrap.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-combine');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.registerTask('install', [
    'clean:start', 
    'bower', 
    'combine', 
    'concat', 
    'uglify', 
    'copy', 
    'clean:finish'
  ]);
  grunt.registerTask('bower', 'Installs Bootstrap & FontAwesome', function() {
    var done = this.async();
    var bower = require('bower');
    bower.commands.install(['bootstrap', 'font-awesome'])
      .on('data', function(data) {
        grunt.log.writeln(data);
      })
      .on('end', function(data) {
        done();
      })
  })
}
