import { useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { FiUpload, FiX } from 'react-icons/fi';

export default function FileUploadScanner({ onScanSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isScanned, setIsScanned] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError('');
    setIsScanned(false);
  };

  const handleScan = async () => {
    if (!selectedFile) return;

    try {
      const html5QrCode = new Html5Qrcode("file-upload-reader");
      const decodedText = await html5QrCode.scanFile(selectedFile, false);
      onScanSuccess(decodedText);
      setIsScanned(true);
    } catch (err) {
      setError('Failed to read QR code: ' + err.message);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setError('');
    setIsScanned(false);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        {!selectedFile ? (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center space-y-2">
              <FiUpload className="text-3xl text-gray-400" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">Supports JPG, PNG, etc. (Max 5MB)</p>
            </div>
          </label>
        ) : (
          <div className="relative">
            <img src={previewUrl} alt="Selected QR code" className="max-h-64 mx-auto" />
            <button
              onClick={clearSelection}
              className="absolute top-0 right-0 p-1 bg-gray-800 rounded-full text-white"
              aria-label="Remove image"
            >
              <FiX size={16} />
            </button>
          </div>
        )}
      </div>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      {selectedFile && !isScanned && (
        <button
          onClick={handleScan}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Scan QR Code
        </button>
      )}

      {isScanned && (
        <div className="p-2 bg-green-100 text-green-800 rounded text-center">
          QR code scanned successfully!
        </div>
      )}

      <div id="file-upload-reader" style={{ display: 'none' }}></div>
    </div>
  );
}