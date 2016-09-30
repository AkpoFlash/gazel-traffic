module.exports = {

  options: {
    spawn: false,
    livereload: true
  },

  scripts: {
    files: [
      'js/*.js'
    ],
    tasks: [
      'clean:scripts',
      'uglify'
    ]
  },

  styles: {
    files: [
      'css/*.less'
    ],
    tasks: [
      'clean:styles',
      'less'
    ]
  },
};
