import React, { useState } from 'react';
import axios from "axios";
// MUI Components
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
// Util imports
import { makeStyles } from '@material-ui/core/styles';
// Stripe
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardInput from './CardInput/CardInput.js';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        margin: '35vh auto',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'flex-start',
    },
    div: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        justifyContent: 'space-between',
    },
    button: {
        margin: '2em auto 1em',
    },
});

function HomePage() {
    const classes = useStyles();
    // State
    const [email, setEmail] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmitPay = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const response = await axios.post('http://localhost:5000/stripe/pay', { email });
        const { client_secret } = response.data;
        const result = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email,
                },
            }
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                console.log("Tot ha anat correctament");
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <TextField
                    label='Email'
                    id='outlined-email-input'
                    helperText={`Email you'll recive updates and receipts on`}
                    margin='normal'
                    variant='outlined'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                />
                <CardInput />
                <div className={classes.div}>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleSubmitPay}>
                        Pay
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Subscription
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default HomePage;