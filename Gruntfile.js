module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/main.css": "less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      options: {livereload:true},
      files:['./**'],
      tasks:[],
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    express: {
      all: {
        options: {
          port:3000,
          hostname:'localhost',
          bases:['./'],
          livereload:true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-less');

	grunt.registerTask('server', ['express','express-keepalive','watch']);

  //grunt.registerTask('default', ['less', 'watch']);
};
