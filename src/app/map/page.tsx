"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Construction } from "lucide-react"

export default function MapPage() {
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
              <Link href="/news" className="text-gray-700 hover:text-primary hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                News
              </Link>
              <Link href="/map" className="text-primary bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium">
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
          Interactive Course Map
        </motion.h1>

        {/* Placeholder Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 border border-white/20 shadow-lg min-h-[500px] flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="bg-blue-100 rounded-full p-6 mx-auto mb-6 w-24 h-24 flex items-center justify-center">
              <Construction className="w-12 h-12 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-4">Coming Soon</h2>
            <p className="text-gray-700 max-w-md mx-auto leading-relaxed">
              We're building an interactive map to visualize course relationships, prerequisites, 
              and academic pathways. This feature will help students plan their academic journey more effectively.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-4 text-sm text-gray-600"
          >
            <MapPin className="w-4 h-4 text-secondary" />
            <span>Interactive map functionality will be implemented here</span>
          </motion.div>

          {/* Placeholder Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid md:grid-cols-3 gap-6 mt-12 w-full max-w-4xl"
          >
            <div className="bg-blue-50/50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-primary mb-2">Course Prerequisites</h3>
              <p className="text-sm text-gray-600">Visual representation of course dependencies</p>
            </div>
            <div className="bg-blue-50/50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-primary mb-2">Academic Pathways</h3>
              <p className="text-sm text-gray-600">Explore different degree completion routes</p>
            </div>
            <div className="bg-blue-50/50 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-primary mb-2">Course Relationships</h3>
              <p className="text-sm text-gray-600">Understand how courses connect and build upon each other</p>
            </div>
          </motion.div>
        </motion.div>
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