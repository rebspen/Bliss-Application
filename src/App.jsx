import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Views/Home";
import Detail from "./Views/Detail";
import List from "./Views/List";

function App() {
  return (
    
    <div className="App">
    Bliss Application
    <BrowserRouter>
    <Switch>
      <Route path="/questions" render={(props) => <Home {...props} />}/>
      <Route path="/detail" component={Detail} />
      <Route path="/" component={List} />
    </Switch>
    </BrowserRouter>
    </div>
 
  );
}

export default App;
