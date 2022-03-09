const mercadopago = require("mercadopago");
const models = require("../../models")


mercadopago.configure({
  access_token:
    "TEST-5904774239142166-030417-faa39afacc84314243386e3834d2798a-1079047997",
});

exports.addPayment = async (req, res) => {

  const {quantity,productId} = req.body

  const product = await models.Product.findOne({where:{id:productId}})

  if(product.available === false){
    res.status(400).json({message:"El producto seleccionado no esta disponible"})
  }

  let preference = {
    items: [
      {
        title: product.name,
        unit_price: product.price,
        quantity
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

exports.get = async (req, res) => {
  let params = req.query;
  res.status(200).json(params);
};
