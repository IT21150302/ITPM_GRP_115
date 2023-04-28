
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import {Route,Switch} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Forecast from './components/Forecast';
import Main from './components/Main';
import Maindash from './components/Maindash';
import Profile from './components/Profile';




function App() {
  return (
    <>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/contact" component={Contact}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/register" component={Register}/>
      
      <Route exact path="/forecast" component={Forecast}/>
      <Route exact path="/main" component={Main}/>
      <Route exact path="/maindash" component={Maindash}/>
      <Route exact path="/profile" component={Profile}/>

  
    </Switch>

    </>
  );
}

export default App;
