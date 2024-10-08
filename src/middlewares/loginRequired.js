import jsonwebtoken from "jsonwebtoken";

export default (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) {
    return res.status(401).json({
      errors: ['Precisa fazer login']
    });
  }

  const [ ,token] = authorization.split(' ');

  try {
    const dados = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = dados;
    req.userId = id;
    req.userEmail = email;

    return next();

  } catch(e) {

    console.log(e);
    console.log(authorization);


    return res.status(401).json({
      errors: ['Token expírado ou inválido']
    });
  }

};

