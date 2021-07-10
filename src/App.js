import './App.css';
import SignUp from './components/SignUp';
import {Container} from '@material-ui/core'
import { AuthProvider } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home';
import Navbar from './components/Navbar';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
    },
    width: {
      width: '100%',
      maxWidth: '400px'
    }
  });

function App() {

  const classes = useStyles();

  return (
    <div className="App">
          <Router>
            <AuthProvider>
              <Navbar />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Container className={classes.root}>
                   <div className={classes.width}>
                    <Route exact path="/signup" component={SignUp} />
                    
                    <Route exact path="/login" component={Login} />
                  </div>
               </Container>
              </Switch>
            </AuthProvider>
          </Router>
          
      
    </div>
  );
}

export default App;
