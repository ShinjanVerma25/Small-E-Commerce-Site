import { useState } from "react";

function Register({ setPage }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            }
        );
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            setPage("login");
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleRegister}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-5">
                    Create Account
                </h1>
                <input
                    name="name"
                    placeholder="Name"
                    className="w-full border p-2 mb-3 rounded"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3 rounded"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3 rounded"
                    value={formData.password}
                    onChange={handleChange}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full border p-2 mb-4 rounded"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Register
                </button>
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setPage("login")}
                        className="text-blue-600"
                    >
                        Login
                    </button>
                </p>
                {message && (
                    <p className="text-center mt-3">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}
export default Register;