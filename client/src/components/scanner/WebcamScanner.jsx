import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function WebcamScanner({ onScanSuccess }) {
  const scannerRef = useRef(null);
  const [error, setError] = useState(null);
  const [isScanned, setIsScanned] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('webcam-scanner', {
      fps: 10,
      qrbox: 250,
      aspectRatio: 1.0
    }, false);

    scanner.render(
      (decodedText) => {
        scanner.clear();
        onScanSuccess(decodedText);
        setIsScanned(true);
      },
      (error) => {
        setError(error.message);
      }
    );

    scannerRef.current = scanner;

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, [onScanSuccess]);

  return (
    <div>
      {isScanned ? (
        <div className="p-2 bg-green-100 text-green-800 rounded text-center">
          QR code scanned successfully!
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">
          {error}
        </div>
      ) : (
        <div id="webcam-scanner" className="w-full h-64 md:h-96" />
      )}
    </div>
  );
}