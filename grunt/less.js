module.exports = {
  less: {
    options: {
      compress: true,
      sourceMap: false
    },
    files: [{
      expand: true,
      cwd: 'css',
      src: ['*.less'],
      dest: 'css',
      ext: '.min.css'
    }]
  }
};
