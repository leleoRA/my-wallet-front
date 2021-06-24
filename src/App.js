import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { Switch } from "react-router";
import UserContext from "./contexts/UserContext";
import GlobalStyles from "./components/GlobalStyles";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NewLog from "./pages/NewLog";
import { PrivateRoute, PublicOnlyRoute } from "./components/PrivateRoute";
import axios from "axios";
import Config from "./helper_functions/Config";
import logOut from "./helper_functions/logOut";

function App() {
  const [user, setUser] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isReadyToRender, setIsReadyToRender] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    if (userStorage !== null) {
      const localUser = JSON.parse(userStorage);
      setUser(localUser);
      const config = new Config(localUser.token);
      axios
        .get("http://localhost:4000/sessions/withtoken", config)
        .then(()=> {return axios.get("http://localhost:4000/logs", config)})
        .then(({ data: logs }) => setLogs(logs))
        .catch((err) => {
          alert(err);
          logOut(localUser, setUser, setLogs, history);
        })
        .finally(() => setIsReadyToRender(true));
    } else setIsReadyToRender(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const authed = user === null ? false : true;

  return !isReadyToRender ? (
    <></>
  ) : (
    <UserContext.Provider value={{ user, setUser, logs, setLogs }}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <PublicOnlyRoute
            exact
            authed={authed}
            path="/login"
            component={Login}
          />
          <PublicOnlyRoute
            exact
            authed={authed}
            path="/signup"
            component={SignUp}
          />
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
