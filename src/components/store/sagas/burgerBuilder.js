import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import axiosInstance from '../../../axios-orders';

export function* initIngredientsSaga(action) {
    try {
        const response = yield axiosInstance.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
        
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
    
}