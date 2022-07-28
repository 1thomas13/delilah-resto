const models = require('../../models')

exports.getAll = () => {
  return models.Product.findAll()
}

exports.getOne = (productid) => {
  return models.Product.findOne({
    where: {
      id:productid
    }
  })
}

exports.addProduct = (product) => {
  return models.Product.create(product)
}

exports.deleteProduct = (productid) => {
  return models.Product.destroy({
    where: {
      id: productid
    }
  })
}

exports.modifyProduct = (productid, { modifiedProduct }) => {
  return models.Product.update({
    name: modifiedProduct.name, price: modifiedProduct.price, available: modifiedProduct.available, image:modifiedProduct.image
  },
  {
    where: {
      id: productid
    }
  })
}
