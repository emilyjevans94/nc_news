const {
  selectArticle,
  increaseVotes,
  selectAllArticles,
  selectCommentsByArticle,
  insertComment,
  deleteComment,
  selectUsers
} = require("../models/articles.models.js");

exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectArticle(article_id)
    .then((data) => res.status(200).send({ article: data }))
    .catch(next);
};

exports.patchArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  increaseVotes(article_id, inc_votes)
    .then((data) => res.status(200).send({ article: data }))
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, topic, author } = req.query;
  selectAllArticles(sort_by, order, topic, author)
    .then((data) => {
      res.status(200).send({ articles: data });
    })
    .catch(next);
};

exports.getCommentsByArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticle(article_id)
    .then((data) => {
      res.status(200).send({ comments: data });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  insertComment(article_id, username, body)
    .then((data) => {
      res.status(201).send({ comment: data });
    })
    .catch(next);
};

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteComment(comment_id)
    .then((data) => {
      res.status(204).send();
    })
    .catch(next);
};

exports.getEndpoints = (req, res, next) => {
  const endpointsFile = require("../endpoints.json")
  res.status(200).send({endpoints: endpointsFile})
}

exports.getUsers = (req, res, next) => {
  selectUsers().then((data)=>{
    res.status(200).send({users: data})
  })
}