const models = require('../../models')

exports.getAllPaymentsMethod = () => {
  return models.PaymentMethod.findAll()
}

exports.addPaymentMethod = (method) => {
  return models.PaymentMethod.create({ method: method })
}

exports.updatePaymentMethod = (methodId, method) => {
  return models.PaymentMethod.update({ method: method }, {
    where: {
      id: methodId
    }
  })
}

exports.deletePaymentMethod = (methodId) => {
  return models.PaymentMethod.destroy({
    where: {
      id: methodId
    }
  })
}
