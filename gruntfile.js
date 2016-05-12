// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  "use strict";

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),



    // SCSS compliler
    sass: {
        build: {
          options: {
            loadPath: require('node-bourbon').includePaths
          },
            files: {
              'dist/assets/css/style.css': 'src/assets/css/style.scss',
              'dist/assets/css/style_mobile.css': 'src/assets/css/style_mobile.scss'
            }
        }
    },



    // Copy JS files in prod directory
    copy: {
      build: {
        expand: true, cwd: 'src', src: '**', dest: 'dist/' 
      },
    },



    // Baking in includes
    bake: {
        build: {
            options: {},

            files: {}
        },
    },
    


    // Watch these files and run 'on-change'
    watch: {
      css: {
        files: ['src/assets/css/*.scss'],
        tasks: ['newer:sass:build']
      },

      bake: {
        files: ['src/**/*.html'],
        tasks: ['newer:bake:build']
      },

      copy: {
        files: ['src/**/**/*', 'src/**/*'],
        tasks: ['newer:copy:build']
      }
    },



    // Include file sources to pages
    fileblocks: {
      careers: {
        files: [{
          src: 'src/careers/index.html',
          dest: 'dist/careers/index.html',
          options: {
            rebuild: true
          },
          blocks: {
            'mainJS': { src: ['dist/assets/js/*.js'] },
            'styleCSS': { src: ['dist/assets/css/*.css'] }
          }
        }]
      },
      college: {
        files: [{
          src: 'src/college/index.html',
          dest: 'dist/college/index.html',
          options: {
            rebuild: true
          },
          blocks: {
            'mainJS': { src: ['dist/assets/js/main.js'] },
            'styleCSS': { src: ['dist/assets/css/style.css'] }
          }
        }]
      }
    }     

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-file-blocks');
  grunt.loadNpmTasks('grunt-newer');
};
