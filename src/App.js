import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, useLocation, useHistory } from "react-router-dom";
import { Switch, Route } from "react-router";
import UserContext from "./contexts/UserContext";
import GlobalStyles from "./components/GlobalStyles";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NewLog from "./components/NewLog";
import {PrivateRoute, PublicOnlyRoute} from "./components/PrivateRoute";

function App() {
  const [user, setUser] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
    const userStorage = localStorage.getItem("user");
    if (userStorage !== null) {
      setUser(JSON.parse(userStorage));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const authed = user === null ? false : true;
  
  return isFirstRender ? (
    <></>
  ) : (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <PublicOnlyRoute exact path="/login" component={Login} />
          <PublicOnlyRoute exact path="/signup" component={SignUp} />
          <PrivateRoute
            authed={authed}
            exact
            path="/new/:logType"
            component={NewLog}
          />
          <PrivateRoute authed={authed} exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
