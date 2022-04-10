const yup = require('../configuracoes');

const schemaCadastrarTransacao = yup.object().shape({
  tipo: yup.boolean().required(),
  valor: yup.number().required(),
  categoria: yup.string().required(),
  dia_semana: yup.string().required(),
  data: yup.date().required(),
  descricao: yup.string().required(),
});

module.exports = schemaCadastrarTransacao;
