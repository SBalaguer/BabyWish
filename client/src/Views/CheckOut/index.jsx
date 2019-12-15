import React, { Component } from 'react'
import StripeCheckout from "react-stripe-checkout";
import {processPayment} from "./../../services/checkout"


export class CheckOut extends Component {
  constructor(props){
    super (props)
    this.state={
      product: {
        productPrice: 0,
        //IMPORTANT: We need to send product price in CENTS to Stripe
        name: 'Test'
      },
      status: false
    }
    this.handleToken = this.handleToken.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event){
    const value = event.target.value
    console.log(value)
    this.setState({
      product:{
        name: 'Test',
        productPrice: value
      }
    })
  }

  async handleToken(token){
    console.log(token)
    const product = this.state.product
    try{
      const status = await processPayment(token, product)
      console.log(status)
      this.setState({status:true})
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    const stripePublicApiKey = "pk_test_N34sYUhOJr9zcvpRmE5vzuLz00dOyAjLMP"
    return (
      <div>
        <h1>Checkout Page</h1>
        <h5>Select amout to Pay</h5>
        <input type="number" name="productPrice" value={this.state.product.productPrice} onChange={this.handleInputChange}/>
        
        <StripeCheckout 
          stripeKey = {stripePublicApiKey}
          token = {this.handleToken}
          billingAddress
          amount = {this.state.product.productPrice * 100}
          name = {this.state.product.name}
        >
          <button className='btn btn-start btn-block'>Pay Baby Wish!</button>
        </StripeCheckout>

      </div>
    )
  }
}

export default CheckOut
