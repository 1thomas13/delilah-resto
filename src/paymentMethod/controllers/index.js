const paymentMethod = require("../data")

exports.allPaymentsMethod = (req,res) => {
    res.status(200).json(paymentMethod)
}

let id=3

exports.createPaymentsMethod = (req,res) => {

    const {method} = req.body

    const payment = {
        id:id++,
        method:method
    }

    paymentMethod.push(payment)
    res.status(201).json({message:"Metodo de pago creado"})
}

exports.modifyPaymentsMethod = (req,res) => {

    const {id,method} = req.body

    const payment = {
        id:id,
        method:method
    }

    paymentMethod[index] = payment
    res.status(201).json({message:"Metodo de pago modificado"})
    
}

exports.deletePaymentMethod = (req,res) => {

    paymentMethod.splice(index, 1)
    res.status(200).json({ message: "Metodo de pago eliminado!" })
}