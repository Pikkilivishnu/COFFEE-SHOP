const express = require("express");
const Stripe = require("stripe");
require("dotenv").config();
const cors = require("cors");

const app = express();
const stripe = Stripe("sk_test_51R6kQvRU58jS3SvoefSqbKxAOJyQzrTSp6OmaCC7twAYTuUdcBbTmB8RQ7mqC7SiKzpi51srtrioMzRTa6uqYaRn00xp57jcE2"); // Replace with your actual secret key

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");  // Allow all origins
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(200); // Handle preflight requests
    }
    
    next();
});
``
//app.post("/create-payment-intent", async (req, res) => {

   // console.log(req.body);
    
   // try { 
     //   const { amount, currency } = req.body;
      //  const paymentIntent = await stripe.paymentIntents.create({
      //      amount: amount,
       //     currency: currency,
      //  });
        res.json({ clientSecret: paymentIntent.client_secret });
   // } catch (error) {
    //    res.status(500).json({ error: error.message });
   // }
//});

//app.listen(3001, () => console.log("Server running on port 3001"))
app.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Coffee Order",
                        },
                        unit_amount: 500, // $5.00
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:5500/success.html",
            cancel_url: "http://localhost:5500/cancel.html",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));