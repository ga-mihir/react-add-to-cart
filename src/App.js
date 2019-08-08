import React, { Component } from "react";
import "./App.css";
import Headers from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RouterComponent from "./routers/router";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducer";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: []
    };

    store.subscribe(() => {
      this.setState({
        item: store.getState()
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Headers cartData={this.state.item} />
            <RouterComponent />
            <Footer />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default App;
