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
      'uglify'
    ]
  },

  styles: {
    files: [
      'css/*.scss'
    ],
    tasks: [
      'less'
    ]
  },
};
