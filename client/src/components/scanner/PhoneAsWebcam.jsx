

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

// import { useState, useRef, useEffect } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import QRCode from "react-qr-code";

// export default function PhoneAsWebcam({ onScanSuccess }) {
//   const [phoneIp, setPhoneIp] = useState("10.21.84.17");
//   const [isConnected, setIsConnected] = useState(false);
//   const [error, setError] = useState(null);
//   const [isScanned, setIsScanned] = useState(false);
//   const [videoSrc, setVideoSrc] = useState(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   // Connect to DroidCam stream (CORRECT PORT 4747)
//   const handleConnect = async () => {
//     try { 
//       setError(null);
//       const streamUrl = `http://${phoneIp}:4747/video`; // Corrected port
//       console.log("Connecting to stream URL:", streamUrl);

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
//       console.log("Setting video source to:", videoSrc);
//       const video = videoRef.current;
//       video.src = videoSrc;
      
//       video.play().catch((err) => {
//         setError("Video won’t play automatically. Try clicking the play button.");
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

//   const handleManualPlay = () => {
//     if (videoRef.current) {
//       videoRef.current.play().catch((err) => {
//         setError("Failed to play video: " + err.message);
//       });
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
//             muted
//             playsInline
//             className="w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden mx-auto"
//             style={{ aspectRatio: "4/3" }}
//             onError={(e) => {
//               setError("Video failed to load. Check IP and DroidCam connection");
//               console.error("Video error:", e.target.error);
//             }}
//           />
//           <button
//             onClick={handleManualPlay}
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 cursor-pointer w-full"
//           >
//             Play Video
//           </button>
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







// import { useState, useRef, useEffect } from "react";
// import { Html5Qrcode } from "html5-qrcode";
// import QRCode from "react-qr-code";

// export default function PhoneAsWebcam({ onScanSuccess }) {
//   const [phoneIp, setPhoneIp] = useState("");
//   const [isConnected, setIsConnected] = useState(false);
//   const [error, setError] = useState(null);
//   const [isScanned, setIsScanned] = useState(false);
//   const [frameSrc, setFrameSrc] = useState("");
//   const [debugInfo, setDebugInfo] = useState("");
//   const canvasRef = useRef(null);
//   const streamInterval = useRef(null);

//   // Test multiple DroidCam ports
//   const testPorts = async (ip) => {
//     const ports = [4747, 4749, 4748]; // Standard, HD, and alternate ports
//     for (const port of ports) {
//       try {
//         const url = `http://${ip}:${port}/video`;
//         await testConnection(url);
//         return port;
//       } catch (e) {
//         continue;
//       }
//     }
//     throw new Error("No working ports found");
//   };

//   // Test connection with timeout
//   const testConnection = (url) => {
//     return new Promise((resolve, reject) => {
//       const tester = new Image();
//       tester.onload = () => resolve();
//       tester.onerror = () => reject();
//       tester.src = `${url}?t=${Date.now()}`;
//       setTimeout(() => reject(), 2000);
//     });
//   };

//   // Handle connection
//   const handleConnect = async () => {
//     try {
//       setError(null);
//       setDebugInfo("");
      
//       // Validate IP format
//       if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(phoneIp)) {
//         throw new Error("Invalid IP format (e.g., 192.168.1.10)");
//       }

//       // Find working port
//       const port = await testPorts(phoneIp);
//       const streamUrl = `http://${phoneIp}:${port}/video`;
      
//       // Start stream
//       clearInterval(streamInterval.current);
//       streamInterval.current = setInterval(() => {
//         setFrameSrc(`${streamUrl}?t=${Date.now()}`);
//       }, 100);

//       setIsConnected(true);
//     } catch (err) {
//       handleError(err);
//       setIsConnected(false);
//     }
//   };

//   // Enhanced error handler
//   const handleError = (error) => {
//     const debugData = {
//       timestamp: new Date().toISOString(),
//       userAgent: navigator.userAgent,
//       ip: phoneIp,
//       portsTested: [4747, 4749, 4748],
//       error: error.message
//     };

//     setDebugInfo(JSON.stringify(debugData, null, 2));
    
//     const errorMessages = {
//       "Invalid IP format": "Please enter a valid IP address (numbers and dots only)",
//       "No working ports found": `
//         1. Verify DroidCam is running on both devices
//         2. Check firewall settings (ports 4747-4749)
//         3. Try USB connection instead of WiFi
//       `,
//       default: "Check network connection and restart DroidCam"
//     };

//     setError(errorMessages[error.message] || errorMessages.default);
//   };

//   // Capture and decode QR
//   const handleCapture = async () => {
//     try {
//       const img = new Image();
//       img.crossOrigin = "anonymous";
//       img.src = frameSrc;

//       await new Promise((resolve, reject) => {
//         img.onload = resolve;
//         img.onerror = reject;
//       });

//       const canvas = canvasRef.current;
//       const context = canvas.getContext("2d");
//       canvas.width = img.naturalWidth;
//       canvas.height = img.naturalHeight;
//       context.drawImage(img, 0, 0);

//       const blob = await new Promise(resolve => 
//         canvas.toBlob(resolve, "image/jpeg", 0.9)
//       );

//       const decodedText = await Html5Qrcode.scanFile(blob, true);
//       onScanSuccess(decodedText);
//       setIsScanned(true);
//     } catch (err) {
//       setError("Capture failed: " + err.message);
//     }
//   };

//   // Cleanup
//   useEffect(() => {
//     return () => {
//       clearInterval(streamInterval.current);
//     };
//   }, []);

//   return (
//     <div className="space-y-4 max-w-2xl mx-auto p-4">
//       {isScanned ? (
//         <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center">
//           ✓ QR Code Successfully Scanned
//         </div>
//       ) : !isConnected ? (
//         <div className="space-y-6">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <h2 className="text-lg font-bold mb-3">Setup Instructions</h2>
//             <ol className="list-decimal list-inside space-y-2">
//               <li>Install DroidCam on phone and PC</li>
//               <li>Connect both to the same WiFi network</li>
//               <li>Launch DroidCam on both devices</li>
//               <li>Enter phone IP from DroidCam app below</li>
//             </ol>
//           </div>

//           <div className="flex gap-2">
//             <input
//               type="text"
//               value={phoneIp}
//               onChange={(e) => setPhoneIp(e.target.value.replace(/[^0-9.]/g, ""))}
//               placeholder="Phone IP address"
//               className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               onClick={handleConnect}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//             >
//               Connect
//             </button>
//           </div>

//           <div className="text-center">
//             <p className="mb-3 text-sm">Scan to autofill IP:</p>
//             <div className="inline-block p-3 bg-white rounded-lg shadow">
//               <QRCode 
//                 value={phoneIp} 
//                 size={128}
//                 bgColor="#ffffff"
//                 fgColor="#000000"
//                 level="Q"
//               />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
//             <img
//               src={frameSrc}
//               alt="Camera stream"
//               className="w-full h-full object-contain"
//               onError={(e) => {
//                 setError("Stream connection lost");
//                 setIsConnected(false);
//               }}
//             />
//           </div>

//           <div className="grid gap-3">
//             <button
//               onClick={handleCapture}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Scan QR Code
//             </button>
//             <button
//               onClick={() => setIsConnected(false)}
//               className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
//             >
//               Disconnect
//             </button>
//           </div>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-50 p-4 rounded-lg">
//           <div className="text-red-700 font-medium mb-2">{error}</div>
//           <details className="text-sm">
//             <summary className="cursor-pointer">Technical details</summary>
//             <pre className="whitespace-pre-wrap mt-2 text-red-600">{debugInfo}</pre>
//           </details>
//         </div>
//       )}

//       <canvas ref={canvasRef} className="hidden" />
//     </div>
//   );
// }



import { useState, useRef, useEffect } from "react";
import { Html5Qrcode } from "html5-qrcode";
import QRCode from "react-qr-code";

export default function PhoneAsWebcam({ onScanSuccess }) {
  const [phoneIp, setPhoneIp] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [isScanned, setIsScanned] = useState(false);
  const [frameSrc, setFrameSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const canvasRef = useRef(null);
  const streamInterval = useRef(null);

  // Enhanced connection handler with HTTP server mode
  const handleConnect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Validate IP format
      if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(phoneIp)) {
        throw new Error("Invalid IP format (e.g., 192.168.1.10)");
      }

      const streamUrl = `http://${phoneIp}:4747/video?mode=stream&nojpeg=0`;
      
      // Test connection with forced server mode
      const testImg = new Image();
      await new Promise((resolve, reject) => {
        testImg.onload = resolve;
        testImg.onerror = () => reject(new Error("Failed to connect to DroidCam server"));
        testImg.src = `${streamUrl}&t=${Date.now()}`;
        setTimeout(() => reject(new Error("Connection timeout")), 3000);
      });

      // Start the stream
      clearInterval(streamInterval.current);
      streamInterval.current = setInterval(() => {
        setFrameSrc(`${streamUrl}&t=${Date.now()}`);
      }, 100);

      setIsConnected(true);
    } catch (err) {
      setError(err.message);
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Capture and decode QR code
  const handleCapture = async () => {
    try {
      if (!frameSrc) throw new Error("No video frame available");
      
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = frameSrc;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, "image/jpeg", 0.9);
      });

      const decodedText = await Html5Qrcode.scanFile(blob, true);
      onScanSuccess(decodedText);
      setIsScanned(true);
    } catch (err) {
      setError("Scan failed: " + err.message);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(streamInterval.current);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 space-y-6">
      {/* Connection Status */}
      {isScanned ? (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg text-center">
          ✓ QR Code Successfully Scanned
        </div>
      ) : !isConnected ? (
        <div className="space-y-6">
          {/* Setup Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-3">DroidCam Setup</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>On your phone's DroidCam app:
                <ul className="list-disc list-inside pl-4 mt-1">
                  <li>Go to Settings → Connection</li>
                  <li>Enable "HTTP Server"</li>
                  <li>Disable "Show Preview"</li>
                </ul>
              </li>
              <li>Connect both devices to the same WiFi</li>
              <li>Enter the IP shown in DroidCam's HTTP Server section</li>
            </ol>
          </div>

          {/* Connection Form */}
          <div className="flex gap-2">
            <input
              type="text"
              value={phoneIp}
              onChange={(e) => setPhoneIp(e.target.value.replace(/[^0-9.]/g, ""))}
              placeholder="Phone IP address"
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleConnect}
              disabled={isLoading}
              className={`px-4 py-2 rounded transition-colors ${
                isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? "Connecting..." : "Connect"}
            </button>
          </div>

          {/* QR Code Helper */}
          <div className="text-center">
            <p className="mb-2 text-sm text-gray-600">Scan to autofill IP:</p>
            <div className="inline-block p-3 bg-white rounded-lg border">
              <QRCode 
                value={phoneIp} 
                size={128}
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Stream Viewer */
        <div className="space-y-4">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {frameSrc ? (
              <img
                src={frameSrc}
                alt="DroidCam Stream"
                className="w-full h-full object-contain"
                onError={() => {
                  setError("Stream disconnected");
                  setIsConnected(false);
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Initializing stream...
              </div>
            )}
          </div>

          <div className="grid gap-3">
            <button
              onClick={handleCapture}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Scan QR Code
            </button>
            <button
              onClick={() => setIsConnected(false)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="text-red-700 font-medium">{error}</div>
          <div className="mt-2 text-sm text-red-600">
            Troubleshooting:
            <ul className="list-disc list-inside pl-4">
              <li>Verify HTTP Server is enabled in DroidCam settings</li>
              <li>Check phone and computer are on same network</li>
              <li>Try restarting DroidCam on both devices</li>
            </ul>
          </div>
        </div>
      )}

      {/* Hidden canvas for QR processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}