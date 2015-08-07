var models = require('../models/models.js');

var statistics = {
      quizes: 0,
      comments: 0,
      commentsUnpublished: 0,
      commentedQuizes: 0
};

var errors = [];

exports.calculate = function (req, res, next) {
  // Usando promesas (Promise.all) se podrían lanzar todas las consultas simultáneamente
  models.Quiz.count()
  .then(function (numQuizes) {                  // Núm de Preguntas
    statistics.quizes = numQuizes;
    return models.Comment.count();
  })
  .then(function (numComments) {                // Núm de Comentarios
    statistics.comments = numComments;
    return models.Comment.countUnpublished();
  })
  .then(function (numUnpublished) {             // Núm de Comentarios sin Publicar
    statistics.commentsUnpublished = numUnpublished;
    return models.Comment.countCommentedQuizes();
  })
  .then(function (numCommented) {               // Núm de Preguntas con Commentario
    statistics.commentedQuizes = numCommented;
  })
  .catch(function (err) { errors.push(err); })
  .finally(function () {
    next();
  });
};

// GET /statistics
exports.show = function (req, res) {
  res.render('statistics/show', { statistics: statistics, errors: errors });
}
