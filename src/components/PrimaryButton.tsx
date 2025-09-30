"use client"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  icon?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

export default function PrimaryButton({ 
  children, 
  onClick, 
  href, 
  icon = true, 
  size = 'md',
  variant = 'primary'
}: PrimaryButtonProps) {
  const baseClasses = "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center"
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }

  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
  }

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`

  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowLeft className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />}
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${classes} group inline-flex`}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${classes} group`}
    >
      {content}
    </motion.button>
  )
}