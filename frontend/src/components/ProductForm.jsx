function ProductForm({
    productData,
    setProductData,
    handleSubmit,
    editingId,
    cancelEdit
}) {
    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-lg shadow mb-8"
        >
            <h2 className="text-xl font-semibold mb-4">
                {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
                <input
                    name="name"
                    placeholder="Product Name"
                    className="border p-2 rounded"
                    value={productData.name}
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Description"
                    className="border p-2 rounded"
                    value={productData.description}
                    onChange={handleChange}
                />

                <input
                    name="price"
                    type="number"
                    placeholder="Price"
                    className="border p-2 rounded"
                    value={productData.price}
                    onChange={handleChange}
                />

                <input
                    name="stock"
                    type="number"
                    placeholder="Stock"
                    className="border p-2 rounded"
                    value={productData.stock}
                    onChange={handleChange}
                />
            </div>

            <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded">
                {editingId ? "Update Product" : "Add Product"}
            </button>

            {editingId && (
                <button
                    type="button"
                    onClick={cancelEdit}
                    className="ml-2 bg-gray-500 text-white px-5 py-2 rounded"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}

export default ProductForm;