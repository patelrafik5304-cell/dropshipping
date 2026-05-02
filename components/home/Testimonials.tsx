export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Buyer",
      content: "Amazing quality products at unbeatable prices. The shipping was fast and customer service is top-notch!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Verified Buyer",
      content: "I've ordered multiple times and have never been disappointed. Highly recommend this store!",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Verified Buyer",
      content: "Great selection of products. The website is easy to navigate and checkout was a breeze.",
      rating: 5
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-gray-600">Real reviews from real customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">&quot;{testimonial.content}&quot;</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
