import { useState } from "react";

function Login({ setPage, setToken }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(formData)
            }
        );

        const data = await response.json();

        if (response.ok) {
            setToken(data.accessToken);
            setPage("products");
        } else {
            setMessage(data.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-5">
                    Login
                </h1>

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
                    className="w-full border p-2 mb-4 rounded"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Login
                </button>

                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <button
                        type="button"
                        onClick={() => setPage("register")}
                        className="text-blue-600"
                    >
                        Register
                    </button>
                </p>

                {message && (
                    <p className="text-center mt-3 text-red-500">
                        {message}
                    </p>
                )}
            </form>
        </div>
    );
}

export default Login;