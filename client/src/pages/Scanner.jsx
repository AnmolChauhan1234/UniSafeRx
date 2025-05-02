// import { useState } from 'react'
// import ScannerMethodSelector from '../components/scanner/ScannerMethodSelector'
// import WebcamScanner from '../components/scanner/WebcamScanner'
// import PhoneAsWebcam from '../components/scanner/PhoneAsWebcam'
// import FileUploadScanner from '../components/scanner/FileUploadScanner'
// import ManualInputScanner from '../components/scanner/ManualInputScanner'
// import VerificationResult from '../components/scanner/VerificationResult'

// export default function ScannerPage() {
//   const [scanMethod, setScanMethod] = useState(null)
//   const [scanResult, setScanResult] = useState(null)

//   const handleScanResult = (result) => {
//     setScanResult(result)
//   }

//   if (scanResult) {
//     return <VerificationResult result={scanResult} onReset={() => setScanResult(null)} />
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {!scanMethod ? (
//         <ScannerMethodSelector onSelect={setScanMethod} />
//       ) : (
//         <div className="max-w-md mx-auto">
//           <button 
//             onClick={() => setScanMethod(null)}
//             className="mb-4 text-blue-600 hover:text-blue-800"
//           >
//             ← Back to method selection
//           </button>
          
//           {scanMethod === 'webcam' && <WebcamScanner onScan={handleScanResult} />}
//           {scanMethod === 'phone' && <PhoneAsWebcam onScan={handleScanResult} />}
//           {scanMethod === 'upload' && <FileUploadScanner onScan={handleScanResult} />}
//           {scanMethod === 'manual' && <ManualInputScanner onScan={handleScanResult} />}
//         </div>
//       )}
//     </div>
//   )
// }



import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScannerMethodSelector from '../components/scanner/ScannerMethodSelector'
import WebcamScanner from '../components/scanner/WebcamScanner'
import PhoneAsWebcam from '../components/scanner/PhoneAsWebcam'
import FileUploadScanner from '../components/scanner/FileUploadScanner'
import ManualInputScanner from '../components/scanner/ManualInputScanner'
import VerificationResult from '../components/scanner/VerificationResult'
import { FaArrowLeft, FaCamera, FaMobileAlt, FaUpload, FaKeyboard } from 'react-icons/fa'

export default function ScannerPage() {
  const [scanMethod, setScanMethod] = useState(null)
  const [scanResult, setScanResult] = useState(null)

  const handleScanResult = (result) => {
    setScanResult(result)
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    in: { opacity: 1, transition: { duration: 0.3 } },
    out: { opacity: 0 }
  }

  const methodCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }

  if (scanResult) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <VerificationResult result={scanResult} onReset={() => setScanResult(null)} />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {!scanMethod ? (
            <motion.div
              key="method-selector"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                  Medicine Scanner
                </h1>
                <p className="text-gray-600 text-center mb-8">
                  Choose your preferred scanning method
                </p>
                <ScannerMethodSelector onSelect={setScanMethod} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scanner-interface"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <motion.button
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setScanMethod(null)}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to methods
                </motion.button>

                <div className="flex items-start mb-6">
                  <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
                    {scanMethod === 'webcam' && <FaCamera className="text-xl" />}
                    {scanMethod === 'phone' && <FaMobileAlt className="text-xl" />}
                    {scanMethod === 'upload' && <FaUpload className="text-xl" />}
                    {scanMethod === 'manual' && <FaKeyboard className="text-xl" />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {scanMethod === 'webcam' && 'Webcam Scanner'}
                      {scanMethod === 'phone' && 'Phone as Webcam'}
                      {scanMethod === 'upload' && 'File Upload'}
                      {scanMethod === 'manual' && 'Manual Input'}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {scanMethod === 'webcam' && 'Scan medicine using your device camera'}
                      {scanMethod === 'phone' && 'Use your phone as a scanner'}
                      {scanMethod === 'upload' && 'Upload an image of your medicine'}
                      {scanMethod === 'manual' && 'Enter medicine details manually'}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {scanMethod === 'webcam' && <WebcamScanner onScan={handleScanResult} />}
                  {scanMethod === 'phone' && <PhoneAsWebcam onScan={handleScanResult} />}
                  {scanMethod === 'upload' && <FileUploadScanner onScan={handleScanResult} />}
                  {scanMethod === 'manual' && <ManualInputScanner onScan={handleScanResult} />}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}