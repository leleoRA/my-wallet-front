import axios from "axios";
import Config from "./Config";

export default function logOut(user, setUser, setLogs, history) {
  function clearAndPush() {
    localStorage.clear();
    setUser(null);
    setLogs([]);
    history.push("/login");
  }
  
  if (!user || !typeof user === "object" || !user.token) {
    clearAndPush();
  } else {
    const config = new Config(user.token);
    axios
      .post("http://localhost:4000/logout", {}, config)
      .catch((err) => alert(err))
      .finally(() => clearAndPush());
  }
}
