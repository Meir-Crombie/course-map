"use client"

import { motion } from "framer-motion"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { MapPin, Construction } from "lucide-react"

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: "var(--color-bg-main)"}}>
      <Header />

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
          className="bg-white/70 backdrop-blur-lg rounded-2xl p-12 min-h-[500px] flex flex-col items-center justify-center text-center" style={{boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--color-bg-card)'}}
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
              We&apos;re building an interactive map to visualize course relationships, prerequisites, 
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

      <Footer />
    </div>
  )
}