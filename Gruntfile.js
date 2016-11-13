"use strict";
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        shell: {
          // congratulate the developer on a job well done.
          affirmation: {
            command: 'say -v Alex "Nice work, developer.  You deserve a cold beer."'
          },
          // converts coverage for js lines under to test to ts lines in the source
          remapIstanbul: {
            command: 'node_modules/.bin/remap-istanbul -i coverage/report-json/coverage-final.json -o coverage/display-report -t html'
          },
          // start up a browser to view the coverage report
          coverage: {
            command: 'node_modules/.bin/http-server -c-1 -o -p 9875 ./coverage/display-report'
          },

          electron: {
            command: 'electron main.js'
          },

          electroncompile:{
            command: 'electron main.js'
          }
        },

        watch: {
          typescript: {
            files: ['app/],
            tasks: ['webpack']
          },
        },

        // make sure to call the 'browserSync:xxxx' task rather than just 'browserSync' so it doesn't try to serve multiple things
        browserSync: {
          dist: {
            options: {
              server: './',
              // background must be true in order for grunt watch task to run
              background: true,
              browser: 'google chrome'
            }
          }
        },

    });
   
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-karma');
    
};
