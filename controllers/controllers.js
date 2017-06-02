const topics = require("../models/topics");
const articles = require("../models/articles");
const comments = require("../models/comments");
const mongoose = require("mongoose");
const async = require("async");

function getAllTopics (req, res) {
    topics.find({}, function (err, topics) {
        if (err) {
            return res.status(500).send({error:err});
        }
        res.status(200).send({topics:topics});
    });

}

function getTopicArticles (req, res) {
    articles.find({belongs_to: req.params.topic_id}, function (err, articles) {
        if (articles.length === 0) return res.status(204).send({status: "NO CONTENT"});
        if (err) return res.status(404).send({error:err});
        res.status(200).send({articles:articles});
    });

}

function getAllArticles (req, res, next) {
    async.waterfall([
        function (next) {
            articles.find({},function (err, articles) {
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
            
            }, done);
        },
        
    ],function (err, result) {
        if (err) return next(err);

        res.status(200).send({articles:result});

    });
}

function getArticle (req, res, next) {
    if (req.params.article_id.length !== 24) return res.status(400).send({status:"BAD REQUEST"});
    let id = mongoose.Types.ObjectId(req.params.article_id);
    articles.find({_id:id}, function (err, article) {
       if (article.length === 0) return res.status(204).send({status: "NO CONTENT"});
       if (err) next(err);
        res.status(200).send(article);
    });
}
   

function getArticleComments (req, res, next) {
     if (req.params.article_id.length !== 24) return res.status(400).send({status:"BAD REQUEST"});
     comments.find({belongs_to:req.params.article_id}, function (err, comments) {
         if (comments.length === 0) return res.status(204).send({status: "NO CONTENT"});
         if (err) next(err);
         res.status(200).send({comments:comments});
    });
}

function addArticleComment (req, res, next) {
    if (!req.body.comment) return res.status(400).send({status: "BAD REQUEST"});
    let comment = new comments({belongs_to: req.params.article_id, body:req.body.comment});
     comment.save(function (err) {
        if (err) return next(err);
        res.status(201).send({belongs_to:req.params.article_id, body:req.body});
    });
}

function articleVote (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.article_id), vote = req.query.vote, voteIncrement = 0;
    if (vote !== "up" && vote !== "down") return res.status(400).send({status: "BAD REQUEST"});
    if (vote === "up") voteIncrement = 1;
    if (vote === "down") voteIncrement = -1;
    articles.update({_id:id},{$inc:{votes: voteIncrement}}, function (err) {
        if (err) return next(err);

        res.status(201).send({votes: vote});
    });
}

function removeComment (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.comment_id);
    
    comments.remove({_id:id}, function (err) {
        if (err) return next(err);

        res.status(204);
    });
}

function commentVote (req, res, next) {
    let id = mongoose.Types.ObjectId(req.params.comment_id), vote = req.query.vote, voteIncrement = 0;
    if (vote !== "up" && vote !== "down") return res.status(400).send({status: "BAD REQUEST"});
    if (vote === "up") voteIncrement = 1;
    if (vote === "down") voteIncrement = -1;
    comments.update({_id:id},{$inc:{votes: voteIncrement}}, function (err) {
        if (err) return next(err);

        res.status(201).send({votes: vote});
    });
}

module.exports = {
    getAllTopics:getAllTopics,
    getTopicArticles:getTopicArticles,
    getAllArticles:getAllArticles,
    getArticleComments:getArticleComments,
    addArticleComment:addArticleComment,
    articleVote:articleVote,
    removeComment:removeComment,
    commentVote: commentVote,
    getArticle:getArticle
};