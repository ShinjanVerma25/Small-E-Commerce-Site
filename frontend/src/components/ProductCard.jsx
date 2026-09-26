function ProductCard({ product, editProduct, deleteProduct }) {
    return (
        <div className="bg-white p-5 rounded-lg shadow">
            <h3 className="text-xl font-bold">
                {product.name}
            </h3>

            <p className="text-gray-600 mt-2">
                {product.description}
            </p>

            <p className="mt-3 font-semibold">
                ₹{product.price}
            </p>

            <p className="text-gray-500">
                Stock: {product.stock}
            </p>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={() => editProduct(product)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                    Edit
                </button>

                <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default ProductCard;