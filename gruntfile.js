module.exports = function (grunt) {

  grunt.initConfig({
    clean: {
      temp: [
        'dist/public/libs.js',
        'dist/public/libs.min.js',
        'dist/public/scripts.js',
        'dist/public/scripts.min.js',
        'dist/public/app.js'
      ],
      all: ['dist/']
    },
    jshint: {
      dist: {
        src: [
          'index.js',
          'gruntfile.js',
          'routes/**/*.js',
          'public/app.js',
          'public/app-services/**/*.js', // Services
          'public/app-values/**/*.js', // Values
          'public/home/**/*.js',
          'public/login/**/*.js',
          'public/register/**/*.js'
        ]
      }
    },
    concat: {
      scripts: {
        src: [
          'public/app-services/**/*.js', // Services
          'public/app-values/**/*.js', // Values
          'public/home/**/*.js',
          'public/login/**/*.js',
          'public/register/**/*.js'
        ],
        dest: 'dist/public/scripts.js'
      },
      libs: {
        src: [
          'public/modules/ng-idle-develop/angular-idle.min.js',
          'public/modules/ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js'
        ],
        dest: 'dist/public/libs.min.js'
      },
      all: {
        src: [
          'dist/public/scripts.min.js',
          'dist/public/libs.min.js'
        ],
        dest: 'dist/public/all.min.js'
      }
    },
    uglify: {
      scripts: {
        src: ['dist/public/scripts.js'],
        dest: 'dist/public/scripts.min.js'
      },
      app: {
        src: ['dist/public/app.js'],
        dest: 'dist/public/app.min.js'
      }
    },
    cssmin: {
      all: {
        src: ['public/app-content/**/*.css'],
        dest: 'dist/public/styles.min.css'
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      views: {
        expand: true,
        cwd: 'public/',
        src: ['**/*.html', '!index.html', '!index-prod.html'],
        dest: 'dist/public'
      }
    },
    copy: {
      main: {
        files: [
          {src: 'public/index-prod.html', dest: 'dist/public/index.html'},
          {src: 'public/app.js', dest: 'dist/public/app.js'},
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('prod', [
    'clean:all',
    'jshint',
    'concat:scripts',
    'uglify:scripts',
    'concat:libs',
    'concat:all',
    'cssmin',
    'htmlmin',
    'copy',
    'uglify:app',
    'clean:temp'
  ]);
};
