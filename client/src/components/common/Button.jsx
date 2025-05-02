import { motion } from 'framer-motion'

export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-md transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  )
}