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
    res.render('quizes/index',{quizes: quizes, errors: []});
  }).catch(function(error){next(error);});
}

exports.show = function(req,res){
    res.render('quizes/show',{quiz: req.quiz, errors: []});
}

exports.answer = function(req,res){
    if(req.query.respuesta == req.quiz.respuesta){
      res.render('quizes/answer',{quiz: req.quiz, respuesta: 'Correcto', errors: []});
    } else {
      res.render('quizes/answer',{quiz: req.quiz, respuesta: 'Incorrecto', errors: []});
    }
}

exports.new = function(req,res){
    var quiz = models.Quiz.build({pregunta: 'pregunta', respuesta: 'respuesta', tema: 'otro'});
    res.render('quizes/new',{quiz: quiz, errors: []});
}

exports.create = function(req,res){
    var quiz = models.Quiz.build(req.body.quiz);
    quiz.validate().then(function(err){
      if(err){
        res.render('quizes/new',{quiz: quiz, errors: err.errors});
      }else {
        quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){
          res.redirect("/quizes");
        });
      }
    });
}

exports.edit = function(req,res){
    var quiz = req.quiz;
    res.render('quizes/edit',{quiz: quiz, errors: []});
}

exports.update = function(req,res){
    var quiz = req.quiz;
    quiz.pregunta = req.body.quiz.pregunta;
    quiz.respuesta = req.body.quiz.respuesta;
    quiz.tema = req.body.quiz.tema;
    quiz.validate().then(function(err){
      if(err){
        res.render('quizes/edit',{quiz: quiz, errors: err.errors});
      }else {
        quiz.save({fields: ["pregunta","respuesta","tema"]}).then(function(){
          res.redirect("/quizes");
        });
      }
    });
}

exports.destroy = function(req,res,next){
    var quiz = req.quiz;
    quiz.destroy().then(function(){
        res.redirect("/quizes");
    }).catch(function(error){next(error);});
}
