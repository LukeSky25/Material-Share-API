import { Sequelize, Model, json, Error } from "sequelize";
import bcryptjs from "bcryptjs";
import validarCpf from "validar-cpf";
import axios from "axios";
// import cep from "cep-promise";

export default class Usuario extends Model {

  static init(sequelize) {

    const validaCep = async (cep) => {
      try {
        const response = await axios(`https://viacep.com.br/ws/${cep}/json/`);

        return response.data;
      } catch(e) {
        return false;
      }

    };

    super.init({
      nome: {
        type: Sequelize.STRING(100),
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'O nome deve ter entre 3 e 100 caracteres',
          }
        }
      },
      email: {
        type: Sequelize.STRING(100),
        defaultValue: '',
        unique: {
          msg: 'Esse email já esta em uso'
        },
        validate: {
          isEmail:{
            msg: 'Email inválido',
          }
        }
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 100],
            msg: 'A senha deve ter entre 6 e 100 caracteres'
          }
        }
      },
      nivel_acesso: {
        type: Sequelize.STRING(10),
        defaultValue: '',
        validate: {
          isIn: {
            args: [['ADMIN', 'DOADOR', 'BENEFICIADO']],
            msg: 'O nível de acesso deve ser ADMIN, DOADOR ou BENEFICIADO'
          }
        }
      },
      foto: {
        type: Sequelize.BLOB('long'),
      },
      cpf: {
        type: Sequelize.CHAR(11),
        defaultValue: '',
        validate: {
          len: {
            args: [11, 11],
            msg: 'CPF inválido'
          },
          isCpf(valor) {
            if (!validarCpf(valor)) {
              throw new Error("CPF inválido");
            }
          }
        }
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        defaultValue: '',
        validate: {
          isDate: {
            msg: 'Data de nascimento inválida'
          }
        }
      },
      telefone: {
        type: Sequelize.STRING(14),
        validate: {
          isValidPhone(valor) {
            // Expressão regular que não permite caracteres especiais e exige formato específico
            const phoneRegex = /^\+?\d{1,3}\d{10}$/;

            if (!phoneRegex.test(valor)) {
                throw new Error("O número de telefone fornecido é inválido. Deve ser no formato +CCXXXXXXXXXX, sem caracteres especiais.");
            }
        }
        }
      },
      cep: {
        type: Sequelize.CHAR(8),
        defaultValue: '',
        validate: {
          len: {
            args: [8, 8],
            msg: 'CEP deve ter 8 caracteres'
          },
          async isCep(valor) {
            const isValid = await validaCep(valor);

            if(!isValid) {
              throw new Error('CEP inválido');
            }
          }
        }
      },
      complemento: {
        type: Sequelize.STRING(100),
        defaultValue: '',
        validate: {
          max: {
            args: [100],
            msg: 'O complemento deve ter até 100 caracteres'
          }
        }
      },
      numero: {
        type: Sequelize.STRING(10),
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Número inválido'
          },
          len: {
            args: [0, 100],
            msg: 'O número deve estar entre 1 e na casa númerica de mil'
          }
        }
      },
      data_cadastro: {
        type: Sequelize.DATE,
        defaultValue: '',
        validate: {
          isDate: {
            msg: 'A data de cadastro é inválida'
          }
        }
      },
      status_cadastro: {
        type: Sequelize.STRING(20),
        defaultValue: '',
        validate: {
          isIn: {
            args: [['ATIVO', 'INATIVO', 'TROCAR_SENHA']],
            msg: 'O status do cadastro deve ser ATIVO, INATIVO ou TROCAR_SENHA'
          }
        }
      },
    }, {
      sequelize,
      tableName: 'usuario',
    });

    this.addHook('beforeSave', async user => {
      user.senha_hash = await bcryptjs.hash(user.senha_hash, 8);
    });

    return this;
  }
}
