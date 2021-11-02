const db = require("../db/connection");

//Need to add in template literal here //
exports.selectArticle = (article_id) => {
  console.log("in the model");

  return db
    .query(
      `SELECT articles.author, 
  articles.title,
  articles.article_id,
  articles.body,
  articles.topic,
  articles.created_at,
  articles.votes,
  COUNT(*) AS comment_count FROM articles
  LEFT JOIN comments on articles.article_id = comments.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.author, articles.title, articles.article_id, articles.body, articles.topic,
  articles.created_at, articles.votes;`,
      [ article_id ]
    )
    .then(({ rows }) => {
      return rows[0];
    });
};
