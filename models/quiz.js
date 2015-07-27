// Definición del Modelo de Quiz con Validación:
module.exports = function(sequelize, Datatypes) {
  return sequelize.define(
    'Quiz',
    { pregunta: {
        type: Datatypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Pregunta"}}
      },
      respuesta: {
        type: Datatypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Respuesta"}}
      },
      tema: {
        type: Datatypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Tema"}}
      }
    }
  );
}
