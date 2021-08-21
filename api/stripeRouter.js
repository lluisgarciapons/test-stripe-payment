const express = require("express");
const { asyncMiddleware } = require("../middleware");
const stripeRouter = express.Router();
const stripe = require('stripe')('sk_test_51JQfBlEhLp6Y8JSzReIaR848KYozBwyLEEGMgK7K2ot36FuaSCTKLTiw38G3wunM65DpEiVf8NSEg7ISfS6UaUS300JL9dZBkk');

stripeRouter.post("/pay", asyncMiddleware(async (req, res) => {
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
}));


// Fer-la servir junt amb REGISTER
stripeRouter.post('/create-customer', asyncMiddleware(async (req, res) => {
    const { email } = req.body;

    const customer = await stripe.customers.create({
        email
    });

    // save the customer.id as stripeCustomerId
    // in your database.

    res.send({
        success: true,
        customer
    });
}));


stripeRouter.post('/create-sub', asyncMiddleware(async (req, res) => {
    const { priceId, customerId } = req.body;
    //customerId = req.cookies[customerId]

    // Create the subscription. Note we're expanding the Subscription's
    // latest invoice and that invoice's payment_intent
    // so we can pass it to the front end to confirm the payment
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
            price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
    });

    res.send({
        success: true,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
    });


}));

module.exports = stripeRouter;