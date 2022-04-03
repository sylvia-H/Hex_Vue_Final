module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Hex_Vue_Final/'
    : '/',
  chainWebpack: (config) => {
    config.performance.set('hints', false);
  },
};
