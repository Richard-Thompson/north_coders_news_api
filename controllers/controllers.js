const topics = require('../models/topics');
const articles = require('../models/articles');
const comments = require('../models/comments');
const mongoose = require('mongoose');
const async = require('async');

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
    async.waterfall([
        function (next) {
            articles.find({},function (err, articles){
                if (err) return next(err);
                next(null, articles);
            });
        },
        function (articles, done) {
            async.map(articles,function (article, next) {
                comments.count({belongs_to:article._id}, function (err, count) {
                    if (err) return done(err);
                    article = article.toObject();
                    article.comments_count = count;
                    next(null, article);
                }); 
            
            },done);
        },
            console.log('hello')
        
    ],function (err, result) {
        if (err) return next(err);

        res.status(200).send({articles:result})

    });
}
   

function getArticleComments (req, res, next) {
    comments.find({belongs_to:req.params.article_id}, function (err, comments) {
        if (err) return next(err);
        res.status(200).send({comments:comments});
    });
}

function addArticleComment (req, res, next) {
    let comment = new comments({belongs_to: req.params.article_id, body:req.body.comment});
     comment.save(function (err) {
        if (err) return next(err);
        res.status(201).send({belongs_to:req.params.article_id, body:req.body});
    });
}

function upVoteDownVote (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.article_id), vote = req.query.vote, voteIncrement = 0;
    if (vote === 'up') voteIncrement = 1;
    if (vote === 'down') voteIncrement = -1;
    articles.update({_id:id},{$inc:{votes: voteIncrement}}, function (err) {
        if (err) return next(err);

        res.status(200).send({votes: vote});
    });
}

module.exports = {
    getAllTopics:getAllTopics,
    getTopicArticles:getTopicArticles,
    getAllArticles:getAllArticles,
    getArticleComments:getArticleComments,
    addArticleComment:addArticleComment,
    upVoteDownVote:upVoteDownVote
};