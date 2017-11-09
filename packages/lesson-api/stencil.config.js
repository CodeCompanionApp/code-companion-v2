exports.config = {
  namespace: 'codecompanion',
  generateDistribution: true,
  generateWWW: true,
  hashFileNames: false,
  bundles: [
    { components: ['cc-lesson', 'cc-slide'] },
  ],
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
};
