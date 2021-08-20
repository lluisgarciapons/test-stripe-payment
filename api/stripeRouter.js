const express = require("express");
const stripeRouter = express.Router();
const stripe = require('stripe')('sk_test_51JQfBlEhLp6Y8JSzReIaR848KYozBwyLEEGMgK7K2ot36FuaSCTKLTiw38G3wunM65DpEiVf8NSEg7ISfS6UaUS300JL9dZBkk');

stripeRouter.post("/pay", async (req, res) => {
    const { email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
        receipt_email: email
    });

    res.json({
        success: true,
        client_secret: paymentIntent['client_secret']
    });

});

module.exports = stripeRouter;