import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import userslist from "./pages/userslist";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={userslist} />
      </Switch>
    </Router>
  );
}

export default App;
