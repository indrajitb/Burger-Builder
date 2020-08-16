import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import AxiosInstance from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../components/store/actions'

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
}
class BurgerBuider extends Component {

    _isMounted = false;

    setMounted = () => {
        this._isMounted = !this._isMounted;
    }
    state = {
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount() {
        console.log('Component did mount');
        this._isMounted = true;
        AxiosInstance.get('https://burger-builder-90db6.firebaseio.com/ingredients.json')
        .then(response => {
            if(this._isMounted)
             this.setState({ingredients: response.data, loading: false})
        })
        .catch(error => {this.setState({loading: false, error: true})});
    }

    componentWillUnmount() {
        console.log('BurgerBuilder will unmount');
        if(this._isMounted)
         this.setState({_isMounted: false})
    }

    updatePurchaseState (ingredients) {
        //const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

       return sum > 0;
        
    }

    orderPurchaseHandler = () => {
        if(this._isMounted)
            this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + 
        //     encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.children.history.push({
        //     pathname: "/checkout",
        //     search: '?' + queryString
        // });
        this.props.children.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.children.ing
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> 
            : null // : <Spinner></Spinner>;
        if(this.props.children.ing) {
            burger = <Aux>
                        <Burger ingredients={this.props.children.ing} />
                        <BuildControls 
                            ingredientAdded={this.props.children.onIngredientAdded}
                            ingredientDeleted={this.props.children.onIngredientRemoved}
                            disabled={disabledInfo} 
                            price={this.props.children.price}
                            purchaseable={this.updatePurchaseState(this.props.children.ing)}
                            purchasing={this.orderPurchaseHandler}/>
                    </Aux>;

            orderSummary = <OrderSummary ingredients={this.props.children.ing}
                            purchaseCancelled={this.purchaseCancelHandler}
                            puchaseContinued={this.purchaseContinuedHandler} 
                            price={this.props.children.price} />;
                        
           }

           if(this.state.loading) {
                orderSummary = <Spinner></Spinner>
           }   
           return (
                <Aux>
                    <Modal show={this.state.purchasing} 
                        modalClosed={this.purchaseCancelHandler}>
                        {orderSummary}
                    </Modal>
                    {burger}
                </Aux>
           )
    }
}

const mapStateToProps = state => {
    return {
        ing: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuider, AxiosInstance)) ;