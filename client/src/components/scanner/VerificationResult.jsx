// import { motion } from 'framer-motion'
// import { useNavigate } from 'react-router-dom'

// export default function VerificationResult({ result, onReset }) {
//   const navigate = useNavigate()
  
//   // Parse result (would come from your backend)
//   const isGenuine = result.includes('genuine') // Example check
//   const medicineDetails = {
//     name: "Paracetamol 500mg",
//     batch: "BATCH12345",
//     manufacturer: "ABC Pharma",
//     expiry: "2024-12-31",
//     lastScanned: "2023-10-15 14:30 (Delhi)"
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
//     >
//       <div className={`p-6 ${isGenuine ? 'bg-green-50' : 'bg-red-50'}`}>
//         <div className="text-center mb-6">
//           <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isGenuine ? 'bg-green-100' : 'bg-red-100'}`}>
//             {isGenuine ? (
//               <span className="text-3xl">✅</span>
//             ) : (
//               <span className="text-3xl">❌</span>
//             )}
//           </div>
//           <h2 className="mt-4 text-2xl font-bold">
//             {isGenuine ? 'Genuine Medicine' : 'Potential Fake Detected'}
//           </h2>
//         </div>

//         <div className="space-y-4">
//           <div className="flex justify-between">
//             <span className="text-gray-600">Name:</span>
//             <span className="font-medium">{medicineDetails.name}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Batch:</span>
//             <span className="font-medium">{medicineDetails.batch}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Manufacturer:</span>
//             <span className="font-medium">{medicineDetails.manufacturer}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Expiry:</span>
//             <span className="font-medium">{medicineDetails.expiry}</span>
//           </div>
//           <div className="flex justify-between">
//             <span className="text-gray-600">Last Scanned:</span>
//             <span className="font-medium">{medicineDetails.lastScanned}</span>
//           </div>
//         </div>

//         {!isGenuine && (
//           <div className="mt-6 p-4 bg-red-100 rounded-lg">
//             <h3 className="font-bold mb-2">Warning:</h3>
//             <p>This medicine appears to be counterfeit. Please report it to authorities.</p>
//           </div>
//         )}

//         <div className="mt-8 flex justify-between">
//           <button
//             onClick={onReset}
//             className="px-4 py-2 border border-gray-300 rounded-md"
//           >
//             Scan Another
//           </button>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="px-4 py-2 bg-blue-600 text-white rounded-md"
//           >
//             View Dashboard
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }



import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaQrcode } from 'react-icons/fa';

export default function VerificationResult({ result, onReset }) {
  const navigate = useNavigate();
  const isGenuine = result?.verified || false;
  const message = result?.message || 'Verification result unknown';

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut'
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className={`p-8 ${isGenuine ? 'bg-green-50' : 'bg-red-50'} relative`}>
          {/* Background pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className={`w-full h-full ${isGenuine ? 'bg-green-100' : 'bg-red-100'}`} />
          </div>

          <div className="relative z-10">
            {/* Result Icon */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <div className={`p-6 rounded-full ${isGenuine ? 'bg-green-100' : 'bg-red-100'}`}>
                {isGenuine ? (
                  <FaCheckCircle className="w-16 h-16 text-green-600" />
                ) : (
                  <FaTimesCircle className="w-16 h-16 text-red-600" />
                )}
              </div>
            </motion.div>

            {/* Result Text */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-8"
            >
              <h2 className={`text-3xl font-bold mb-2 ${isGenuine ? 'text-green-800' : 'text-red-800'}`}>
                {isGenuine ? 'Verification Successful!' : 'Verification Failed'}
              </h2>
              <p className="text-lg text-gray-600">
                {message}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
            >
              <button
                onClick={onReset}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FaQrcode className="w-5 h-5" />
                Scan Another
              </button>
              
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
            </motion.div>
          </div>
        </div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-8 bg-gray-50 border-t border-gray-100"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              What's Next?
            </h3>
            <p className="text-gray-600">
              {isGenuine ? (
                'This medicine has passed all security checks. You can safely proceed with distribution or consumption.'
              ) : (
                'Please isolate this product and contact our support team immediately for further instructions.'
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}