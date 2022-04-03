const { Router } = require('express');
const Transacoes = require('./controladores/transacoes');
const Usuarios = require('./controladores/usuarios');
const FiltrosUsuarios = require('./filtros/usuarios');

const rotas = Router();

rotas.post('/usuarios', Usuarios.cadastrarUsuario);

rotas.post('/login', Usuarios.login);

rotas.use(FiltrosUsuarios.verificaLogin);

rotas.get('/transacoes', Transacoes.listarTodas);

module.exports = rotas;
