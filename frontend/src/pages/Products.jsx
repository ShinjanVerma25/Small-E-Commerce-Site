import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";

function Products({ token, setToken, setPage }) {
  const [products, setProducts] = useState([]);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const getProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products`,
    );

    const data = await response.json();

    setProducts(data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/api/products/${editingId}`
      : `${import.meta.env.VITE_API_URL}/api/products`;

    const method = editingId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
      }),
    });

    const data = await response.json();

    setMessage(data.message);

    if (response.ok) {
      setProductData({
        name: "",
        description: "",
        price: "",
        stock: "",
      });

      setEditingId(null);
      getProducts();
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setProductData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  };

  const deleteProduct = async (id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await response.json();

    setMessage(data.message);
    getProducts();
  };

  const cancelEdit = () => {
    setEditingId(null);

    setProductData({
      name: "",
      description: "",
      price: "",
      stock: "",
    });
  };

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    setToken("");
    setPage("login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar logout={logout} />

      <main className="max-w-6xl mx-auto p-6">
        {message && <p className="mb-4 text-green-600">{message}</p>}

        <ProductForm
          productData={productData}
          setProductData={setProductData}
          handleSubmit={handleSubmit}
          editingId={editingId}
          cancelEdit={cancelEdit}
        />

        <div className="grid md:grid-cols-3 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Products;
