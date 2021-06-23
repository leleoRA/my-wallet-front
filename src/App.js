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
import axios from 'axios';
import Config from "./helper_functions/Config";

function App() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage !== null) {
      const localUser = JSON.parse(userStorage);
      setUser(localUser);
      console.log(localUser);
      const config = new Config(localUser.token);
      axios
        .get("http://localhost:4000/logs", config)
        .then(({data})=>setLogs(data))
        .catch(e=>alert(e))
        .finally(()=>setIsFirstRender(false))
    } else setIsFirstRender(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const authed = user === null ? false : true;
  
  return isFirstRender ? (
    <></>
  ) : (
    <UserContext.Provider value={{ user, setUser, logs, setLogs }}>
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
