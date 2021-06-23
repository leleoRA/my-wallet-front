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
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [user, setUser] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const location = useLocation();
  const history = useHistory();
  
  useEffect(() => {
    setIsFirstRender(false);
    const userStorage = localStorage.getItem("user");
    if (userStorage !== null) setUser(JSON.parse(userStorage));
    if (userStorage !== null && location.pathname === "/signup") {
      history.push("/");
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute
            authed={authed}
            exact
            path="/new/earning"
            component={() => NewLog("earning")}
          />
          <PrivateRoute
            authed={authed}
            exact
            path="/new/expenditure"
            component={() => NewLog("expenditure")}
          />
          <PrivateRoute authed={authed} exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
