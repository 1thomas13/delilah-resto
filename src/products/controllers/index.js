const repositories = require("../repositories/productsRepositories");
const config = require("../../config");

const redis = require("redis");

const bluebird = require("bluebird");

bluebird.promisifyAll(redis);

const client = redis.createClient({
	host:"delilah-redis.amtsns.ng.0001.use2.cache.amazonaws.com",
	port:6379
});

exports.allProducts = async (req, res) => {
  const cache = req.cache;
  console.log(cache);
  if (cache == null) {
    const products = await repositories.getAll();

    client.set("products", JSON.stringify(products), "EX", 60);

    return res.status(200).json({ products: products });
  }

  res.status(200).json({ products: JSON.parse(cache) });
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
  client.del("products");
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
  client.del("products");
  res.status(200).json({ message: "Producto modificado!" });
};

exports.deleteProduct = async (req, res) => {
  const productid = req.params.productid;

  await repositories.deleteProduct(productid);
  client.del("products");
  res.status(200).json({ message: "Producto eliminado!" });
};
