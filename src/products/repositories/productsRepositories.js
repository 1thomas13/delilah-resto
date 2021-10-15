const models = require("../../models")

exports.getAll = () => {
    return models.Products.findAll()
}

exports.addProduct = (product) => {
    return models.Products.create(product)
}

exports.deleteProduct = (productid) =>{
    return models.Products.destroy({
        where:{
            id:productid
        }
    })
}
 
exports.modifyProduct = (productid, {modifiedProduct}) =>{

    return models.Products.update({name:modifiedProduct.name,price:modifiedProduct.price,available:modifiedProduct.available},{
        where:{
            id:productid
        }
    })
}