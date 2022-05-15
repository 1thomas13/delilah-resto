const repositories = require("../repositories/productsRepositories");


exports.allProducts = async (req, res) => {

  const products = await repositories.getAll();
  console.log('no')
  return res.status(200).json({ products: products });
  
  

};

exports.getProduct = async (req, res) => {
  const productid = req.params.productid;

  const product = await repositories.getOne(productid);

  res.status(200).json({ product: product });
};

exports.createProduct = async (req, res) => {
  const { name, price, available } = req.body;

  if (!name || !price) {
    res
      .status(400)
      .json({ message: "Falta ingresar datos para crear un producto" });
  }

  const newProduct = {
    name: name,
    price: price,
    available: available,
  };

  await repositories.addProduct(newProduct);
 
  res.status(201).json({ message: "Producto agregado!" });
};

exports.modifyProduct = (req, res) => {
  const productid = req.params.productid;
  const { name, price, available } = req.body;

  if (name == undefined || price == undefined) {
    res
      .status(400)
      .json({ message: "Falta ingresar modificar un crear producto" });
  }

  const modifiedProduct = {
    name: name,
    price: price,
    available: available,
  };

  repositories.modifyProduct(productid, { modifiedProduct });
  
  res.status(200).json({ message: "Producto modificado!" });
};

exports.deleteProduct = async (req, res) => {
  const productid = req.params.productid;

  await repositories.deleteProduct(productid);
  
  res.status(200).json({ message: "Producto eliminado!" });
};
