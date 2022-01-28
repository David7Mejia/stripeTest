const express = require('express');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;
const Stripe = require("stripe");

const SECRET_KEY = process.env.SECRET_KEY;
const stripe = Stripe(
  SECRET_KEY,
);

let prices;

async function getProduct(stripe) {
  const product = await stripe.products.list();
  prices = await stripe.prices.list()
  console.log(prices);
}

app.get("/", (req, res) => {
  getProduct(stripe);
  res.send(prices);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
