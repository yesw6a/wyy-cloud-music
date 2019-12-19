import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "mobx-react";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";

import BottomNav from "./components/BottomNav";
import routes from "./routes";

import "./App.scss";

const App: React.FC = () => {
  // const browserHistory = createBrowserHistory();
  const routerStore = new RouterStore();
  // 同步路由与mobx的数据状态
  // const history = syncHistoryWithStore(browserHistory, routerStore);
  const rootStore = {
    router: routerStore
  };

  return (
    <Provider {...rootStore}>
      <Router>
        <div className="app">
          <Switch>
            {routes.map((item, index) => {
              return (
                <Route key={index} {...item}>
                  <item.component />
                </Route>
              );
            })}
          </Switch>
          <BottomNav />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
