import './App.css';
import SignUp from './components/SignUp';
import {Container} from 'react-bootstrap'
import { AuthProvider, useAuth } from './contexts/AuthContext';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className="App">
      
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh"}}>
          <div className="w-100" style={{maxWidth:"400px"}}>
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </AuthProvider>
          </Router>
          </div>
        </Container>
      
    </div>
  );
}

export default App;
