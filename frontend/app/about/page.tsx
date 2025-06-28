"use client"

import { BookOpen, Heart, Star, Users, Coffee, Sparkles, Award, Globe, Quote } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const stats = [
  { icon: BookOpen, label: "Books Available", value: "10,000+" },
  { icon: Users, label: "Happy Readers", value: "25,000+" },
  { icon: Star, label: "Average Rating", value: "4.9" },
  { icon: Award, label: "Years of Service", value: "5+" },
]

const features = [
  {
    icon: BookOpen,
    title: "Curated Selection",
    description: "Every book is handpicked by our literary experts for quality and emotional depth.",
  },
  {
    icon: Coffee,
    title: "Cozy Experience",
    description: "Creating a warm, inviting space for book lovers to discover their next favorite read.",
  },
  {
    icon: Sparkles,
    title: "Personal Touch",
    description: "Personalized recommendations based on your reading preferences and mood.",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "Building connections between readers through shared stories and experiences.",
  },
]

const team = [
  {
    name: "Arshiya Shaikh",
    role: "Founder & Technology Operations",
    bio: "Tech enthusiast and avid reader, Arshiya bridges the gap between traditional bookstores and modern convenience.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Harsh Sonar",
    role: "Literary Curator",
    bio: "A passionate bibliophile with over 15 years in publishing, Harsh founded Novellea to share his love for transformative literature.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Aditi Bhole",
    role: "Head of Customer Experience",
    bio: "Former librarian turned customer advocate, Aditi ensures every reader finds their perfect literary match.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

const testimonials = [
  {
    name: "Ananya Patel",
    location: "Mumbai",
    text: "Novellea has completely transformed my reading journey. Their recommendations are always spot-on, and the quality of books is exceptional.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    location: "Delhi",
    text: "The personal touch and attention to detail make Novellea stand out. It's not just a bookstore, it's a literary sanctuary.",
    rating: 5,
  },
  {
    name: "Meera Krishnan",
    location: "Bangalore",
    text: "I've discovered so many amazing authors through Novellea. Their curated collections have broadened my literary horizons.",
    rating: 5,
  },
]

const milestones = [
  { year: "2019", event: "Novellea founded with a vision to democratize quality literature" },
  { year: "2020", event: "Launched online platform during pandemic, serving readers nationwide" },
  { year: "2021", event: "Reached 10,000 satisfied customers and expanded genre collections" },
  { year: "2022", event: "Introduced personalized recommendation system and book clubs" },
  { year: "2023", event: "Opened first physical reading space in Pune" },
  { year: "2024", event: "Celebrating 25,000+ readers and launching community initiatives" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-vintage-paper">
      {/* Hero Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="flex items-center justify-center mb-6">
                <Image
                  src="/images/brand-feather.png"
                  alt="Novellea Feather"
                  width={48}
                  height={48}
                  className="h-12 w-12 mr-4"
                />
                <h1 className="font-playfair font-bold text-deep-maroon text-5xl md:text-6xl">About Novellea</h1>
              </div>
              <div className="w-20 h-1 bg-dusty-rose rounded-full mx-auto mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glassmorphism rounded-2xl p-8 mb-12"
            >
              <p className="text-deep-maroon text-lg leading-relaxed mb-6">
                At Novellea, stories matter. Each title in our collection is handpicked for its emotional depth,
                literary brilliance, and transformative power. We believe reading is not just entertainment—it's a
                journey of discovery, empathy, and personal growth.
              </p>
              <p className="text-muted-plum leading-relaxed">
                Founded in 2019 with a simple mission: to connect readers with books that don't just tell stories, but
                change lives. Every recommendation, every curated collection, every interaction is designed to help you
                find your next literary obsession.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-soft-ivory">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-dusty-rose" />
                </div>
                <h3 className="font-playfair font-bold text-deep-maroon text-2xl md:text-3xl mb-2">{stat.value}</h3>
                <p className="text-muted-plum font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-vintage-paper">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair font-bold text-deep-maroon text-4xl mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-plum leading-relaxed">
                <p>
                  Novellea began in a small apartment in Mumbai, where founder Arjun Mehta spent countless hours
                  surrounded by towering stacks of books. As a literature professor turned entrepreneur, he noticed a
                  gap in the market—readers were overwhelmed by choices but starved for quality curation.
                </p>
                <p>
                  What started as weekend book recommendations to friends evolved into a mission to democratize access
                  to transformative literature. We don't just sell books; we curate experiences, foster communities, and
                  celebrate the profound impact that the right story can have on a person's life.
                </p>
                <p>
                  Today, Novellea serves readers across India, but our core philosophy remains unchanged: every book we
                  recommend should have the power to change how you see the world, or at least, how you see yourself.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glassmorphism rounded-2xl overflow-hidden">
                <Image
                  src="images/bookcommun.jpg"
                  alt="Book Community Reading Together"
                  width={600}
                  height={400}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-maroon/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-soft-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair font-bold text-deep-maroon text-4xl mb-4">What Makes Us Different</h2>
            <p className="text-muted-plum text-lg max-w-2xl mx-auto">
              We're not just another bookstore. We're curators, community builders, and champions of literary
              excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glassmorphism rounded-xl p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-dusty-rose" />
                </div>
                <h3 className="font-playfair font-semibold text-deep-maroon text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-plum leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-vintage-paper">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair font-bold text-deep-maroon text-4xl mb-4">Meet Our Team</h2>
            <p className="text-muted-plum text-lg max-w-2xl mx-auto">
              The passionate individuals behind Novellea's mission to connect readers with transformative literature.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glassmorphism rounded-xl p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <div className="w-24 h-24 bg-dusty-rose/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-12 w-12 text-dusty-rose" />
                </div>
                <h3 className="font-playfair font-bold text-deep-maroon text-xl mb-2">{member.name}</h3>
                <p className="text-dusty-rose font-medium mb-3">{member.role}</p>
                <p className="text-muted-plum text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-soft-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair font-bold text-deep-maroon text-4xl mb-4">Our Journey</h2>
            <p className="text-muted-plum text-lg max-w-2xl mx-auto">
              From a small idea to a thriving community of book lovers across India.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 text-right mr-8">
                  <span className="font-playfair font-bold text-dusty-rose text-xl">{milestone.year}</span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-dusty-rose rounded-full mr-8 relative">
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-dusty-rose/30 last:hidden"></div>
                </div>
                <div className="glassmorphism rounded-lg p-4 flex-1">
                  <p className="text-deep-maroon leading-relaxed">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-vintage-paper">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair font-bold text-deep-maroon text-4xl mb-4">What Readers Say</h2>
            <p className="text-muted-plum text-lg max-w-2xl mx-auto">
              Hear from our community of passionate readers about their Novellea experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glassmorphism rounded-xl p-6 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-dusty-rose mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-plum leading-relaxed mb-4 italic">"{testimonial.text}"</p>
                <div className="border-t border-dusty-rose/20 pt-4">
                  <p className="font-playfair font-semibold text-deep-maroon">{testimonial.name}</p>
                  <p className="text-dusty-rose text-sm">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-br from-dusty-rose/10 to-soft-ivory">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="glassmorphism rounded-3xl p-12">
              <div className="flex items-center justify-center mb-6">
                <Globe className="h-12 w-12 text-dusty-rose mr-4" />
                <h2 className="font-playfair font-bold text-deep-maroon text-3xl md:text-4xl">Our Mission</h2>
              </div>
              <p className="text-deep-maroon text-xl leading-relaxed mb-6">
                To create a world where every reader finds their perfect story, where literature brings people together,
                and where the joy of reading is accessible to all.
              </p>
              <p className="text-muted-plum text-lg leading-relaxed">
                We envision a future where books continue to be bridges between cultures, catalysts for empathy, and
                companions in every reader's journey of self-discovery.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
