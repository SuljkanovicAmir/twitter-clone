import './assets/styles/Login.css'
import './assets/styles/App.css';
import LoginAndSignUp from './components/LoginAndSignUp/LoginAndSignUp';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom"
import PrivateRoute from './utilities/PrivateRoute';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import ProfileRoutes from './components/ProfileRoutes';
import ProfileFollows from './components/ProfileFollows';



function App() {


  return (
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
            <Route  path="/:urlAt" element={<ProfileRoutes />}>
                <Route path={`/:urlAt/following`} element={<ProfileFollows />} />
                <Route path={`/:urlAt/followers`} element={<ProfileFollows />} />
                <Route path={`/:urlAt`} element={<ProfilePage />} />
            </Route>
          
          </Route>
        </Routes>
      </Router>
  );
}

export default App;




