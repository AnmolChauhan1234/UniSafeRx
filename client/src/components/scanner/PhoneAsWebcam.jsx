

// // Fix DroidCam Video Stream Display Issue
// import { useState, useRef, useEffect } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import QRCode from "react-qr-code";

// export default function PhoneAsWebcam({ onScanSuccess }) {
//   const [phoneIp, setPhoneIp] = useState("10.21.84.17"); // Replace with your phone’s IP
//   const [isConnected, setIsConnected] = useState(false);
//   const [error, setError] = useState(null);
//   const [isScanned, setIsScanned] = useState(false);
//   const [videoSrc, setVideoSrc] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Connect to DroidCam stream
//   const handleConnect = async () => {
//     try {
//       setError(null);
//       const streamUrl = `http://${phoneIp}:4748/video`; // DroidCam default video URL

//       // Check if the stream is reachable
//       const testResponse = await fetch(streamUrl);
//       if (!testResponse.ok) {
//         throw new Error("Can’t reach the camera stream");
//       }

//       setVideoSrc(streamUrl);
//       setIsConnected(true);
//     } catch (err) {
//       setError(err.message);
//       setIsConnected(false);
//     }
//   };

//   // Set up video playback when connected
//   useEffect(() => {
//     if (isConnected && videoRef.current && videoSrc) {
//       videoRef.current.src = videoSrc;
//       videoRef.current.play().catch((err) => {
//         setError("Video won’t play automatically. Try clicking play if you see a button, or check the console.");
//       });
//     }
//   }, [isConnected, videoSrc]);

//   // Capture the video frame and scan it
//   const handleCapture = async () => {
//     if (!videoRef.current) {
//       setError("Video isn’t ready yet");
//       return;
//     }

//     try {
//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");

//       canvas.width = videoRef.current.videoWidth;
//       canvas.height = videoRef.current.videoHeight;

//       context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

//       canvas.toBlob(async (blob) => {
//         try {
//           const decodedText = await Html5Qrcode.scanFile(blob, true);
//           onScanSuccess(decodedText);
//           setIsScanned(true);
//         } catch (decodeError) {
//           setError("Couldn’t find a QR code in the capture");
//         }
//       }, "image/jpeg", 0.9);
//     } catch (err) {
//       setError("Capture failed: " + err.message);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {isScanned ? (
//         <div className="p-2 bg-green-100 text-green-800 rounded text-center">
//           QR code scanned successfully!
//         </div>
//       ) : !isConnected ? (
//         <div className="space-y-4">
//           <div className="p-4 bg-blue-50 rounded-lg">
//             <h3 className="font-bold mb-2">Setup Instructions:</h3>
//             <ol className="list-decimal pl-5 space-y-1">
//               <li>Keep DroidCam running on your phone and PC</li>
//               <li>Make sure both are on the same WiFi</li>
//               <li>Enter the phone IP from the DroidCam app</li>
//             </ol>
//           </div>

//           <div className="flex items-center space-x-2">
//             <input
//               type="text"
//               value={phoneIp}
//               onChange={(e) => setPhoneIp(e.target.value.replace(/[^0-9.]/g, ""))}
//               placeholder="Phone IP address"
//               className="flex-1 p-2 border rounded"
//             />
//             <button
//               onClick={handleConnect}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
//             >
//               Connect
//             </button>
//           </div>

//           <div className="text-center">
//             <p className="mb-2">Scan this QR to autofill IP:</p>
//             <div className="inline-block p-2 bg-white rounded">
//               <QRCode value={phoneIp} size={128} bgColor="#ffffff" fgColor="#000000" />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             className="w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden mx-auto"
//             style={{ aspectRatio: "4/3" }}
//           />
//           <button
//             onClick={handleCapture}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer w-full"
//           >
//             Capture and Decode QR Code
//           </button>
//           <canvas ref={canvasRef} className="hidden" />
//         </div>
//       )}

//       {error && (
//         <div className="p-3 bg-red-50 text-red-700 rounded-lg">
//           Error: {error} - Check DroidCam and try again
//         </div>
//       )}
//     </div>
//   );
// }


import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QRCode from "react-qr-code";

export default function PhoneAsWebcam({ onScanSuccess }) {
  const [phoneIp, setPhoneIp] = useState("10.21.84.17"); // Replace with your phone’s IP
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [videoSrc, setVideoSrc] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Connect to DroidCam stream
  const handleConnect = async () => {
    try { 
      setError(null);
      const streamUrl = `http://${phoneIp}:4748/video`; // DroidCam default video URL
      console.log("Connecting to stream URL:", streamUrl);

      // Check if the stream is reachable
      const testResponse = await fetch(streamUrl);
      if (!testResponse.ok) {
        throw new Error("Can’t reach the camera stream");
      }

      setVideoSrc(streamUrl);
      setIsConnected(true);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    }
  };

  // Set up video playback when connected
  useEffect(() => {
    if (isConnected && videoRef.current && videoSrc) {
      console.log("Setting video source to:", videoSrc);
      videoRef.current.src = videoSrc;
      videoRef.current.play().catch((err) => {
        setError("Video won’t play automatically. Try clicking the play button.");
      });
    }
  }, [isConnected, videoSrc]);

  // Capture the video frame and scan it
  const handleCapture = async () => {
    if (!videoRef.current) {
      setError("Video isn’t ready yet");
      return;
    }

    try {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(async (blob) => {
        try {
          const decodedText = await Html5Qrcode.scanFile(blob, true);
          onScanSuccess(decodedText);
          setIsScanned(true);
        } catch (decodeError) {
          setError("Couldn’t find a QR code in the capture");
        }
      }, "image/jpeg", 0.9);
    } catch (err) {
      setError("Capture failed: " + err.message);
    }
  };

  const handleManualPlay = () => {
    if (videoRef.current) {
      console.log("Manually playing video with source:", videoRef.current.src);
      videoRef.current.play().catch((err) => {
        setError("Failed to play video: " + err.message);
      });
    }
  };

  return (
    <div className="space-y-4">
      {isScanned ? (
        <div className="p-2 bg-green-100 text-green-800 rounded text-center">
          QR code scanned successfully!
        </div>
      ) : !isConnected ? (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-bold mb-2">Setup Instructions:</h3>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Keep DroidCam running on your phone and PC</li>
              <li>Make sure both are on the same WiFi</li>
              <li>Enter the phone IP from the DroidCam app</li>
            </ol>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={phoneIp}
              onChange={(e) => setPhoneIp(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="Phone IP address"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleConnect}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Connect
            </button>
          </div>

          <div className="text-center">
            <p className="mb-2">Scan this QR to autofill IP:</p>
            <div className="inline-block p-2 bg-white rounded">
              <QRCode value={phoneIp} size={128} bgColor="#ffffff" fgColor="#000000" />
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden mx-auto"
            style={{ aspectRatio: "4/3" }}
          />
          <button
            onClick={handleManualPlay}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer w-full"
          >
            Play Video
          </button>
          <button
            onClick={handleCapture}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer w-full"
          >
            Capture and Decode QR Code
          </button>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-lg">
          Error: {error} - Check DroidCam and try again
        </div>
      )}
    </div>
  );
}
