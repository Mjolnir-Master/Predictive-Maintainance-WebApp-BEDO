from flask import Flask, request, jsonify
import numpy as np
import pickle 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

model = pickle.load(open('model.pkl', 'rb'))

failure_type_mapping = {
    0:'No Failure',
    1:'Tool Wear Failure',
    2:'Heat Dissipation Failure',
    3:'Power Failure',
    4:'Overstrain Failure',
    5:'Random Failure'
}

type_mapping = {
    'L': 1,
    'M': 2,
    'H': 3
}


@app.route('/')
def home():
    return "Running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract the features from the input JSON
        type_input = data.get('Type')
        air_temp = data.get('Air temperature [°C]')
        proc_temp = data.get('Process temperature [°C]')
        rot_speed = data.get('Rotational speed [rpm]')
        torque = data.get('Torque [Nm]')
        tool_wear = data.get('Tool wear [min]')
        
        type_encoded = type_mapping.get(type_input, 0)  # Default to 0 if type is not found

        features = [[type_encoded, air_temp, proc_temp, rot_speed, torque, tool_wear]]

        prediction = model.predict(features)

        predicted_type = failure_type_mapping.get(prediction[0], 'Unknown')

        return jsonify({'prediction': predicted_type})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
