import React, {Component} from 'react'
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Order from '../../components/Order/Order';
import * as actions from '../../components/store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    
    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders =[];
        //         for(let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key})
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     })
        //this.props.children.onFetchOrders();
    }

    render() {
        let orders = <Spinner />
        if(!this.props.children.loading) {
            if(this.props.children.orders) {
                orders = this.props.children.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}/>))
            }
            
            // const objects = this.props.children.orders;
            // console.log(objects.length);
            // for (let key in objects){
            //     console.log( key, objects[key] );
            // }  
        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));