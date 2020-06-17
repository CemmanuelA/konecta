import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import productList from './components/productList/productList';
import product from './components/product/product';

function App() {
  return (
   <Router>
     <Switch>
        <Route exact path="/">
          <Redirect to="/inventario" />
        </Route> 
        <Route path="/inventario" component={productList} />
        <Route path="/producto" component={product} />
     </Switch>
   </Router>
  );
}

export default App;
