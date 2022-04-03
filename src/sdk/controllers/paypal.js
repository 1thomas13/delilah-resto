const express = require('express');
const paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AY1IKc30ZPmuDpQRjvg9Ya9gh14kmZHWC3nYt2LSJPXGpAg86DcERqXj5AH9gkCKypGAQKQn9WVb37Ee',
    'client_secret': 'EBV11MtpFJeMfCaE22pWjwxEWUsds7dmya4ZsyhggKHXh_ru8bjlBspOq3j7ZvZxGhqj49iHbEmBb1GG'
  });
  
 
  
  
  const addPaymentPaypal = (req, res) => {

    const {price} = req.body

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
                    "name": "Red Sox Hat",
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
            "description": "Hat for the best team ever"
        }]
    };
  
    
  
      paypal.payment.create(create_payment_json, function (error, payment) {
          if (error) {
              throw error;
          } else {
              for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                    console.log(payment.links[i])
                  res.redirect(payment.links[i].href);
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