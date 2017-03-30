const topics = require('../models/topics');
const articles = require('../models/articles');
const comments = require('../models/comments');

function getAllTopics (req, res) {
    topics.find({}, function (err, topics) {
        if (err) {
            return res.status(500).send({error:err});
        }
        res.status(200).send({topics:topics});
    });

}

function getTopicArticles (req, res, next) {
    articles.find({belongs_to: req.params.topic_id}, function (err, articles) {
        if (err) next(err);
        res.status(200).send({articles:articles});
    });

}

function getAllArticles (req, res, next) {
    articles.find({}, function (err, articles) {
        if (err) next(err);
        res.status(200).send({articles:articles});
    });
}

function getArticleComments (req, res, next) {
    comments.find({belongs_to:req.params.article_id}, function (err, comments) {
        console.log(req.params.article_id);
        if (err) return next(err);
        res.status(200).send({comments:comments});
    });
}

module.exports = {
    getAllTopics:getAllTopics,
    getTopicArticles:getTopicArticles,
    getAllArticles:getAllArticles,
    getArticleComments:getArticleComments
};