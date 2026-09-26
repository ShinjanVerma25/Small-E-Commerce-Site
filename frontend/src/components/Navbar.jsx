function Navbar({ logout }) {
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
                E-Commerce Store
            </h1>

            <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar;