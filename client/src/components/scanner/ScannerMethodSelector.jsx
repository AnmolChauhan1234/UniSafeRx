import { motion } from 'framer-motion'

const methods = [
  {
    id: 'webcam',
    title: 'Use Webcam',
    description: 'Scan using your computer camera',
    icon: '🎥'
  },
  {
    id: 'phone',
    title: 'Phone as Webcam',
    description: 'Connect your phone as a camera',
    icon: '📱'
  },
  {
    id: 'upload',
    title: 'Upload Image',
    description: 'Upload a QR code image file',
    icon: '📁'
  },
  {
    id: 'manual',
    title: 'Manual Entry',
    description: 'Type the code manually',
    icon: '⌨️'
  }
]

export default function ScannerMethodSelector({ onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {methods.map((method) => (
        <motion.div
          key={method.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="border rounded-lg p-6 cursor-pointer text-center"
          onClick={() => onSelect(method.id)}
        >
          <div className="text-4xl mb-3">{method.icon}</div>
          <h3 className="text-xl font-bold mb-2">{method.title}</h3>
          <p className="text-gray-600">{method.description}</p>
        </motion.div>
      ))}
    </div>
  )
}