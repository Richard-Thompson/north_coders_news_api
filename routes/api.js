const mongoose = require('mongoose');
const express = require ('express');
const router = express.Router();
const controllers = require('../controllers/controllers');
const topics = require('../models/topics.js');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/northcoders-news-api');


router.route('/').get(function (req, res) {
    res.status(200).send({status:'OK'});
});

router.route('/topics').get(controllers.getAllTopics);

router.route('/articles').get(controllers.getAllArticles);

router.route('/topics/:topic_id').get(controllers.getTopicArticles);

router.route('/articles/:article_id/comments').get(controllers.getArticleComments);

bodyParser.json();

router.route('/articles/:article_id/comments').post(controllers.addArticleComment);

router.route('/articles/:article_id').put(controllers.upVoteDownVote);

router.route('/comments/:comment_id').delete(controllers.removeComment);

// router.route('/users/:username').get(controllers.getProfile);

module.exports = router;
