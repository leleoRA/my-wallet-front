import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import UserContext from './contexts/UserContext';
import GlobalStyles from './components/GlobalStyles';
import Login from './components/Login';
function App() {
  return (
    <UserContext.Provider value={{ banana:"1" }}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route path="/login" component={Login}/> 
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
