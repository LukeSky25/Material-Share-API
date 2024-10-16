import Usuario from "../models/Usuario";
import jsonwebtoken from 'jsonwebtoken';

class Token {

  async store(req, res) {

    const { email = '', senha = '' } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        errors: ['Credenciais inválidas']
      });
    }

    const user = await Usuario.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe']
      });
    }

    if(!(await user.senhaValida(senha))) {
      return res.status(401).json({
        errors: ['Senha inválida']
      });
    }

    const { id } = user;
    const token = jsonwebtoken.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      token,
      data: {
        id,
        nome: user.nome,
        email,
        cpf: user.cpf,
        dataNascimento: user.data_nascimento,
        telefone: user.telefone,
        cep: user.cep,
        complemento: user.complemento,
        numero: user.numero,
       }
      });
  }

}

export default new Token();
