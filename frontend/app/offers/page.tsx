"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Clock, Gift, Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// <Image
//   src={offer.image}
//   alt={offer.title}
//   width={300}
//   height={200}
//   className="rounded-xl object-cover"
//   priority
// />

const offers = [
  {
    id: 1,
    title: "Weekend Book Sale",
    description: "Get up to 40% off on bestselling fiction books this weekend only!",
    discount: "40% OFF",
    category: "Fiction",
    validUntil: "2024-02-25",
    image: "images/offer1.jpg",
    books: ["The Seven Husbands of Evelyn Hugo", "The Midnight Library", "Where the Crawdads Sing"],
    originalPrice: 1299,
    salePrice: 779,
    featured: true,
  },
  {
    id: 2,
    title: "Self-Help Sunday",
    description: "Transform your life with our curated self-help collection at special prices.",
    discount: "Buy 2 Get 1 FREE",
    category: "Self-Help",
    validUntil: "2024-02-28",
    image: "images/offer2.jpg",
    books: ["Atomic Habits", "The 7 Habits", "Think and Grow Rich"],
    originalPrice: 1497,
    salePrice: 998,
    featured: true,
  },
  {
    id: 3,
    title: "Romance Reader's Paradise",
    description: "Fall in love with our romantic collection. Perfect for cozy reading nights.",
    discount: "30% OFF",
    category: "Romance",
    validUntil: "2024-03-01",
    image: "images/offer3.webp",
    books: ["Beach Read", "The Hating Game", "Red, White & Royal Blue"],
    originalPrice: 899,
    salePrice: 629,
    featured: false,
  },
  {
    id: 4,
    title: "Mystery & Thriller Bundle",
    description: "Solve mysteries and experience thrills with our page-turner collection.",
    discount: "35% OFF",
    category: "Mystery",
    validUntil: "2024-02-29",
    image: "images/suboff1.webp",
    books: ["Gone Girl", "The Girl with the Dragon Tattoo", "Big Little Lies"],
    originalPrice: 1199,
    salePrice: 779,
    featured: false,
  },
  {
    id: 5,
    title: "Biography Bonanza",
    description: "Discover inspiring life stories of remarkable people at unbeatable prices.",
    discount: "25% OFF",
    category: "Biography",
    validUntil: "2024-03-05",
    image: "images/suboff2.jpg",
    books: ["Becoming", "Educated", "Steve Jobs"],
    originalPrice: 1599,
    salePrice: 1199,
    featured: false,
  },
  {
    id: 6,
    title: "Fantasy Adventure Pack",
    description: "Embark on magical journeys with our fantasy collection. Adventure awaits!",
    discount: "45% OFF",
    category: "Fantasy",
    validUntil: "2024-02-27",
    image: "images/suboff3.jpg",
    books: ["The Hobbit", "Harry Potter Series", "The Name of the Wind"],
    originalPrice: 2199,
    salePrice: 1209,
    featured: true,
  },
]

export default function OffersPage() {
  const featuredOffers = offers.filter((offer) => offer.featured)
  const regularOffers = offers.filter((offer) => !offer.featured)

  const getDaysLeft = (validUntil: string) => {
    const today = new Date()
    const endDate = new Date(validUntil)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  return (
    <div className="min-h-screen bg-vintage-paper py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center mb-4">
              <Gift className="h-8 w-8 text-amber-700 mr-3" />
              <h1 className="font-playfair font-bold text-deep-maroon text-5xl md:text-6xl">Special Offers</h1>
            </div>
            <p className="text-muted-plum text-xl max-w-2xl mx-auto">
              Discover amazing deals on your favorite books and explore new literary adventures
            </p>
          </motion.div>
        </div>

        {/* Featured Offers */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h2 className="font-playfair font-bold text-deep-maroon text-3xl mb-2">Featured Deals</h2>
            <p className="text-muted-plum">Limited time offers you don't want to miss</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className="glassmorphism rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 border border-dusty-rose/20"
              >
                <div className="relative">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={600}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-amber-700 text-vintage-paper text-lg px-3 py-1">{offer.discount}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-vintage-paper/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                      <Clock className="h-4 w-4 text-amber-700 mr-1" />
                      <span className="text-deep-maroon text-sm font-medium">
                        {getDaysLeft(offer.validUntil)} days left
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-playfair font-bold text-deep-maroon text-xl">{offer.title}</h3>
                    <Badge variant="outline" className="border-dusty-rose text-dusty-rose">
                      {offer.category}
                    </Badge>
                  </div>

                  <p className="text-muted-plum mb-4 leading-relaxed">{offer.description}</p>

                  <div className="mb-4">
                    <p className="text-deep-maroon font-medium mb-2">Featured Books:</p>
                    <div className="flex flex-wrap gap-1">
                      {offer.books.map((book, idx) => (
                        <span key={idx} className="text-sm text-muted-plum bg-dusty-rose/10 px-2 py-1 rounded">
                          {book}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-deep-maroon">₹{offer.salePrice}</span>
                      <span className="text-lg text-muted-plum line-through">₹{offer.originalPrice}</span>
                    </div>
                    <Button className="bg-amber-800 hover:bg-amber-900 text-vintage-paper">
                      Shop Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Regular Offers */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-playfair font-bold text-deep-maroon text-3xl mb-2">More Great Deals</h2>
            <p className="text-muted-plum">Explore our complete collection of special offers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                className="glassmorphism rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 border border-dusty-rose/20"
              >
                <div className="relative">
                  <Image
                    src={offer.image || "/placeholder.svg"}
                    alt={offer.title}
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-amber-700 text-vintage-paper">{offer.discount}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="bg-vintage-paper/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <Clock className="h-3 w-3 text-amber-700 mr-1" />
                      <span className="text-deep-maroon text-xs font-medium">{getDaysLeft(offer.validUntil)}d</span>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-playfair font-semibold text-deep-maroon text-lg">{offer.title}</h3>
                    <Badge variant="outline" className="border-dusty-rose text-dusty-rose text-xs">
                      {offer.category}
                    </Badge>
                  </div>

                  <p className="text-muted-plum text-sm mb-3 leading-relaxed">{offer.description}</p>

                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {offer.books.slice(0, 2).map((book, idx) => (
                        <span key={idx} className="text-xs text-muted-plum bg-dusty-rose/10 px-2 py-1 rounded">
                          {book}
                        </span>
                      ))}
                      {offer.books.length > 2 && (
                        <span className="text-xs text-muted-plum bg-dusty-rose/10 px-2 py-1 rounded">
                          +{offer.books.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-deep-maroon">₹{offer.salePrice}</span>
                      <span className="text-sm text-muted-plum line-through">₹{offer.originalPrice}</span>
                    </div>
                    <Button size="sm" className="bg-amber-800 hover:bg-amber-900 text-vintage-paper">
                      View Deal
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glassmorphism rounded-2xl p-8 max-w-2xl mx-auto border border-dusty-rose/20">
            <div className="flex items-center justify-center mb-4">
              <Tag className="h-6 w-6 text-amber-700 mr-2" />
              <h3 className="font-playfair font-bold text-deep-maroon text-2xl">Never Miss a Deal</h3>
            </div>
            <p className="text-muted-plum mb-6">
              Subscribe to our newsletter and be the first to know about exclusive offers, new arrivals, and special
              discounts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/register">
                <Button className="bg-amber-800 hover:bg-amber-900 text-vintage-paper px-6">Subscribe Now</Button>
              </Link>
              <Link href="/books">
                <Button variant="outline" className="border-dusty-rose text-deep-maroon hover:bg-dusty-rose/10">
                  Browse All Books
                </Button>
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
