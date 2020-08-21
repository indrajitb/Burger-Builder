import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state ={
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axiosInstance.interceptors.response.use(res => res, error => {
                this.setState({error: error});

            });
        }

        componentWillUnmount() {
            axiosInstance.interceptors.response.eject(this.resInterceptor);
            axiosInstance.interceptors.request.eject(this.reqInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }
        render() {
            return (
            <Aux>
                <Modal 
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props}/>
            </Aux>
            )
        }
    }
}

export default withErrorHandler;