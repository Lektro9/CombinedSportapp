import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    themes: {
      light: {
        primary: '#002B36',
        secondary: '#00C5A6',
        accent: '#FFF7D6',
        error: '#b71c1c',
      },
    },
  },
});
