import bcryptjs from "bcryptjs";

import Usuario from '../models/Usuario';

class User {


  // index

  async index(req, res) {

    try{

      const usuarios = await Usuario.findAll();

      res.json(usuarios);

    } catch(e) {
      return res.json(null);
    }

  }

  // show

  async show(req, res) {

    try{

      const usuario = await Usuario.findByPk(req.params.id);

      const {
        id,
        nome,
        email,
        nivel_acesso,
        cpf,
        data_nascimento,
        telefone,
        cep,
        complemento,
        numero,
        status_cadastro
      } = usuario;
      res.json({
        id,
        nome,
        email,
        nivel_acesso,
        cpf,
        data_nascimento,
        telefone,
        cep,
        complemento,
        numero,
        status_cadastro
      });
      res.json(usuario);

    } catch(e) {
      return res.json(null);
    }

  }

  // store

  async store(req, res) {

    try {

      const novoUsuario = await Usuario.create(req.body);
      const {
        id,
        nome,
        email,
        nivel_acesso,
        cpf,
        data_nascimento,
        telefone,
        cep,
        status_cadastro
      } = novoUsuario;
      res.json({
        id,
        nome,
        email,
        nivel_acesso,
        cpf,
        data_nascimento,
        telefone,
        cep,
        status_cadastro
      });

    } catch(e) {
      const errorMessages = Array.isArray(e.errors) ? e.errors.map(err => err.message) : [e.message || 'Erro desconhecido'];

        return res.status(400).json({ errors: errorMessages });
    }

  }


  // patch

  async patch(req, res) {

    try {

      const { email = '', senha = '', status_cadastro = 'TROCAR_SENHA' } = req.body;

      if(!email) {
        res.status(400).json({
          errors: ['Email não recebido'],
        });
      }

      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.status(401).json({
          errors: ['Usuário não existe ou email inválido']
        });
      }
      if (!senha) {
        res.status(400).json({
          errors: ['Senha não recebida'],
        });
      }

      // const { senha_hash } = await bcryptjs.hash(senha, 8);
      // const novosDados = await Usuario.update({ senha_hash, status_cadastro});

      usuario.status_cadastro = 'TROCAR_SENHA';
      usuario.senha = senha;

      await usuario.save({ fields: ['senha_hash', 'status_cadastro'] });

      res.json(usuario);

    } catch(e) {
      console.log(e);

      res.status(400).json({
        errors: e.errors.map((err) => err.message)
      });
    }

  }

  // update

  async update(req, res) {

    try{

      const usuario = await Usuario.findByPk(req.userId);

      if(!usuario) {
        res.status(400).json({
          errors: ['Usuário não existe']
        });
      }

      const novosDados = await usuario.update(req.body);

      res.json(novosDados);

    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }

  }

  // delete

  async delete(req, res) {

    try{

      const usuario = await Usuario.findByPk(req.userId);

      if(!usuario) {
        res.status(400).json({
          errors: ['Id não recebido'],
        });
      }

      await usuario.destroy(req.body);
      res.json(`${usuario.nome} deletado com sucesso!`);

    } catch(e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }

  }


}

export default new User();
