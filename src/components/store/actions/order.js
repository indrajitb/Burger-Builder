import * as actionTypes from './actionTypes';
import AxiosInstance from '../../../axios-orders';

export const purchaseOrderSuccess = (id, orderData) => {
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        orderId : id
    }
}

export const purchaseOrderFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
        return dispatch => {
            dispatch( purchaseBurgerStart());
            AxiosInstance.post('/orders.json', orderData)
                .then(response => {
                    dispatch(purchaseOrderSuccess(response.data.name, orderData));
                })
                .catch(error => {
                    dispatch(purchaseOrderFailure(error));
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
     }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        AxiosInstance.get('/orders.json')
            .then(res => {
                const fetchedOrders =[];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key})
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            })
    }
}