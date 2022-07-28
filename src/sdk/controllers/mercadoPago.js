const mercadopago = require("mercadopago");
const models = require("../../models")
const config = require("../../config")

mercadopago.configure({
  access_token: config.config.mercadoPago.token,
});

exports.addPaymentMercadoPago = async (req, res) => {

  const {price} = req.body
  if(!price) return res.status(400).json({error: 'Price is required'})
  let preference = {
    items: [
      {
        title: "Order",
        unit_price: parseInt(price),
        quantity:1
      },
    ],
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.status(200).json(response);
      console.log(response);
      // En esta instancia deberás asignar el valor dentro de response.body.id por el ID de preferencia solicitado en el siguiente paso
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.getMercadoPago = async (req, res) => {
  let params = req.query;
  res.status(200).json(params);
};
