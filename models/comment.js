// Definición del Modelo de Comment con Validación:
module.exports = function(sequelize, Datatypes) {
  return sequelize.define(
    'Comment',
    { texto: {
        type: Datatypes.STRING,
        validate: { notEmpty: {msg: "-> Falta Comentario"}}
      },
      publicado: {
        type: Datatypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      classMethods: {
        countUnpublished: function () {
          return this.aggregate('QuizId','count', {'where': {'publicado': false}})
          .then('success', function(count) { return count; });
        },
        countCommentedQuizes: function () {
          return this.aggregate('QuizId','count', {distinct: true})
          .then('success', function(count) { return count; });
        }
      }
    });
};
