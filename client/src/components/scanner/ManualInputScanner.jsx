import { useState } from 'react';
import { FiType } from 'react-icons/fi';

export default function ManualInputScanner({ onScanSuccess }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!inputValue.trim()) {
      setError('Please enter a QR code value');
      setIsSubmitting(false);
      return;
    }

    if (inputValue.length < 10) {
      setError('QR code value seems too short');
      setIsSubmitting(false);
      return;
    }

    onScanSuccess(inputValue.trim());
    setIsScanned(true);
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        {isScanned ? (
          <div className="p-2 bg-green-100 text-green-800 rounded text-center mb-4">
            QR code data entered successfully!
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <FiType className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="mt-3 text-lg font-medium text-gray-900">Manual Entry</h2>
              <p className="mt-1 text-sm text-gray-500">
                Type or paste the QR code content below
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="qr-input" className="sr-only">QR Code Content</label>
                <textarea
                  id="qr-input"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the QR code text here..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>

              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}