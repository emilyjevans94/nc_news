const apiRouter = require("express").Router();
const {
  getAllArticles,
  getArticle,
  patchArticle,
} = require("../controllers/articles.controller.js");
const { invalidMethod } = require("../controllers/errors.controller.js");
const { getTopics } = require("../controllers/topics.controller.js");

apiRouter.route("/topics").get(getTopics).all(invalidMethod);

apiRouter
  .get("/articles", getAllArticles)
  .get("/articles/:article_id", getArticle)
  .patch("/articles/:article_id", patchArticle);

module.exports = { apiRouter };
