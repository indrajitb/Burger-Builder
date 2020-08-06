import React, {Component} from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import BackDrop from '../Backdrop/Backdrop'

class Modal extends Component {
    componentWillMount() {
        console.log('[Modal] Will Mount');
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show; 
    }

    componentDidUpdate(){
        console.log('[Modal] Did Update')
    }
    render() {
        return(
            <Aux>
            <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div  className={classes.Modal} 
                style={{transform: this.props.show ? 'translateY(0)' : 'translateY()-100vh',
            opacity: this.props.show ? '1' : '0'}}>
                {this.props.children}
            </div>
            
        </Aux>
        )
    }
}

export default Modal;