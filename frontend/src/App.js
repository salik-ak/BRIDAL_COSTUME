
import './App.css';
import { BrowserRouter as Router,Routes,Route ,Navigate } from 'react-router-dom'
import Home from "./pages/Home"
import LoginPage from "./pages/loginpage"
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import SignupForm from './pages/signup';


function Logout(){
  localStorage.clear()
  return <Navigate to ="/login" />
}
 function RegisterAndLogout(){
  localStorage.clear()
  return <SignupForm />
 }
function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        {/* Provide an element or component for the root URL */}
        <Route element={<Home />} path="/" exact />
        {/* Provide an element or component for the login page URL */}
        <Route element={<LoginPage />} path="/loginpage" />
        <Route element={<SignupForm />} path="/signup" />
        <Route element ={<Header />} path="/Header" />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
