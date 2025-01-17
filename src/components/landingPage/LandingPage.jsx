import './landingPage.css';

const LandingPage = () => {
  const handleLogin = () => {
    // Placeholder for Northwestern NetID SSO authentication
    alert('Redirecting to Northwestern SSO login...');
  };

  return (
    <div className="landing-container">
      <h1>Northwestern University Archery Club</h1>
      <p>Welcome! Sign up for our practices and stay updated.</p>
      <button onClick={handleLogin} className="login-button">
        Log in with Northwestern Email
      </button>
    </div>
  );
};

export default LandingPage;
