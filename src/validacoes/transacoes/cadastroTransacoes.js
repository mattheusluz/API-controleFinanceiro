const yup = require('../configuracoes');

const schemaCadastroTransacao = yup.object().shape({
  tipo: yup.boolean().required(),
  valor: yup.number().required(),
  categoria: yup.string().required(),
  data: yup.date().required(),
  descricao: yup.string().required(),
});

module.exports = schemaCadastroTransacao;
