import { removeWishlistProduct } from "@/redux/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function WhishList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: RootState) => state.product.wishlistProducts
  );

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Your wishlist is empty
        </h1>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-xl">
          <h1
            id="your-orders-heading"
            className="text-3xl font-bold text-center tracking-tight text-gray-900"
          >
            Your wishlist
          </h1>
        </div>

        <div className="mt-12 space-y-16 sm:mt-16">
          <div className="-mb-6 mt-6 flow-root divide-y bg-slate-100 shadow-md divide-gray-200 border-t border-gray-200">
            {products.map((product) => (
              <div key={product._id} className="py-6 sm:flex">
                <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                  <img
                    src={product.images[0]}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center sm:h-48 sm:w-48"
                  />
                  <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      <Link to={`/product-details/${product._id}`}>
                        {product.title}
                      </Link>
                    </h3>
                    <div className="mt-2 flex space-x-6">
                      <div className="flex items-center my-2 justify-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          Color
                        </h3>
                        <div className="flex items-center justify-center gap-1">
                          {product?.colors?.map((color) => (
                            <div
                              key={color.name}
                              className="flex items-center justify-center space-x-2 flex-wrap"
                            >
                              <span
                                aria-hidden="true"
                                className="h-6 w-6 rounded-full border border-black border-opacity-10"
                                style={{
                                  backgroundColor: color.hex,
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center my-2 justify-center gap-2">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                        <div className="flex items-center justify-center gap-1">
                          {product?.sizes?.map((size) => (
                            <div
                              key={size}
                              className="flex items-center justify-center rounded-md border py-1 px-2 text-sm font-medium uppercase bg-white text-gray-900"
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-1 font-medium text-gray-900">
                      {product.price}
                    </p>

                    {product.stock ? (
                      <div className="mt-4">
                        <p className="flex items-center gap-1">
                          <CheckIcon className="w-5 h-5" /> In Stock
                        </p>
                        <p className="mt-4">Stock: {product.stock} </p>
                      </div>
                    ) : (
                      <p className="flex items-center gap-1">
                        <XMarkIcon className="w-5 h-5" /> Our of Stock
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                  <Link to={`/product-details/${product._id}`}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                    >
                      Buy Now
                    </button>
                  </Link>
                  <button
                    type="button"
                    onClick={() => dispatch(removeWishlistProduct(product._id))}
                    className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:flex-grow-0"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
