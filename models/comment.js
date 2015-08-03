module.exports= function(sequelize, Datatypes){
  return sequelize.define('Comment',
      {texto:  {
        type: Datatypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta!"}}
      },
      publicado:  {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      }});
}
