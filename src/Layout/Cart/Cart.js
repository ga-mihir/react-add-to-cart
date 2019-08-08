import React, { Component } from "react";
import "./Cart.css";
import { connect } from "react-redux";

export class Cart extends Component {
  state = {
    cartItem: [],
    discount: 60,
    shippingCharges: 20
  };

  componentDidMount() {
    this.props.addToCartData.map(val => {
      val.qty = 1;
      val.originalPrice = val.price;
    });
    this.setState({
      cartItem: this.props.addToCartData
    });
  }

  getCartMRP() {
    if (this.state.cartItem.length) {
      let total = this.state.cartItem.reduce((sum, item) => {
        return parseFloat(item.price) + parseFloat(sum);
      }, 0);
      return total;
    }
    return 0;
  }

  getTotalAmount() {
    return this.getCartMRP() + this.state.shippingCharges;
  }

  deleteItem(index) {
    let tmpArray = [...this.state.cartItem];
    tmpArray.splice(index, 1);
    this.setState({
      cartItem: [...tmpArray]
    });
  }

  handleValueChange = (event, index) => {
    const obj = {
      qty: event.target.value,
      index
    };
    return obj;
  };

  render() {
    return (
      <div className="container Cart mb-4">
        <div className="row">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col"> </th>
                    <th scope="col">Product</th>
                    <th scope="col">Available</th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-right">
                      Price
                    </th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.cartItem.length
                    ? this.state.cartItem.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <img src="https://dummyimage.com/50x50/55595c/fff" />{" "}
                            </td>
                            <td>{item.name}</td>
                            <td>In stock</td>
                            <td>
                              <input
                                className="form-control"
                                type="text"
                                name="name"
                                value={item.qty}
                                onChange={event => {
                                  this.props.updateItemFromReducer(
                                    this.handleValueChange(event, index)
                                  );
                                }}
                              />
                            </td>
                            <td className="text-right">Rs. {item.price}</td>
                            <td className="text-right">
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => {
                                  this.props.deleteItemFromReducer(index);
                                  this.deleteItem(index);
                                }}
                              >
                                DELETE
                              </button>{" "}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>Sub-Total</td>
                    <td className="text-right">Rs. {this.getCartMRP()}</td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>Shipping</td>
                    <td className="text-right">
                      Rs. {this.state.shippingCharges}
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <strong>Total</strong>
                    </td>
                    <td className="text-right">
                      <strong>Rs. {this.getTotalAmount()}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col mb-2">
            <div className="row">
              <div className="col-sm-12  col-md-6">
                <button className="btn btn-block btn-light">
                  Continue Shopping
                </button>
              </div>
              <div className="col-sm-12 col-md-6 text-right">
                <button className="btn btn-lg btn-block btn-success text-uppercase">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addToCartData: state.addToCartData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deleteItemFromReducer: index =>
      dispatch({ type: "REMOVE_TO_CART", payload: index }),
    updateItemFromReducer: item =>
      dispatch({ type: "UPDATE_QTY", payload: item })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
