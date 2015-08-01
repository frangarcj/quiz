var models = require('../models/models.js');

exports.load = function(req,res,next,quizId){
  models.Quiz.findById(quizId).then(function(quiz){
    if(quiz){
      req.quiz=quiz;
      next();
    }else{next(new Error('No existe el quizId='+quizId));}
  }).catch(function(error){next(error);});
}

exports.index = function(req,res){
  var search = req.query.search?'%'+req.query.search+'%':'%';
  search = search.replace(' ','%');
  console.log("bu"+search);

  models.Quiz.findAll({where: ["pregunta like ?", search]}).then(function(quizes){
    res.render('quizes/index',{quizes: quizes});
  }).catch(function(error){next(error);});
}

exports.show = function(req,res){
    res.render('quizes/show',{quiz: req.quiz});
}

exports.answer = function(req,res){
    if(req.query.respuesta == req.quiz.respuesta){
      res.render('quizes/answer',{quiz: req.quiz, respuesta: 'Correcto'});
    } else {
      res.render('quizes/answer',{quiz: req.quiz, respuesta: 'Incorrecto'});
    }
}

exports.new = function(req,res){
    var quiz = models.Quiz.build({pregunta: 'pregunta', respuesta: 'respuesta'});
    res.render('quizes/new',{quiz: quiz});
}

exports.create = function(req,res){
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.save({fields: ["pregunta","respuesta"]}).then(function(){
      res.redirect("/quizes");
    });
}
