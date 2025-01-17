// src/Login.jsx
import { auth, googleProvider } from '../../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import './login.css';

const Login = () => {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("user email " + user.email);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Sign In</h2>
      <button onClick={handleGoogleSignIn} className="login-button">
        Sign in with Google
      </button>
    </div>
  );
};

export default Login; 