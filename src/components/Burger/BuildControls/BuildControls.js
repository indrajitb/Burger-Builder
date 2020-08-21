import React from 'react';
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl';

let controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}  
];

const buildControls = ( props ) => {
    return(
        // <div className={classes.BuildControls}>
        //     <strong><p>Current Price: {props.price.toFixed(2)}</p></strong>
        //     {controls.map(control => {
        //         return (
        //         <BuildControl 
        //             key={control.label} label={control.label} 
        //             added={() => {props.ingredientAdded(control.type)}}
        //             deleted={() => {props.ingredientDeleted(control.type)}}
        //             disabled={props.disabled[control.type]}
        //             />
        //         )
        //     })}
        //     <button className={classes.OrderButton} disabled={!props.purchaseable}
        //     onClick={props.purchasing}>
        //         ORDER NOW!</button>
        // </div>
        <div className={classes.BuildControls}>
            <strong><p>Current Price: {props.price.toFixed(2)}</p></strong>
            {controls.map(control => {
                return (
                <BuildControl 
                    key={control.label} label={control.label} 
                    added={() => {props.ingredientAdded(control.type)}}
                    deleted={() => {props.ingredientRemoved(control.type)}}
                    disabled={props.disabled[control.type]}
                    />
                )
            })}
            <button 
                className={classes.OrderButton} disabled={!props.purchaseable}
                onClick={props.purchasing}>
                {props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
            </button>
        </div>
    )
}

export default buildControls;
 