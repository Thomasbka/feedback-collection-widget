import React, { useState } from 'react';
import FeedbackForm from './components/FeedbackForm';
import CustomizationPanel from './components/CustomizationPanel';
import SubmissionHistory from './components/SubmissionHistory';
import Modal from './components/Modal';
import './styles/customStyles.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [isBossLoggedIn, setIsBossLoggedIn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [showUserHistory, setShowUserHistory] = useState(false);
  const [showLatestSubmission, setShowLatestSubmission] = useState(false);

  const handleBossLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === 'boss' && password === 'password123') {
      setIsBossLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleUserLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === 'user' && password === 'userpassword') {
      setIsUserLoggedIn(true);
    } else {
      alert('Invalid user credentials');
    }
  };

  const handleBossLogout = () => {
    setIsBossLoggedIn(false);
    setShowUserHistory(false);
  };

  const handleUserLogout = () => {
    setIsUserLoggedIn(false);
    setIsSubmitted(false);
    setShowLatestSubmission(false);
    setShowUserHistory(false);
  };

  const handleSubmission = (submission) => {
    const newSubmission = { ...submission, id: Date.now() };
    setSubmissionHistory((prevHistory) => [...prevHistory, newSubmission]);
    setIsSubmitted(true);
    setShowLatestSubmission(true);
  };

  const toggleUserHistory = () => setShowUserHistory(!showUserHistory);
  const handleBackToForm = () => {
    setShowLatestSubmission(false);
    setShowUserHistory(false);
    setIsSubmitted(false);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Feedback Collection</h1>

      <div className="row justify-content-center">
        {isUserLoggedIn ? (
          <div className="col-md-8">
            {showLatestSubmission ? (
              <>
                <button className="btn btn-primary back-button" onClick={handleBackToForm}>Back</button>
                <div className="card p-4 mb-3 mt-3">
                  <h2 className="card-title">Latest Submission</h2>
                  <p><strong>Name:</strong> {submissionHistory[submissionHistory.length - 1].name || 'Anonymous'}</p>
                  <p><strong>Email:</strong> {submissionHistory[submissionHistory.length - 1].email || 'Anonymous'}</p>
                  <p><strong>Feedback:</strong></p>
                  <ul>
                    {Object.entries(submissionHistory[submissionHistory.length - 1])
                      .filter(([key]) => key !== 'name' && key !== 'email' && key !== 'id')
                      .map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                      ))}
                  </ul>
                </div>
                <button className="btn btn-secondary mb-3" onClick={toggleUserHistory}>
                  View Full Submission History
                </button>
              </>
            ) : (
              <>
                <FeedbackForm questions={questions} onSubmit={handleSubmission} />
                <button className="btn btn-secondary mt-3" onClick={toggleUserHistory}>
                  View Submission History
                </button>
                <button onClick={handleUserLogout} className="btn btn-warning mt-3">Logout</button>
              </>
            )}
          </div>
        ) : isBossLoggedIn ? (
          <div className="col-md-8">
            <CustomizationPanel questions={questions} setQuestions={setQuestions} />
            <button className="btn btn-secondary mt-3" onClick={toggleUserHistory}>
              View All Submission History
            </button>
            <button onClick={handleBossLogout} className="btn btn-warning mt-3">Logout</button>
          </div>
        ) : (
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card p-4">
                  <h2 className="text-center">User Login</h2>
                  <form onSubmit={handleUserLogin}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input type="text" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" name="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login to Submit Feedback</button>
                  </form>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card p-4">
                  <h2 className="text-center">Admin Login</h2>
                  <form onSubmit={handleBossLogin}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input type="text" name="username" className="form-control" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input type="password" name="password" className="form-control" required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showUserHistory && (
        <Modal onClose={toggleUserHistory}>
          <SubmissionHistory history={submissionHistory} filterByUser={true} />
        </Modal>
      )}

    </div>
  );
}

export default App;
