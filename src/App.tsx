import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BottomNav from "./components/BottomNav";
import routes from "./routes";

import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          {routes.map(({ exact = false, path, components }, index) => {
            return (
              <Route
                key={index}
                exact={exact}
                path={path}
                children={components}
              />
            );
          })}
        </Switch>
        <BottomNav />
      </div>
    </Router>
  );
};

export default App;
