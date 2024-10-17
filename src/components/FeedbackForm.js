import React, { useState, useEffect } from 'react';

function FeedbackForm({ questions, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    const hasInput = formData.name || formData.email || questions.some(q => formData[q.id]);
    setIsSubmitEnabled(hasInput);
  }, [formData, questions]);

  const handleChange = (e, id) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id || name]: type === 'checkbox' ? checked : value
    });
  };

  const toggleAnonymousMode = () => {
    setIsAnonymous(!isAnonymous);
    if (!isAnonymous) {
      setFormData({ ...formData, name: '', email: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '' });
  };

  return (
    <section className="p-3 border rounded bg-light">
      <h2>Feedback Form</h2>

      <button type="button" className="btn btn-secondary mb-3" onClick={toggleAnonymousMode}>
        {isAnonymous ? "Provide Name and Email" : "Submit Anonymously"}
      </button>

      <form onSubmit={handleSubmit}>
        {!isAnonymous && (
          <>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
            </div>
          </>
        )}

        {questions.map((question) => (
          <div key={question.id} className="mb-3">
            <label className="form-label">{question.label}</label>
            <input type="text" className="form-control" value={formData[question.id] || ''} onChange={(e) => handleChange(e, question.id)} required={question.required} />
          </div>
        ))}

        <button type="submit" className="btn btn-primary" disabled={!isSubmitEnabled}>Submit Feedback</button>
      </form>
    </section>
  );
}

export default FeedbackForm;
