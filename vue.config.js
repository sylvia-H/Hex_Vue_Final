module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Hex_Vue_week7/'
    : '/',
  chainWebpack: (config) => {
    config.performance.set('hints', false);
  },
};
