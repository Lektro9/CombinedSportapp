module.exports = {
  transpileDependencies: ['vuetify'],
  assetsDir: 'static',
  pwa: {
    name: 'CalisApp',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /^.*robots.*$/,
        /^.*svg.*$/,
        /^.*png.*$/,
        /^.*ico.*$/,
        /^.*map.*$/,
      ],
    },
    themeColor: '#002B36',
  },
};
