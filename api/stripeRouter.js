const express = require("express");
const stripeRouter = express.Router();

stripeRouter.post("/pay", async (req, res) => {
    const { email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'eur',
        // Verify your integration in this guide by including this parameter
        metadata: { integration_check: 'accept_a_payment' },
        recipient_email: email
    });

    res.json({
        success: true,
        client_secret: paymentIntent['client_secret']
    });

});

module.exports = stripeRouter;