// Definición del Modelo de Comment con Validación:
module.exports = function(sequelize, Datatypes) {
  return sequelize.define(
    'Comment',
    { texto: {
        type: Datatypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      }
    }
  );
}
