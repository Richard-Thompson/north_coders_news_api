module.exports = {
  DB: {
    test: 'mongodb://ncnews:ncnews@ds129179.mlab.com:29179/north_coders_news',
    dev: 'mongodb://ncnews:ncnews@ds129179.mlab.com:29179/north_coders_news'
  },
  PORT: {
    test: 3000,
    dev: process.env.PORT || 3000
  }
};
