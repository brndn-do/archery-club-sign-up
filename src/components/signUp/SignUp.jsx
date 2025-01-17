// src/SignUp.jsx
import { useState, useEffect } from 'react';
import { auth } from '../../firebase';  // Import your Firebase auth configuration
import { onAuthStateChanged } from 'firebase/auth';
import './signUp.css';

const SignUp = () => {
  const [signUps, setSignUps] = useState([]);
  const [coachAttendance, setCoachAttendance] = useState(false);
  const [execMembers, setExecMembers] = useState([]);
  const [userName, setUserName] = useState('');
  const [practiceDate, setPracticeDate] = useState('');
  const [user, setUser] = useState(null);

  const maxCapacity = 25;
  const practiceTimes = {
    friday: 'Friday 8:15-9:45pm',
    saturday: 'Saturday 7:15-8:45pm'
  };

  useEffect(() => {
    // Check if a user is signed in
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setUserName(currentUser.displayName); // Set name from Google account
      } else {
        setUser(null);
      }
    });

    // Clean up the listener
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch the list of signed up users, coach attendance, and exec members from backend or Firebase
    setSignUps(['John Doe', 'Jane Smith']); // Example data
    setCoachAttendance(true); // Example data
    setExecMembers(['Alex Johnson', 'Taylor Lee']); // Example data
  }, []);

  const handleSignUp = () => {
    if (!user) {
      alert('Please sign in first.');
      return;
    }

    if (signUps.length >= maxCapacity) {
      alert('Sorry, the session is full.');
      return;
    }
    if (userName && practiceDate) {
      setSignUps([...signUps, userName]);
      alert('Successfully signed up!');
      setUserName('');
      setPracticeDate('');
    } else {
      alert('Please select a practice date.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for Northwestern Archery Practice</h2>
      <h3>Signed in as: {user ? user.displayName : 'Not signed in'}</h3>
      <div className="form-group">
        <select
          value={practiceDate}
          onChange={(e) => setPracticeDate(e.target.value)}
        >
          <option value="">Select practice date</option>
          <option value="friday">Friday 8:15-9:45pm</option>
          <option value="saturday">Saturday 7:15-8:45pm</option>
        </select>
      </div>
      <button onClick={handleSignUp} className="signup-button">
        Sign Up
      </button>

      <div className="signup-status">
        <h3>Signed Up Members ({signUps.length}/{maxCapacity})</h3>
        <ul>
          {signUps.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="attendance-info">
        <h3>Coach Attendance</h3>
        <p>{coachAttendance ? 'Coach will be present!' : 'Coach will not be present.'}</p>
        <h3>Exec Members Attending</h3>
        <ul>
          {execMembers.length > 0 ? (
            execMembers.map((member, index) => <li key={index}>{member}</li>)
          ) : (
            <p>No exec members will be attending.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SignUp;
