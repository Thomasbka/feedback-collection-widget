import React from 'react';
import '../styles/customStyles.css';

function SubmissionHistory({ history }) {
  return (
    <div className="card p-4">
      <h2>Submission History</h2>
      {history.length ? (
        history.map((submission, index) => (
          <div key={index} className="mb-3">
            <h5>Submission {index + 1}</h5>
            <p><strong>Name:</strong> {submission.name || 'Anonymous'}</p>
            <p><strong>Email:</strong> {submission.email || 'Anonymous'}</p>
            <p><strong>Feedback:</strong></p>
            <ul>
              {Object.entries(submission)
                .filter(([key]) => key !== 'name' && key !== 'email' && key !== 'id')
                .map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No submissions found.</p>
      )}
    </div>
  );
}

export default SubmissionHistory;
