import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Home() {
  const [type, setType] = useState('');
  const [airTemp, setAirTemp] = useState('');
  const [procTemp, setProcTemp] = useState('');
  const [rotSpeed, setRotSpeed] = useState('');
  const [torque, setTorque] = useState('');
  const [toolWear, setToolWear] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', {
        Type: type.toUpperCase(),
        'Air temperature [°C]': parseFloat(airTemp),
        'Process temperature [°C]': parseFloat(procTemp),
        'Rotational speed [rpm]': parseFloat(rotSpeed),
        'Torque [Nm]': parseFloat(torque),
        'Tool wear [min]': parseFloat(toolWear),
      });
      setPrediction(response.data.prediction);
      setError(null);
    } catch (err) {
      setError('Error fetching prediction: ' + err.message);
      setPrediction(null);
    }
  };

  return (
    <div className="container">
      <h1>Machine Failure Prediction</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type (Failure Type)</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="e.g., L, M, H"
            required
          />
        </div>
        <div className="form-group">
          <label>Air Temperature [°C]</label>
          <input
            type="text"
            value={airTemp}
            onChange={(e) => setAirTemp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Process Temperature [°C]</label>
          <input
            type="text"
            value={procTemp}
            onChange={(e) => setProcTemp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rotational Speed [rpm]</label>
          <input
            type="text"
            value={rotSpeed}
            onChange={(e) => setRotSpeed(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Torque [Nm]</label>
          <input
            type="text"
            value={torque}
            onChange={(e) => setTorque(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Tool Wear [min]</label>
          <input
            type="text"
            value={toolWear}
            onChange={(e) => setToolWear(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {prediction && <div className="prediction-message">Prediction: {prediction}</div>}

      <Link to="/sample-inputs" className="nav-button top-nav-button">View Sample Inputs</Link>
    </div>
  );
}

function SampleInputsTable() {
  const sampleData = [
    { type: 'L', airTemp: 25.25, procTemp: 30.5, rotSpeed: 1282, torque: 60.7, toolWear: 216 },
    { type: 'L', airTemp: 24.85, procTemp: 35.13, rotSpeed: 1433, torque: 62.3, toolWear: 20 },
    { type: 'M', airTemp: 25.15, procTemp: 35.25, rotSpeed: 1539, torque: 43.4, toolWear: 69 },
    { type: 'H', airTemp: 23.75, procTemp: 34.65, rotSpeed: 1549, torque: 35.8, toolWear: 206 },
    { type: 'M', airTemp: 27.65, procTemp: 36.25, rotSpeed: 1342, torque: 62.4, toolWear: 113 }
  ];

  return (
    <div className="container">
      <h1>Sample Inputs Table</h1>
      <table className="input-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Air Temp [°C]</th>
            <th>Process Temp [°C]</th>
            <th>Rotational Speed [rpm]</th>
            <th>Torque [Nm]</th>
            <th>Tool Wear [min]</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((row, index) => (
            <tr key={index}>
              <td>{row.type}</td>
              <td>{row.airTemp}</td>
              <td>{row.procTemp}</td>
              <td>{row.rotSpeed}</td>
              <td>{row.torque}</td>
              <td>{row.toolWear}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Link to="/" className="nav-button">Back to Home</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample-inputs" element={<SampleInputsTable />} />
      </Routes>

      <footer className="footer">
        <p>Created by Ziad ElKhazendar</p>
      </footer>
    </Router>
  );
}

export default App;