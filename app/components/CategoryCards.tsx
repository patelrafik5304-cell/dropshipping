import Link from "next/link";

const categories = [
  {
    title: "Up to 60% off | Kitchen essentials",
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e6?w=300&q=80",
    link: "/products",
  },
  {
    title: "Starting ₹299 | Home decor",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=300&q=80",
    link: "/products",
  },
  {
    title: "Min 50% off | Smart gadgets",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=300&q=80",
    link: "/products",
  },
  {
    title: "₹149 to ₹599 | Fitness items",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=300&q=80",
    link: "/products",
  },
];

export default function CategoryCards() {
  return (
    <div className="max-w-[1500px] mx-auto px-4 -mt-8 sm:-mt-16 md:-mt-24 lg:-mt-32 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <Link
            key={i}
            href={cat.link}
            className="bg-white p-5 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-xl font-bold mb-3 text-gray-900">{cat.title}</h3>
            <div className="aspect-square overflow-hidden mb-3 bg-gray-100">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-sm text-cyan-700 hover:text-orange-600 hover:underline">
              Shop now
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
