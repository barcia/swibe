module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Compile scss to css
    sass: {
      development: {
        options: {
          sourcemap: 'none',
          style: 'expanded'
        },
        files: {
          '.tmp/swibe.css': 'swibe.scss'
        }
      }
    },

    // Postcss (autoprefixer, cssnano)
    postcss: {
      options: {
        map: false,
        processors: [

          require('autoprefixer')({
            browsers: ['last 2 version']
          }),

          require('cssnano')({
            autoprefixer: false,
            safe: true,
            sourcemap: false
          })

        ]
      },
      dist: {
        src: '.tmp/swibe.css',
        dest: 'swibe.min.css'
      }
    },

    // Uglify
    uglify: {
      options: {
        compress: true
      },
      scripts: {
        files: {
          'swibe.min.js': [ 'swibe.js']
        }
      }
    },

    // Watch
    watch: {
      styles: {
        files: ['swibe.scss'],
        tasks: ['css']
      },
      scripts: {
        files: ['swibe.js'],
        tasks: ['js']
      },
    },

    // BrowserSync
    browserSync: {
      bsFiles: {
        src : ['swibe.min.css', 'swibe.js', 'demo.html', 'test.html']
      },
      options: {
        server: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('sync', ['browserSync']);
  grunt.registerTask('css', ['sass', 'postcss']);
  grunt.registerTask('js', ['uglify']);
  grunt.registerTask('all', ['sass', 'postcss','uglify']);
};
