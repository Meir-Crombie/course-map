"use client"
import { motion } from "framer-motion"
import Link from "next/link"

type Article = {
  id: string
  title: string
  excerpt: string
  date: string
  author: string
}

const dummyArticles: Article[] = [
  {
    id: "1",
    title: "New Computer Science Curriculum Released",
    excerpt: "The department has announced significant updates to the computer science curriculum, including new courses in machine learning and data science.",
    date: "2025-09-28",
    author: "Dr. Johnson"
  },
  {
    id: "2", 
    title: "Registration Opens for Spring Semester",
    excerpt: "Students can now register for spring semester courses. Early registration is recommended as popular courses fill up quickly.",
    date: "2025-09-25",
    author: "Academic Office"
  },
  {
    id: "3",
    title: "Guest Lecture: AI in Healthcare",
    excerpt: "Join us for an exciting guest lecture on the applications of artificial intelligence in modern healthcare systems.",
    date: "2025-09-20",
    author: "Dr. Smith"
  },
  {
    id: "4",
    title: "New Research Lab Opening",
    excerpt: "The university is opening a new state-of-the-art research lab focused on quantum computing and advanced algorithms.",
    date: "2025-09-15",
    author: "Research Department"
  }
]

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary">CourseMap</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Home
              </Link>
              <Link href="/courses" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Courses
              </Link>
              <Link href="/news" className="text-primary bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium">
                News
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Map
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-12 text-center"
        >
          Latest News & Updates
        </motion.h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {dummyArticles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold text-primary mb-2 hover:text-blue-800 transition-colors">
                  {article.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{article.author}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                {article.excerpt}
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="text-secondary hover:text-blue-800 font-medium text-sm transition-colors"
              >
                Read More →
              </motion.button>
            </motion.article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-blue-100">
            <p>© 2025 CourseMap. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}