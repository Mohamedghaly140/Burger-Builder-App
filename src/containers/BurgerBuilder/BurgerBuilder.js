import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

import Aux from '../../hoc/Auxiliray';
import axios from '../../AxiosOrders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
    // axios.get('https://react-burger-cbb4d.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     const fetchedIngredients = {
    //       salad: response.data.salad,
    //       bacon: response.data.bacon,
    //       cheese: response.data.chesse,
    //       meat: response.data.meat
    //     };
    //     this.setState({ingredients: fetchedIngredients});
    //   });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients).map(igkey => {
      return ingredients[igkey];
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  }

  render() {
    const disabledInfo = {...this.props.ings};
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be Loaded</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price}
      />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));