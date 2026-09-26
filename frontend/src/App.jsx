import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";

function App() {
    const [page, setPage] = useState("login");
    const [token, setToken] = useState("");

    if (page === "register") {
        return <Register setPage={setPage} />;
    }

    if (page === "products") {
        return (
            <Products
                token={token}
                setToken={setToken}
                setPage={setPage}
            />
        );
    }

    return (
        <Login
            setPage={setPage}
            setToken={setToken}
        />
    );
}

export default App;