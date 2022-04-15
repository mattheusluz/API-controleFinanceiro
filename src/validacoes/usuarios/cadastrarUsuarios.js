const yup = require('../configuracoes');

const schemaCadastrarUsuario = yup.object().shape({
  senha: yup.string().required().min(8).max(25),
  email: yup.string().email().required(),
  nome: yup.string().strict().required(),
});

module.exports = schemaCadastrarUsuario;
