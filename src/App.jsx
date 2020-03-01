import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import List from "./Views/List";
// iteration 5 shows an error if internet is lost and remains untill reconnected
import NetworkDetector from './Components/internetConnect'

function App() {

  return (
    
    <div className="App">
    <BrowserRouter>
    <Switch>
      <Route path="/questions" render={(props) => <List {...props} />}/>
      <Route path="/" component={Home} />
    </Switch>
    </BrowserRouter>
    </div>
 
  );
}

export default NetworkDetector(App);
