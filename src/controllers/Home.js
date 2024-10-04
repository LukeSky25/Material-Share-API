import Categoria from '../models/Categoria';

class Home {

  async index(req, res) {

    const novaCategoria = await Categoria.create({
      categoria: "Tigrinho",
      tipo: "Aposta ganhadora",
      descricao: "Aposte todo seu dinheiro aqui e receba em pix o dobro ;-;"
    });

    res.json(novaCategoria);
  }
}

export default new Home();
