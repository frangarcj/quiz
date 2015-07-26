var express = require('express');
var router = express.Router();
var quiz_controller = require('../controllers/quiz_controller');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes',quiz_controller.index);
router.get('/quizes/:quizId(\\d+)', quiz_controller.show);
router.get('/quizes/:quizId(\\d+)/answer', quiz_controller.answer);

router.get('/author', function(req, res) {
  res.render('author', { title: 'Autor' });
});

module.exports = router;
