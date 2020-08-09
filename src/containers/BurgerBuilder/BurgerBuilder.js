import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import AxiosInstance from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients: null,
        totalPrice: 0,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    
    componentDidMount() {
        console.log(this.props);
        this._isMounted = true;
        AxiosInstance.get('https://burger-builder-90db6.firebaseio.com/ingredients.json')
        .then(response => {
            if(this._isMounted)
             this.setState({ingredients: response.data})
        })
        .catch(error => {});
    }

    componentWillUnmount() {
        console.log('BurgerBuilder will unmount');
        if(this._isMounted)
         this.setState({_isMounted: false})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount +1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        //const oldPrice = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        //const newTotalPrice = this.state.totalPrice + newPrice;
        if(this._isMounted)
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        //console.log('[BurgerBuilder.js]  addIngredientHandler')
        this.updatePurchaseState(updatedIngredients);
        
    };

    deleteIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0)
            return;
        const updatedCount = oldCount -1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        //const oldPrice = this.state.ingredients[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeletion;
        //const newTotalPrice = this.state.totalPrice - newPrice;
        if(this._isMounted)
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        //console.log('[BurgerBuilder.js]  deleteIngredientHandler')
        this.updatePurchaseState(updatedIngredients);
        
    };

    updatePurchaseState (ingredients) {
        //const ingredients = {...this.state.ingredients};
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

        if(this._isMounted)
            this.setState({purchaseable: sum > 0});
        //console.log('[BurgerBuilder.js]  updatePurchaseState')
    }

    orderPurchaseHandler = () => {
        if(this._isMounted)
            this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinuedHandler = () => {
        if(this._isMounted)
         this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: "Indrajit",
        //         address: {
        //             street: "Test",
        //             zipCode: '897656',
        //             country: 'India'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deleveryMethod: 'fastest'
        // }
        // AxiosInstance.post('/orders.json', order)
        // .then(response => {
        //     if(this._isMounted)
        //         this.setState({loading: false, purchasing: false});
        // })
        // .catch(error => {
        //     if(this._isMounted)
        //         this.setState({loading: false, purchasing: false, error: true});
        // })

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + 
            encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.children.history.push({
            pathname: "/checkout",
            search: '?' + queryString
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <=0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> 
            : <Spinner></Spinner>;
        if(this.state.ingredients) {
            burger = <Aux>
                        <Burger ingredients={this.state.ingredients}></Burger>
                        <BuildControls 
                            ingredientAdded={this.addIngredientHandler}
                            ingredientDeleted={this.deleteIngredientHandler}
                            disabled={disabledInfo} 
                            price={this.state.totalPrice}
                            purchaseable={this.state.purchaseable}
                            purchasing={this.orderPurchaseHandler}/>
                    </Aux>;

            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                            purchaseCancelled={this.purchaseCancelHandler}
                            puchaseContinued={this.purchaseContinuedHandler} 
                            price={this.state.totalPrice}>;
                        </OrderSummary>
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


export default withErrorHandler(BurgerBuider, AxiosInstance) ;