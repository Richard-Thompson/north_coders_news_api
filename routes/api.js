const mongoose = require('mongoose');
const express = require ('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const topics = require('../models/topics.js');


mongoose.connect('mongodb://localhost/northcoders-news-api');

router.route('/').get(function (req, res) {
    res.status(200).send({status:'OK'});
});

router.route('/topics').get(controllers.getAllTopics);

router.route('/articles').get(controllers.getAllArticles);

router.route('/topics/:topic_id').get(controllers.getTopicArticles);

router.route('/articles/:article_id/comments').get(controllers.getArticleComments);

module.exports = router;