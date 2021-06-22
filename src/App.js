import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Switch, Route } from 'react-router';
import UserContext from './contexts/UserContext';
import GlobalStyles from './components/GlobalStyles';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NewEarning from './components/NewEarning';
import NewExpenditure from './components/NewExpenditure';

function App() {
  return (
    <UserContext.Provider value={{ userFirstName:"Banana" }}>
      <BrowserRouter>
        <GlobalStyles />
        <Switch>
          <Route exact path="/newexpenditure" component={NewExpenditure}/> 
          <Route exact path="/newearning" component={NewEarning}/> 
          <Route exact path="/login" component={Login}/> 
          <Route exact path="/signup" component={SignUp}/> 
          <Route exact path="/" component={Home}/> 
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
