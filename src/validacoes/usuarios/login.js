const yup = require('../configuracoes');

const schemaLogin = yup.object().shape({
  senha: yup.string().required(),
  email: yup.string().email().required(),
});

module.exports = schemaLogin;
