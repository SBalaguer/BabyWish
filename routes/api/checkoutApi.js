const { Router } = require("express");
//const routeGuard = require("./../../middleware/route-guard");
const checkoutRouter = new Router();

const StripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(StripeSecretKey);

checkoutRouter.post("/",async (req,res,next)=>{
  //console.log('Request', req.body);
  let status = '';
  try {
    const token = req.body.token;
    const product = req.body.product;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    const charge = await stripe.charges.create({
      amount: product.productPrice * 100, //ATTENTION: Product Price must be sent in cents.
      currency: "usd", //ATTENTION: We will need to check this out later to figure out a currency in our products.
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`
      }
    );
    if (charge) {
      status='success';
    }
  } catch (error) {
    status = 'fail';
    console.log(error);
    next(error);
  }
  res.json({status});
});

module.exports = checkoutRouter;