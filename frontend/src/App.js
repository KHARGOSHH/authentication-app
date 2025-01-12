import React, { useState } from "react";
import axios from "axios";

function App() {
    const [page, setPage] = useState("home"); // Track which page is displayed
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/register", {
                username,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const renderHome = () => (
        <div>
            <h1>Welcome to the Authentication App</h1>
            <button onClick={() => setPage("login")}>Login</button>
            <button onClick={() => setPage("register")}>Register</button>
        </div>
    );

    const renderLogin = () => (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
            <button onClick={() => setPage("home")}>Back</button>
        </div>
    );

    const renderRegister = () => (
        <div>
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
            <p>{message}</p>
            <button onClick={() => setPage("home")}>Back</button>
        </div>
    );

    // Render the appropriate page based on state
    return (
        <div>
            {page === "home" && renderHome()}
            {page === "login" && renderLogin()}
            {page === "register" && renderRegister()}
        </div>
    );
}

export default App;
