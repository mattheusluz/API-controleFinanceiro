const yup = require('../configuracoes');

const schemaEditarUsuario = yup.object().shape({
  senha: yup.string().required(),
  email: yup.string().email().required(),
  nome: yup.string().strict().required(),
});

module.exports = schemaEditarUsuario;
