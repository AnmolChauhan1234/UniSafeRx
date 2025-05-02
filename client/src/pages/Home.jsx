// import { Link } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { useAuth } from '../contexts/AuthContext'
// import { FiUser, FiShield, FiActivity, FiHeart } from 'react-icons/fi'

// export default function Home() {
//   const { user } = useAuth()

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2
//       }
//     }
//   }

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5
//       }
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//               <FiShield className="text-white text-xl" />
//             </div>
//             <p className="text-sm text-gray-500">Blockchain-powered medicine verification</p>
//           </div>
          
//           <div className="flex-1 text-center">
//             <h1 className='text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>UniSafeRX</h1>
//           </div>

//           <div>
//             {user ? (
//               <Link to="/dashboard" className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <FiUser className="text-blue-600" />
//                 </div>
//                 <span className="hidden md:inline text-sm">Dashboard</span>
//               </Link>
//             ) : (
//               <Link to="/login" className="btn-primary">
//                 Login/Signup
//               </Link>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <motion.div 
//         className="container mx-auto px-6 py-16 text-center"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         <motion.h1 
//           className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
//           variants={itemVariants}
//         >
//           Fight Against Fake Medicines
//         </motion.h1>
        
//         <motion.p 
//           className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
//           variants={itemVariants}
//         >
//           Verify your medicines instantly using blockchain technology to ensure authenticity and safety
//         </motion.p>

//         <motion.div variants={itemVariants}>
//           <Link to="/scanner">
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg text-lg font-medium overflow-hidden cursor-pointer"
//             >
//               <span className="relative z-10">Scan Medicine Now</span>
//               <motion.span
//                 className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
//                 aria-hidden="true"
//               />
//             </motion.button>
//           </Link>
//         </motion.div>

//         <motion.div 
//           className="mt-16"
//           variants={itemVariants}
//         >
//           <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full"></div>
//         </motion.div>
//       </motion.div>

//       {/* Features Section */}
//       <div className="container mx-auto px-6 py-16">
//         <motion.h2 
//           className="text-3xl font-bold text-center mb-12"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//         >
//           How It Works
//         </motion.h2>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Feature 1 */}
//           <motion.div
//             className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             viewport={{ once: true }}
//           >
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FiActivity className="text-blue-600 text-2xl" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3 text-center">Scan QR Code</h3>
//             <p className="text-gray-600 text-center">
//               Simply scan the QR code on your medicine packaging using our secure scanner
//             </p>
//           </motion.div>

//           {/* Feature 2 */}
//           <motion.div
//             className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.4 }}
//             viewport={{ once: true }}
//           >
//             <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FiShield className="text-purple-600 text-2xl" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3 text-center">Instant Verification</h3>
//             <p className="text-gray-600 text-center">
//               Our system checks against blockchain records to verify authenticity in seconds
//             </p>
//           </motion.div>

//           {/* Feature 3 */}
//           <motion.div
//             className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             viewport={{ once: true }}
//           >
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
//               <FiHeart className="text-green-600 text-2xl" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3 text-center">Safe Medicines</h3>
//             <p className="text-gray-600 text-center">
//               Get peace of mind knowing your medicines are genuine and safe to use
//             </p>
//           </motion.div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-blue-600 py-16">
//         <div className="container mx-auto px-6 text-center">
//           <motion.h2 
//             className="text-3xl font-bold text-white mb-6"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             Ready to Verify Your Medicines?
//           </motion.h2>
//           <motion.div
//             initial={{ scale: 0.9 }}
//             whileInView={{ scale: 1 }}
//             transition={{ type: 'spring', stiffness: 100 }}
//             viewport={{ once: true }}
//           >
//             <Link to="/scanner">
//               <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors cursor-pointer">
//                 Start Scanning Now
//               </button>
//             </Link>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiShield, FiActivity, FiHeart, FiArrowRight } from 'react-icons/fi'
import { useEffect } from 'react'

export default function Home() {
  const { isLoggedIn } = useAuth()

  // Animated values for floating effect
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [0, 1], [0, 15])
  const rotateY = useTransform(y, [0, 1], [0, -15])

  useEffect(() => {
    const floatAnimation = animate(y, 1, {
      duration: 4,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    })

    return floatAnimation.stop
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 overflow-hidden">
      {/* Floating Background Elements */}
      <motion.div
        style={{ y, rotateX, rotateY }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-blue-200 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              scale: Math.random() * 2 + 0.5
            }}
            animate={{
              rotate: [0, 360],
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'linear'
            }}
          >
            <FiShield className="text-4xl" />
          </motion.div>
        ))}
      </motion.div>

      {/* Glassmorphism Header */}
      <motion.header 
        className="fixed w-full bg-white/80 backdrop-blur-lg shadow-sm z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2 group"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <FiShield className="text-white text-xl" />
            </div>
            <p className="text-sm text-gray-600 font-medium">Blockchain Medicine Verification</p>
          </motion.div>
          
          <motion.div className="flex-1 text-center">
            <h1 className='text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              UniSafeRX
            </h1>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            {isLoggedIn ? (
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-2 bg-white/90 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <span className="hidden md:inline text-sm font-medium">Dashboard</span>
                <FiArrowRight className="text-blue-600" />
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
              >
                <span>Get Started</span>
                <FiArrowRight className="text-white animate-pulse" />
              </Link>
            )}
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-6 pt-32 pb-16 text-center relative"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight"
          variants={itemVariants}
        >
          <span className="inline-block">Secure Your Health</span><br />
          <span className="inline-block mt-2 text-3xl md:text-4xl font-normal bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            with Blockchain Verification
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto font-light"
          variants={itemVariants}
        >
          Instantly authenticate pharmaceutical products using decentralized technology to combat counterfeit medicines
        </motion.p>

        <motion.div variants={itemVariants} className="relative inline-block">
          <Link to="/verify-medicine">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl text-xl font-semibold overflow-hidden cursor-pointer group"
            >
              <span className="relative z-10 flex items-center space-x-3">
                <span>Scan Medicine</span>
                <FiActivity className="text-xl animate-pulse" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300" />
            </motion.button>
          </Link>
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl -z-10 rounded-full" />
        </motion.div>

        {/* Animated Divider */}
        <motion.div 
          className="mt-24 relative"
          variants={itemVariants}
        >
          <div className="w-48 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16 relative">
        <motion.h2 
          className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Our Protection System
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Feature 1 - 3D Card Effect */}
          <motion.div
            className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all cursor-pointer group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <FiActivity className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Instant Scan</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Quick QR code scanning with real-time blockchain verification process
              </p>
            </div>
          </motion.div>

          {/* Feature 2 - Hover Glow */}
          <motion.div
            className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all cursor-pointer group overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity blur-xl" />
            <div className="relative z-10">
              <div className="w-20 h-20 bg-purple-600/10 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <FiShield className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Military-grade Security</h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Blockchain-powered immutable records with end-to-end encryption
              </p>
            </div>
          </motion.div>

          {/* Feature 3 - Floating Icon */}
          <motion.div
            className="relative bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all cursor-pointer group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="w-20 h-20 bg-green-600/10 rounded-2xl flex items-center justify-center mb-6 mx-auto backdrop-blur-sm"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <FiHeart className="text-green-600 text-3xl" />
            </motion.div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Health Guardian</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Protect your family with AI-powered medicine safety monitoring
            </p>
          </motion.div>
        </div>
      </div>

      {/* Parallax CTA Section */}
      <motion.div 
        className="relative py-32 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 skew-y-3 transform -translate-y-12" />
        <div className="container mx-auto px-6 text-center relative">
          <motion.h2 
            className="text-4xl font-bold text-white mb-8"
            initial={{ y: 40 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join the Healthcare Revolution
          </motion.h2>
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
          >
            <Link to="/verify-medicine">
              <button className="px-12 py-4 bg-white text-blue-600 rounded-2xl font-semibold shadow-2xl hover:bg-gray-100 transition-all cursor-pointer flex items-center space-x-3 mx-auto">
                <span>Start Protecting Now</span>
                <FiArrowRight className="animate-bounce-horizontal" />
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}