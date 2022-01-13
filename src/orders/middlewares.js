const models = require("../models");
const jwt = require("jsonwebtoken");
const config = require("../config");

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.config.jwt.secret, (err, data) => {
      if (err) {
        return res.status(400).json(err);
      } else {
        req.data = data;
        next();
      }
    })
  } catch (error) {
    return res.status(400).json({ err: "Token invalido" });
  }
}

const isAdmin = async (req, res, next) => {
  const findUser = await models.User.findOne({
    where: {
      isAdmin: true,
      id: req.data.id,
    },
  })

  if (findUser == undefined) {
    res.status(403).json({ message: "Debes ser administrador para acceder" });
    return;
  }

  next();
}

const validateOrder = async (req, res, next) => {
  const order = await models.Order.findOne({
    where: {
      id: req.params.idOrder,
    },
  })

  if (order == undefined) {
    res.status(400).json({ message: "El id ingresado no pertenece a un pedido" });
    return;
  }
  next();
}

const validateOrderId = async (req,res,next) => {
  
  const orderId = req.params.idOrder

  const order = await models.Order.findOne({where:{id:orderId,userId:req.data.id}})

  if(!order){
    
    return res.status(400).json({error:"no puede modificar un pedido que no sea suyo"})

  }
  next()
}

const validateAddressStatus = async(req,res,next) => {

  const { order, paymentMethodId, addressId } = req.body

  const paymentMethod = await models.PaymentMethod.findOne({where:{id:paymentMethodId}})

  if(!paymentMethod){
    return res.status(400).json({ message: "El PaymentMethodId ingresado no pertenece a un metodo de pago" });
  }

  const address = await models.Address.findOne({where:{id:addressId,userId:req.data.id}})

  if(!address){
    return res.status(400).json({ message: "El AddressId ingresado no pertenece a tus direcciones" });
  }

 
  next()
}

const validateModify = (async(req,res,next) => {

  const orderId = req.params.idOrder

  const order = await models.Order.findOne({where:{id:orderId,userId:req.data.id}})
  
  if(!order){
    return res.status(400).json({error:"no puede modificar un pedido que no sea suyo"})
  }
  if(order.statusId !=1){
    return res.status(400).json({error:"No puede modificar el pedido por que ya lo confirmaste"})
  }

  next()

})


module.exports = { isAdmin, isAuthenticated,validateOrder,validateModify,validateAddressStatus,validateOrderId };
