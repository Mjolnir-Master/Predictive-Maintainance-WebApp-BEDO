// src/Predictor.js
import React, { useState } from 'react';
import axios from 'axios';

const Predictor = () => {
  const [features, setFeatures] = useState([0, 0, 0, 0]);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e, index) => {
    const newFeatures = [...features];
    newFeatures[index] = e.target.value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: features.map(Number), // Convert input to numbers
      });
      setPrediction(response.data.prediction);
    } catch (err) {
      setError('Error while making prediction: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Machine Learning Prediction</h2>
      <div>
        {features.map((feature, index) => (
          <input
            key={index}
            type="number"
            value={feature}
            onChange={(e) => handleChange(e, index)}
            placeholder={`Feature ${index + 1}`}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Get Prediction</button>

      {prediction !== null && (
        <div>
          <h3>Prediction: {prediction}</h3>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Predictor;
