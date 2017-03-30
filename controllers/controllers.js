const topics = require('../models/topics');

function getAllTopics (req, res) {
    topics.find({}, function (err, topics) {
        if (err) {
            return res.status(500).send({error:err});
        }
        res.status(200).send({topics:topics});
    });

}

module.exports = {
    getAllTopics:getAllTopics
}