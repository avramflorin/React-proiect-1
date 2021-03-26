import React from "react";
import {BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About"
import Page404 from "./pages/Page404"

import "./App.css";
/**
 * @author: Florin Avram
 */
class App extends React.Component {

  render() {
    /**
     * este de preferat 
     * <Route path="/about" component={About}></Route> 
     * in loc de 
     * <Route path="/about">
     *  <About />
     * </Route> 
     * deoarece astfel exista props.location in child
     */
    return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about/:who" component={About}></Route>
          <Route exact path="/about/" component={About}></Route>
          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    
    );
  }
}
export default App;
