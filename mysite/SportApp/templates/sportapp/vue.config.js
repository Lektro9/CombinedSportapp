module.exports = {
  transpileDependencies: ['vuetify'],
  assetsDir: 'static',
  pwa: {
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
    themeColor: '#1da025'
  },
};