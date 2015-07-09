//Definición del Modelo de Quiz:
module.exports = function(sequelize, Datatypes) {
  return sequelize.define('Quiz',
            { pregunta:  Datatypes.STRING,
              respuesta: Datatypes.STRING
            });
}
