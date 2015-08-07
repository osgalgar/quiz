var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

router.get('/author', function(req, res) {
  res.render('author', { title: 'Créditos', errors: [] });
});

// AutoLoad de comandos con :quizId
router.param('quizId',    quizController.load);     // autoload :quizId
router.param('commentId', commentController.load);  // autoload :commentId

// Definición de rutas de sesión
router.get('/login',               sessionController.new);      // formulario login
router.post('/login',              sessionController.create);   // crear sesión
// Debería ser un delete como el de los /quizes
router.get('/logout',              sessionController.destroy);  // destruir sesión

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

// Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new',  commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',     commentController.create);
// Debería ser un put como el de los /quizes ya que estamos haciendo un update
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
                          sessionController.loginRequired, commentController.publish);

// Definición de rutas para Estadísticas
router.get('/statistics', statisticsController.calculate, statisticsController.show);

module.exports = router;
