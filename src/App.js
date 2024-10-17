import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import CustomizationPanel from './components/CustomizationPanel';

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center">Quick Feedback Collection Widget</h1>
      <div className="row">
        <div className="col-md-6">
          <h2>Feedback Form Preview</h2>
          <FeedbackForm />
        </div>
        <div className="col-md-6">
          <h2>Customization Panel</h2>
          <CustomizationPanel />
        </div>
      </div>
    </div>
  );
}

export default App;