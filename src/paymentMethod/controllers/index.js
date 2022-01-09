const repositories = require('../repositories/methodRepositories')

exports.allPaymentsMethod = async (req, res) => {
  paymentMethods = await repositories.getAllPaymentsMethod()

  res.status(200).json(paymentMethods)
}

exports.createPaymentsMethod = async (req, res) => {
  const { method } = req.body

  if (!method) { res.status(400).json({ message: 'Debe ingresar el nuevo metodo de pago' }) }

  await repositories.addPaymentMethod(method)
  res.status(201).json({ message: 'Metodo de pago creado!' })
}

exports.modifyPaymentsMethod = async (req, res) => {
  const methodId = req.params.paymentMethodid
  const { method } = req.body

  await repositories.updatePaymentMethod(methodId, method)
  res.status(201).json({ message: 'Metodo de pago modificado' })
}

exports.deletePaymentMethod = async (req, res) => {
  const methodId = req.params.paymentMethodid

  await repositories.deletePaymentMethod(methodId)

  res.status(200).json({ message: 'Metodo de pago eliminado!' })
}
