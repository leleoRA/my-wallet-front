import axios from "axios";
import Config from "./Config";

export default function logOut(user, setUser, history) {
  if (user === null || !typeof user === "object" || !user.token) {
    localStorage.clear();
    setUser(null);
    history.push("/login");
    return;
  }
  const config = new Config(user.token);
  axios
    .post("http://localhost:4000/logout", {}, config)
    .catch((err) => alert(err))
    .finally(() => {
      localStorage.clear();
      setUser(null);
      history.push("/login")
    });
}
