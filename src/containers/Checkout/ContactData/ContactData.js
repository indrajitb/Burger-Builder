import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import AxiosInstance from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: ' ',
        email: ' ',
        address: {
            street: ' ',
            postalCode: ' '
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Indrajit",
                address: {
                    street: "Test",
                    zipCode: '897656',
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deleveryMethod: 'fastest'
        }
        AxiosInstance.post('/orders.json', order)
        .then(response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false, error: true});
        })
    }

    render() {
        let form = <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
        <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
        <input className={classes.Input} type="text" name="street" placeholder="Your Street" />
        <input className={classes.Input} type="text" name="postalCode" placeholder="Your Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>;

        if(this.state.loading) {
            form = <Spinner></Spinner>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>
                    Enter Your Contact Details
                </h4>
                {form}
            </div>
        )
            

        
    }
}

export default ContactData;