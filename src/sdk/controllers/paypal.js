const express = require('express');
const paypal = require('paypal-rest-sdk');
const { rawListeners } = require('../..');
const config = require("../../config")

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': config.config.paypal.clientID,
    'client_secret': config.config.paypal.secret
  });
  
  
  const addPaymentPaypal = (req, res) => {

    const {price} = req.body

    if(!price) return res.status(400).json({error: 'Price is required'})

      const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Order",
                    "sku": "001",
                    "price": price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total":  price
            },
            "description": "Pedido"
        }]
    };
  
    
  
      paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
              throw error;
          } else {
              for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    console.log(payment.links[i])
                    res.json(payment.links[i].href)
                     
                }
              }
          }
        });
        
        }
  

    const cancel = (req, res) => res.send('Cancelled')

    const sucess = (req, res) => {
        console.log("sucess")
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
      
        const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
              "amount": {
                  "currency": "USD",
                  "total": "25.00"
              }
          }]
        };
      
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
              console.log(error.response);
              throw error;
          } else {
              console.log(JSON.stringify(payment));
              res.send('Success');
          }
      });
      }

    module.exports = {addPaymentPaypal,sucess,cancel}