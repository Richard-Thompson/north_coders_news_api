module.exports = {
  DB: {
    test: 'mongodb://localhost/northcoders-news-api-test',
    dev: 'mongodb://ncnews:ncnews@ds129179.mlab.com:29179/north_coders_news'
  },
  PORT: {
    test: 3090,
    dev: process.env.PORT || 3000
  }
};
