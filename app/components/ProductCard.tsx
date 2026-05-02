import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <div className="flex items-center">
        {Array(full).fill(0).map((_, i) => (
          <svg key={`f${i}`} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {half && (
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {Array(empty).fill(0).map((_, i) => (
          <svg key={`e${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow group cursor-pointer">
      {/* Image */}
      <div className="p-4 flex items-center justify-center aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 pt-0">
        <a
          href={`/products/${product.id}`}
          className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-orange-600 hover:underline"
        >
          {product.name}
        </a>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars(product.rating)}
          <span className="text-sm text-cyan-700">{product.reviews}</span>
        </div>

        {/* Price */}
        <div className="mt-1">
          {discount > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-red-700 font-medium">-{discount}%</span>
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className="text-xs align-top">₹</span>
            <span className="text-2xl font-normal text-gray-900">
              {product.price.toLocaleString("en-IN")}
            </span>
          </div>
          {product.originalPrice && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="line-through">M.R.P.: ₹{product.originalPrice.toLocaleString("en-IN")}</span>
            </div>
          )}
        </div>

        {/* Delivery */}
        <div className="mt-2 text-xs">
          <span className="text-gray-500">
            FREE Delivery by <span className="font-bold text-gray-700">Tomorrow</span>
          </span>
        </div>

        {/* Prime-like badge */}
        <div className="mt-1">
          <span className="bg-orange-400 text-gray-900 text-xs font-bold px-1 py-0.5 rounded-sm">
            Fast Delivery
          </span>
        </div>
      </div>
    </div>
  );
}
