import React, { useState } from 'react';

function CustomizationPanel({ questions, setQuestions }) {
  const [newQuestion, setNewQuestion] = useState({
    label: '',
    type: 'text',
    required: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addQuestion = () => {
    setQuestions([...questions, { ...newQuestion, id: Date.now() }]);
    setNewQuestion({ label: '', type: 'text', required: false });
  };

  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <section className="p-3 border rounded bg-light">
      <h2>Customize Feedback Form</h2>
      <div className="mb-3">
        <label className="form-label">Question Label</label>
        <input
          type="text"
          className="form-control"
          name="label"
          value={newQuestion.label}
          onChange={handleInputChange}
        />

        <label className="form-label mt-2">Question Type</label>
        <select
          className="form-select"
          name="type"
          value={newQuestion.type}
          onChange={handleInputChange}
        >
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="rating">Rating</option>
          <option value="checkbox">Checkbox</option>
        </select>

        <div className="form-check mt-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="required"
            checked={newQuestion.required}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Required</label>
        </div>

        <button className="btn btn-primary mt-3" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <h3>Questions</h3>
      <ul className="list-group mt-2">
        {questions.map((question) => (
          <li key={question.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{question.label} ({question.type})</span>
            <button className="btn btn-danger btn-sm" onClick={() => deleteQuestion(question.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CustomizationPanel;
