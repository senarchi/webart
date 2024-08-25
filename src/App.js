import logo from './logo.svg';
import './App.css';
import SignupForm from './components/SignupForm';
import EmailVerifyForm from './components/EmailVerifyForm';
import LoginForm from './components/Login';
import UpdateProfileForm from './components/UpdateProfileForm';
import LogoutButton from './components/Logout';

function App() {
  return (
    <div className="App">
      <h1>SignUp</h1>
      <SignupForm/>
      <h1>Email Verification</h1>
      <EmailVerifyForm/>
      <h1>Login</h1>
      <LoginForm/>
      <h1>Update Profile</h1>
      <UpdateProfileForm/>
      <h1>Logout</h1>
      <LogoutButton/>
    </div>
  );
}

export default App;
