import React, { Component } from "react";
import "./Item.css";
import instance from "../../axios";
import { connect } from "react-redux";

export class Item extends Component {
  state = {
    itemData: [],
    addToCartData: []
  };

  componentDidMount() {
    const clinicId = this.props.match.params.id;
    instance.get("/productList.json").then(value => {
      const itemsArr = value.data.data.filter(val => {
        return val.clinicId === clinicId;
      });
      this.setState({ itemData: itemsArr });
    });
  }

  handleAddToCart(item) {
    return item;
  }

  render() {
    return (
      <div className="Layout">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <h1 className="my-4">GA Shop</h1>
            </div>
            <div className="col-lg-9">
              <div
                id="carouselExampleIndicators"
                className="carousel slide my-4"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="0"
                    className="active"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="1"
                  />
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to="2"
                  />
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img
                      className="d-block img-fluid"
                      src="http://placehold.it/900x350"
                      alt="First slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="http://placehold.it/900x350"
                      alt="Second slide"
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      className="d-block img-fluid"
                      src="http://placehold.it/900x350"
                      alt="Third slide"
                    />
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>

              <div className="row">
                {this.state.itemData.length
                  ? this.state.itemData.map((item, index) => {
                      return (
                        <div
                          className="col-lg-4 col-md-6 mb-4"
                          key={item.productId}
                        >
                          <div className="card h-100">
                            <a href="#">
                              <img
                                className="card-img-top"
                                src="http://placehold.it/700x400"
                                alt=""
                              />
                            </a>
                            <div className="card-body">
                              <h4 className="card-title">
                                <a>{item.name}</a>
                              </h4>
                              <h5>$ {item.price}</h5>
                              <p className="card-text">{item.description}</p>
                            </div>
                            <div
                              className="card-footer"
                              onClick={() =>
                                this.props.onUpdateCart(
                                  this.handleAddToCart(item)
                                )
                              }
                            >
                              Add To Cart
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
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
    cart: state.addToCartData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onUpdateCart: item => dispatch({ type: "ADD_TO_CART", payload: item })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);
