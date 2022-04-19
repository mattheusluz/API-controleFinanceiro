const yup = require('../configuracoes');

const schemaEditarUsuario = yup.object().shape({
  email: yup.string().email().required(),
  nome: yup.string().strict().required(),
});

module.exports = schemaEditarUsuario;
