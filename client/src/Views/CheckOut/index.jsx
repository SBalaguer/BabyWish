import React, { Component } from 'react'
import StripeCheckout from "react-stripe-checkout";
import {processPayment} from "./../../services/checkout"


export class CheckOut extends Component {
  constructor(props){
    super (props)
    this.state={
      product: {
        productPrice: 4,
        //IMPORTANT: We need to send product price in CENTS to Stripe
        name: 'Test'
      }
    }
    this.handleToken = this.handleToken.bind(this)
  }

  async handleToken(token){
    console.log(token)
    const product = this.state.product
    try{
      const status = await processPayment(token, product)
      console.log(status)
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const stripePublicApiKey = "pk_test_N34sYUhOJr9zcvpRmE5vzuLz00dOyAjLMP"
    return (
      <div>
        <h1>Checkout Page</h1>
        <StripeCheckout 
          stripeKey = {stripePublicApiKey}
          token = {this.handleToken}
          billingAddress
          amount = {this.state.product.productPrice * 100}
          name = {this.state.product.name}
        />
      </div>
    )
  }
}

export default CheckOut
