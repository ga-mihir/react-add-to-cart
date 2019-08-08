import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "../Layout/Layout";
import Item from "../Layout/Item/Item";
import Cart from "../Layout/Cart/Cart";

export class RouterComponent extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Layout} />
        <Route path="/item/:id" component={Item} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    );
  }
}

export default RouterComponent;
