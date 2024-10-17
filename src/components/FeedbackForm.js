import React, { useState } from 'react';

function FeedbackForm({ questions }) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isAnonymous, setIsAnonymous] = useState(false); // Track anonymous mode
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e, id) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id || name]: type === 'checkbox' ? checked : value
    });
  };

  const toggleAnonymousMode = () => {
    setIsAnonymous(!isAnonymous);
    // Clear name and email fields when switching to anonymous
    setFormData({ ...formData, name: '', email: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAnonymous && (!formData.name || !formData.email)) {
      setError("Please fill out your name and email or select anonymous mode.");
      return;
    }

    setError(null); // Clear any previous error
    console.log('Submitted Data:', formData);
    setMessage("Thank you for your feedback!");
  };

  return (
    <section className="p-3 border rounded bg-light">
      <header>
        <h2>Feedback Form</h2>
      </header>

      <form onSubmit={handleSubmit}>
        {error && <div role="alert" className="alert alert-danger">{error}</div>}
        {message && <div role="status" className="alert alert-success">{message}</div>}

        <fieldset>
          <legend>Your Feedback</legend>

          {/* Toggle Anonymous Mode */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={toggleAnonymousMode}
            >
              {isAnonymous ? "Provide Name and Email" : "Submit Anonymously"}
            </button>
          </div>

          {/* Name and Email Fields - Visible only when not anonymous */}
          {!isAnonymous && (
            <>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          {/* Dynamically Added Questions */}
          {questions.map((question) => (
            <div key={question.id} className="mb-3">
              <label className="form-label">{question.label}</label>
              {question.type === 'text' && (
                <input
                  type="text"
                  className="form-control"
                  value={formData[question.id] || ''}
                  onChange={(e) => handleChange(e, question.id)}
                  required={question.required}
                />
              )}
              {question.type === 'textarea' && (
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData[question.id] || ''}
                  onChange={(e) => handleChange(e, question.id)}
                  required={question.required}
                />
              )}
              {question.type === 'rating' && (
                <select
                  className="form-select"
                  value={formData[question.id] || ''}
                  onChange={(e) => handleChange(e, question.id)}
                  required={question.required}
                >
                  <option value="">Select a rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              )}
              {question.type === 'checkbox' && (
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={formData[question.id] || false}
                    onChange={(e) => handleChange(e, question.id)}
                  />
                  <label className="form-check-label">Check if applicable</label>
                </div>
              )}
            </div>
          ))}

          <button type="submit" className="btn btn-primary">Submit Feedback</button>
        </fieldset>
      </form>
    </section>
  );
}

export default FeedbackForm;
