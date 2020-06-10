import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../../components/Order/Order';
import axios from '../../../AxiosOrders';
import withErrorHandler from '../../../hoc/withErrorHandler';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as actions from '../../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
    console.log(this.props.loading);
  }

  render() {
    const fetchOrder = this.props.orders;
    let orders = <Spinner />;
    if (this.props.loading) {
      orders = fetchOrder.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Your Orders</h2>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
