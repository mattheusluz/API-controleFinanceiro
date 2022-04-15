const yup = require('../configuracoes');

const schemaCadastrarTransacao = yup.object().shape({
  tipo: yup.boolean().required(),
  dia_semana: yup.string().required(),
  descricao: yup.string().required(),
  data: yup.date().required(),
  categoria: yup.string().required(),
  valor: yup.number().required(),
});

module.exports = schemaCadastrarTransacao;
