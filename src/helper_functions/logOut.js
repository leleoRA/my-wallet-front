export default function logOut(setUser, history){
  setUser(null);
  localStorage.clear();
  history.push("/login");
}