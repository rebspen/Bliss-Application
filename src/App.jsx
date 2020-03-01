import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import List from "./Views/List";

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

export default App;
