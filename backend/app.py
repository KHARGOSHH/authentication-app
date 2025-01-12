from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import redis

app = Flask(__name__)
CORS(app)

# MongoDB setup

client = MongoClient("mongodb+srv://ankit:Ankit@252@cluster0.z8ypl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['authentication_db']
users = db['users']

# Redis setup
redis_client = redis.StrictRedis(host='localhost', port=6379, decode_responses=True)

# Routes
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if users.find_one({"username": username}):
        return jsonify({"error": "User already exists"}), 400

    users.insert_one({"username": username, "password": password})
    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = users.find_one({"username": username})
    if not user or user['password'] != password:
        return jsonify({"error": "Invalid credentials"}), 401

    redis_client.set(username, "logged_in")
    return jsonify({"message": "Login successful"}), 200

if __name__ == '__main__':
    app.run(debug=True)
