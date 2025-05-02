import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function VerificationResult({ result, onReset }) {
  const navigate = useNavigate()
  
  // Parse result (would come from your backend)
  const isGenuine = result.includes('genuine') // Example check
  const medicineDetails = {
    name: "Paracetamol 500mg",
    batch: "BATCH12345",
    manufacturer: "ABC Pharma",
    expiry: "2024-12-31",
    lastScanned: "2023-10-15 14:30 (Delhi)"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className={`p-6 ${isGenuine ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${isGenuine ? 'bg-green-100' : 'bg-red-100'}`}>
            {isGenuine ? (
              <span className="text-3xl">✅</span>
            ) : (
              <span className="text-3xl">❌</span>
            )}
          </div>
          <h2 className="mt-4 text-2xl font-bold">
            {isGenuine ? 'Genuine Medicine' : 'Potential Fake Detected'}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-medium">{medicineDetails.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Batch:</span>
            <span className="font-medium">{medicineDetails.batch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Manufacturer:</span>
            <span className="font-medium">{medicineDetails.manufacturer}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Expiry:</span>
            <span className="font-medium">{medicineDetails.expiry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Scanned:</span>
            <span className="font-medium">{medicineDetails.lastScanned}</span>
          </div>
        </div>

        {!isGenuine && (
          <div className="mt-6 p-4 bg-red-100 rounded-lg">
            <h3 className="font-bold mb-2">Warning:</h3>
            <p>This medicine appears to be counterfeit. Please report it to authorities.</p>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          <button
            onClick={onReset}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Scan Another
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  )
}