import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import * as actions from '../actions'
import {connect} from 'react-redux'

class Payments extends React.Component {
    render(){
        return (
            <StripeCheckout name="Survey" description="$5 for 5 credits"amount={500} token={(token)=>{
                this.props.handleToken(token)
            }} stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                <button className="btn deep-purple accent-1" >
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null,actions)(Payments)