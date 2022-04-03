const yup = require('../configuracoes');

const schemaCadastroUsuario = yup.object().shape({
  nome: yup.string().strict().required(),
  email: yup.string().email().required(),
  senha: yup.string().required().min(8).max(25),
});

module.exports = schemaCadastroUsuario;
