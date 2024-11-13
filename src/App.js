import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './components/login';
import Signup from './components/signup';
import Selector from './components/selector';
import Studentlogin from './components/studentlogin';
import Sidebar from './components/sidebar';
import Studentprofile from './components/studentprofile';
import Employeeprofile from './components/employeeprofile';
import UploadOpp from './components/uploadopp';
import Dashboard from './components/dashboard';
import OpportunityDetails from './components/opportunitydetails';
import Empdashboard from './components/empdashboard';
import AllOpportunities from './components/allopps';
import Forgotpwd from './components/forgotpwd';
import Rounddetails from './components/rounddetails';
import Profilepagestudent from './components/profilepagestudent';
import Resetpassword from './components/resetpassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/studentlogin" element={<Studentlogin />} />
          <Route exact path="/login" element={<Login />} />
          
          <Route exact path="/" element={<Signup />} />
          <Route exact path="/selection" element={<Selector/>} />
          <Route exact path="/studentprofile" element={<Studentprofile/>} />
          <Route exact path="/employeeprofile" element={<Employeeprofile/>} />
          <Route exact path="/empdashboard" element={<Empdashboard/>} />
          <Route exact path="/rounddetails" element={<Rounddetails/>} />
          <Route exact path="/uploadopp" element={<UploadOpp/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/opportunitydetails" element={<OpportunityDetails/>} />
          <Route exact path="/allopps" element={<AllOpportunities/>} />
          <Route exact path="/forgotpwd" element={<Forgotpwd/>} />
          <Route exact path="/profilepagestudent" element={<Profilepagestudent/>} />
          <Route exact path="/resetpassword" element={<Resetpassword/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
