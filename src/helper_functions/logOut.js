import axios from "axios";
import Config from "./Config";

export default function logOut(user, setUser, history) {
  setUser(null);
  localStorage.clear();
  const config = new Config(user.token);
  axios
    .post("http://localhost:4000/logout", {}, config)
    .catch((e) => alert(e))
    .finally(() => history.push("/login"));
}
