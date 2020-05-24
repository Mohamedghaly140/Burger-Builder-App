import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import axios from '../../../AxiosOrders';
import withErrorHandler from '../../../hoc/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }

  componentDidMount() {
    axios.get('/order.json')
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key
          })
        }
        // console.log(fetchedOrders);
        this.setState({loading: false, orders: fetchedOrders});
      }).catch(error => {
        this.setState({loading: false});
      });
  }

  render () {
    const orders = this.state.orders;
    const outputOrder = orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.price} />;
    });

    return (
      <div>
        <h2 style={{textAlign: 'center'}}>Your Orders</h2>
        {outputOrder}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);