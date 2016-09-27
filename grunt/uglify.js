module.exports = {
  all: {
    files: [{
      expand: true,
      cwd: 'js',
      src: '**/*.js',
      dest: 'js',
      ext: '.min.js'
    }]
  }
};
