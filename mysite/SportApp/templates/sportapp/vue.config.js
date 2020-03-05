module.exports = {
  transpileDependencies: ['vuetify'],
  assetsDir: 'static',
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    },
    themeColor: '#1da025'
  }
};
