const { Router } = require('express');
const Transacoes = require('./controladores/transacoes');
const Usuarios = require('./controladores/usuarios');
const FiltrosUsuarios = require('./filtros/usuarios');

const rotas = Router();

rotas.post('/usuarios', Usuarios.cadastrarUsuario);
rotas.get('/teste', (req, res) => res.send('teste'));

rotas.post('/login', Usuarios.login);

rotas.use(FiltrosUsuarios.verificaLogin);

rotas.get('/usuarios', Usuarios.obterUsuario);
rotas.put('/usuarios', Usuarios.editarUsuario);

rotas.get('/transacoes', Transacoes.listarTodas);
rotas.get('/transacoes/:id', Transacoes.obterTransacao);
rotas.post('/transacoes', Transacoes.cadastrarTransacao);
rotas.put('/transacoes/:id', Transacoes.editarTransacao);
rotas.delete('/transacoes/:id', Transacoes.excluirTransacao);

module.exports = rotas;
