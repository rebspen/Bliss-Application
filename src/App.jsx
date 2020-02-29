import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import List from "./Views/List";
import Detail from "./Views/Detail";

function App() {
  return (
    
    <div className="App">
    Bliss Application
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={List} />
      <Route path="/detail" component={Detail} />
    </Switch>
    </BrowserRouter>
    </div>
 
  );
}

export default App;
