import './assets/styles/App.css';
import './assets/styles/Login.css'
import LoginAndSignUp from './components/LoginAndSignUp/LoginAndSignUp';
import Main from './components/Main';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import PrivateRoute from './utilities/PrivateRoute';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
        < Route path='/LoginOrSignUp' element={<LoginAndSignUp />} />
        <Route
            path='/'
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }>
            <Route  path="/" element={<HomePage />} />
            <Route  path="/home" element={<HomePage />} />
            <Route  path="/profile" element={<ProfilePage />} />
          
          </Route>
        </Routes>
      </Router>
          
    </AuthProvider>
  );
}

export default App;




