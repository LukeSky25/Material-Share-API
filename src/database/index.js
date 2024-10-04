import { Sequelize } from "sequelize";
import database from "../config/database";

import Categoria from "../models/Categoria";
import Usuario from "../models/Usuario";

const models = [ Categoria, Usuario ];

const connection = new Sequelize(database);

models.forEach(model => model.init(connection));
