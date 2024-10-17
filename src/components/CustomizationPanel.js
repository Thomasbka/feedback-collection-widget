import React, { useState } from 'react';

function CustomizationPanel({ questions, setQuestions }) {
  const [questionLabel, setQuestionLabel] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [required, setRequired] = useState(false);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { id: Date.now(), label: questionLabel, type: questionType, required }
    ]);
    setQuestionLabel('');
    setQuestionType('text');
    setRequired(false);
  };

  // Delete question function
  const deleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div className="p-3 border rounded bg-light">
      <h2>Customize Feedback Form</h2>
      <div className="form-element">
        <input
          type="text"
          value={questionLabel}
          onChange={(e) => setQuestionLabel(e.target.value)}
          placeholder="Question Label"
          className="form-control"
        />
      </div>
      <div className="form-element">
        <select
          value={questionType}
          onChange={(e) => setQuestionType(e.target.value)}
          className="form-control"
        >
          <option value="text">Text</option>
          <option value="textarea">Textarea</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="form-element">
        <label>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
          />
          Required
        </label>
      </div>
      <button onClick={addQuestion} className="btn btn-primary">Add Question</button>
      
      <h3>Questions</h3>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            {q.label} ({q.type}) {q.required && '(Required)'}
            <button
              className="btn btn-danger btn-sm ms-2"
              onClick={() => deleteQuestion(q.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomizationPanel;
