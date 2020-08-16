import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        console.log('checkoutCancelledHandler');
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log('checkoutContinuedHandler');
        console.log(this.props.history);
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}>
                </CheckoutSummary>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} >
                </Route>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
}

export default connect(mapStateToProps)(Checkout);