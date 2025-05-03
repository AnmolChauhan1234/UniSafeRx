// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaCamera,
//   FaMobileAlt,
//   FaUpload,
//   FaKeyboard,
// } from "react-icons/fa";
// import ScannerMethodSelector from "../components/scanner/ScannerMethodSelector";
// import WebcamScanner from "../components/scanner/WebcamScanner";
// import PhoneAsWebcam from "../components/scanner/PhoneAsWebcam";
// import FileUploadScanner from "../components/scanner/FileUploadScanner";
// import ManualInputScanner from "../components/scanner/ManualInputScanner";
// import VerificationResult from "../components/scanner/VerificationResult";
// import ImageUpload from "../components/common/ImageUpload";

// export default function MedicineVerification() {
//   const [scanMethod, setScanMethod] = useState(null);
//   const [formData, setFormData] = useState({
//     qrData: null,
//     images: Array(4).fill(null),
//     geolocation: null,
//     timestamp: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [submissionError, setSubmissionError] = useState("");
//   const [scanResult, setScanResult] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setFormData((prev) => ({
//             ...prev,
//             geolocation: {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             },
//             timestamp: new Date().toISOString(),
//           }));
//         },
//         (error) => {
//           console.error("Error getting geolocation:", error);
//           setFormData((prev) => ({
//             ...prev,
//             timestamp: new Date().toISOString(),
//           }));
//         }
//       );
//     }
//   }, []);

//   const handleScanSuccess = (qrData) => {
//     setFormData((prev) => ({ ...prev, qrData }));
//   };

//   const handleImageUpload = (index, url) => {
//     const newImages = [...formData.images];
//     newImages[index] = url;
//     setFormData((prev) => ({ ...prev, images: newImages }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSubmissionError("");

//     try {
//       // Validate form data
//       if (!formData.qrData) throw new Error("Please scan a QR code first");
//       if (!formData.images.some((img) => img)) {
//         throw new Error("Please upload at least one image");
//       }

//       // Parse QR data
//       let qrPayload;
//       console.log(formData.qrData);
//       try {
//         qrPayload = JSON.parse(formData.qrData);
//         // qrPayload = formData.qrData
//         console.log(qrPayload);
//       } catch (err) {
//         throw new Error("Invalid QR code data format");
//       }

//       // Get user role
//       const role = sessionStorage.getItem("role");
//       if (!role) throw new Error("User role not found");

//       // Prepare payload
//       const payload = {
//         qr_payload: qrPayload,
//         image_urls: formData.images.filter((img) => img),
//         geolocation: formData.geolocation
//           ? `${formData.geolocation.lat},${formData.geolocation.lng}`
//           : null,
//         timestamp: formData.timestamp,
//         role: role
//       };

//       console.log(payload);

//       // Submit to backend
//       const response = await fetch(
//         "http://localhost:8000/api/verification/full-verify/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Verification failed");
//       }

//       setScanResult(await response.json());
//     } catch (err) {
//       setSubmissionError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (scanResult) {
//     return (
//       <VerificationResult
//         result={scanResult}
//         onReset={() => navigate("/verify-medicine")}
//       />
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4"
//     >
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="p-8">
//             <motion.button
//               whileHover={{ x: -3 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => navigate(-1)}
//               className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
//             >
//               <FaArrowLeft className="mr-2" />
//               Back to Dashboard
//             </motion.button>

//             <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//               Medicine Verification Form
//             </h1>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* QR Code Section */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold mb-4">
//                   1. Scan Medicine QR Code
//                 </h2>
//                 {!formData.qrData ? (
//                   !scanMethod ? (
//                     <ScannerMethodSelector onSelect={setScanMethod} />
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="flex items-start mb-4">
//                         <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
//                           {scanMethod === "webcam" && <FaCamera />}
//                           {scanMethod === "phone" && <FaMobileAlt />}
//                           {scanMethod === "upload" && <FaUpload />}
//                           {scanMethod === "manual" && <FaKeyboard />}
//                         </div>
//                         <div>
//                           <h3 className="font-medium">
//                             {
//                               {
//                                 webcam: "Webcam Scanner",
//                                 phone: "Phone as Webcam",
//                                 upload: "File Upload",
//                                 manual: "Manual Input",
//                               }[scanMethod]
//                             }
//                           </h3>
//                           <button
//                             type="button"
//                             onClick={() => setScanMethod(null)}
//                             className="text-sm text-indigo-600 hover:text-indigo-800"
//                           >
//                             Change method
//                           </button>
//                         </div>
//                       </div>

//                       {scanMethod === "webcam" && (
//                         <WebcamScanner onScanSuccess={handleScanSuccess} />
//                       )}
//                       {scanMethod === "phone" && (
//                         <PhoneAsWebcam onScanSuccess={handleScanSuccess} />
//                       )}
//                       {scanMethod === "upload" && (
//                         <FileUploadScanner onScanSuccess={handleScanSuccess} />
//                       )}
//                       {scanMethod === "manual" && (
//                         <ManualInputScanner onScanSuccess={handleScanSuccess} />
//                       )}
//                     </div>
//                   )
//                 ) : (
//                   <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
//                     <span>QR Code scanned successfully!</span>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setFormData((prev) => ({ ...prev, qrData: "" }))
//                       }
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Rescan
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Image Upload Section */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold mb-6">
//                   2. Upload Medicine Images
//                 </h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   {[0, 1, 2, 3].map((index) => (
//                     <ImageUpload
//                       key={index}
//                       label={`Image ${index + 1}`}
//                       onUpload={(url) => handleImageUpload(index, url)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Submission Section */}
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   disabled={
//                     loading ||
//                     !formData.qrData ||
//                     !formData.images.some((img) => img)
//                   }
//                   className={`bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium cursor-pointer ${
//                     loading ||
//                     !formData.qrData ||
//                     !formData.images.some((img) => img)
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-indigo-700"
//                   }`}
//                 >
//                   {loading ? "Verifying..." : "Submit Verification"}
//                 </button>
//                 {submissionError && (
//                   <p className="text-red-600 mt-4">{submissionError}</p>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaCamera,
//   FaMobileAlt,
//   FaUpload,
//   FaKeyboard,
// } from "react-icons/fa";
// import ScannerMethodSelector from "../components/scanner/ScannerMethodSelector";
// import WebcamScanner from "../components/scanner/WebcamScanner";
// import PhoneAsWebcam from "../components/scanner/PhoneAsWebcam";
// import FileUploadScanner from "../components/scanner/FileUploadScanner";
// import ManualInputScanner from "../components/scanner/ManualInputScanner";
// import VerificationResult from "../components/scanner/VerificationResult";
// import ImageUpload from "../components/common/ImageUpload";

// export default function MedicineVerification() {
//   const [scanMethod, setScanMethod] = useState(null);
//   const [formData, setFormData] = useState({
//     qrData: "",
//     images: Array(4).fill(null),
//     geolocation: null,
//     timestamp: null,
//     selectedMedicine: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [submissionError, setSubmissionError] = useState("");
//   const [scanResult, setScanResult] = useState(null);
//   const navigate = useNavigate();

//   // States for medicine search (commented out)
//   const [searchTerm, setSearchTerm] = useState("");
//   const [medicines, setMedicines] = useState([]);

//   useEffect(() => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setFormData((prev) => ({
//             ...prev,
//             geolocation: {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             },
//             timestamp: new Date().toISOString(),
//           }));
//         },
//         (error) => {
//           console.error("Error getting geolocation:", error);
//           setFormData((prev) => ({
//             ...prev,
//             timestamp: new Date().toISOString(),
//           }));
//         }
//       );
//     }
//   }, []);

//   // Fetch medicines with debounce (commented out)
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         fetchMedicines(searchTerm);
//       } else {
//         setMedicines([]);
//       }
//     }, 300);

//     return () => clearTimeout(delayDebounceFn);
//   }, [searchTerm]);

//   const fetchMedicines = async (term) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/medicine/search-medicine?q=${term}`);
//       if (!response.ok) throw new Error("Failed to fetch medicines");
//       const data = await response.json();
//       setMedicines(data);
//     } catch (err) {
//       console.error(err);
//       setMedicines([]);
//     }
//   };

//   const handleScanSuccess = (qrData) => {
//     console.log(qrData);
//     setFormData((prev) => ({ ...prev, qrData }));
//   };

//   const handleImageUpload = (index, url) => {
//     const newImages = [...formData.images];
//     newImages[index] = url;
//     setFormData((prev) => ({ ...prev, images: newImages }));
//   };


//   //search fucntion starts here
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleMedicineSelect = (medicine) => {
//     setFormData((prev) => ({ ...prev, selectedMedicine: medicine.name }));
//     setMedicines([]); // Close dropdown
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSubmissionError("");

//     try {
//       // Validate form data
//       if (!formData.qrData) throw new Error("Please scan a QR code first");

//       if (!formData.images.some((img) => img)) {
//         throw new Error("Please upload at least one image");
//       }

//       if (!formData.selectedMedicine) {
//         throw new Error("Please select a medicine");
//       }

//       const payload = {
//         qrData: formData.qrData,
//         images: formData.images.filter((img) => img), // Send only uploaded images
//         geolocation: formData.geolocation,
//         timestamp: formData.timestamp,
//         selectedMedicine: formData.selectedMedicine,
//       };

//       console.log("Submitting payload:", payload);

//       // Submit to backend
//       const response = await fetch(
//         "http://localhost:8000/api/verify-medicine",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Verification failed");
//       }

//       setScanResult(await response.json());
//     } catch (err) {
//       setSubmissionError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (scanResult) {
//     return (
//       <VerificationResult
//         result={scanResult}
//         onReset={() => navigate("/verify-medicine")}
//       />
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4"
//     >
//       <div className="max-w-3xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//           <div className="p-8">
//             <motion.button
//               whileHover={{ x: -3 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => navigate(-1)}
//               className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
//             >
//               <FaArrowLeft className="mr-2" />
//               Back to Dashboard
//             </motion.button>

//             <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//               Medicine Verification Form
//             </h1>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* QR Code Section */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold mb-4">
//                   1. Scan Medicine QR Code
//                 </h2>
//                 {!formData.qrData ? (
//                   !scanMethod ? (
//                     <ScannerMethodSelector onSelect={setScanMethod} />
//                   ) : (
//                     <div className="space-y-4">
//                       <div className="flex items-start mb-4">
//                         <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
//                           {scanMethod === "webcam" && <FaCamera />}
//                           {scanMethod === "phone" && <FaMobileAlt />}
//                           {scanMethod === "upload" && <FaUpload />}
//                           {scanMethod === "manual" && <FaKeyboard />}
//                         </div>
//                         <div>
//                           <h3 className="font-medium">
//                             {
//                               {
//                                 webcam: "Webcam Scanner",
//                                 phone: "Phone as Webcam",
//                                 upload: "File Upload",
//                                 manual: "Manual Input",
//                               }[scanMethod]
//                             }
//                           </h3>
//                           <button
//                             type="button"
//                             onClick={() => setScanMethod(null)}
//                             className="text-sm text-indigo-600 hover:text-indigo-800"
//                           >
//                             Change method
//                           </button>
//                         </div>
//                       </div>

//                       {scanMethod === "webcam" && (
//                         <WebcamScanner onScanSuccess={handleScanSuccess} />
//                       )}
//                       {scanMethod === "phone" && (
//                         <PhoneAsWebcam onScanSuccess={handleScanSuccess} />
//                       )}
//                       {scanMethod === "upload" && (
//                         <FileUploadScanner onScanSuccess={handleScanSuccess} />
//                       )}
//                       {scanMethod === "manual" && (
//                         <ManualInputScanner onScanSuccess={handleScanSuccess} />
//                       )}
//                     </div>
//                   )
//                 ) : (
//                   <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
//                     <span>QR Code scanned successfully!</span>
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setFormData((prev) => ({ ...prev, qrData: "" }))
//                       }
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Rescan
//                     </button>
//                   </div>
//                 )}
//               </div>

//               {/* Image Upload Section */}
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold mb-6">
//                   2. Upload Medicine Images
//                 </h2>
//                 <div className="grid grid-cols-2 gap-4">
//                   {[0, 1, 2, 3].map((index) => (
//                     <ImageUpload
//                       key={index}
//                       label={`Image ${index + 1}`}
//                       onUpload={(url) => handleImageUpload(index, url)}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Medicine Selection Section (Commented Out) starts here*/}
              
//               <div className="bg-gray-50 p-6 rounded-lg">
//                 <h2 className="text-xl font-semibold mb-4">3. Select Medicine</h2>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     placeholder="Search for medicine..."
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                   />
//                   {medicines.length > 0 && (
//                     <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow-md">
//                       {medicines.map((medicine, index) => (
//                         <li
//                           key={index}
//                           onClick={() => handleMedicineSelect(medicine)}
//                           className="p-2 hover:bg-indigo-100 cursor-pointer transition-colors"
//                         >
//                           {medicine.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 {formData.selectedMedicine && (
//                   <p className="mt-2 text-gray-700">Selected: {formData.selectedMedicine}</p>
//                 )}
//               </div>
//               {/* Medicine search section ends here */}
              

//               {/* Submission Section */}
//               <div className="text-center">
//                 <button
//                   type="submit"
//                   disabled={
//                     loading ||
//                     !formData.qrData ||
//                     !formData.images.some((img) => img)
//                     // || !formData.selectedMedicine
//                   }
//                   className={`bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium ${
//                     loading ||
//                     !formData.qrData ||
//                     !formData.images.some((img) => img)
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-indigo-700"
//                   }`}
//                 >
//                   {loading ? "Verifying..." : "Submit Verification"}
//                 </button>
//                 {submissionError && (
//                   <p className="text-red-600 mt-4">{submissionError}</p>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }





import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCamera,
  FaMobileAlt,
  FaUpload,
  FaKeyboard,
} from "react-icons/fa";
import ScannerMethodSelector from "../components/scanner/ScannerMethodSelector";
import WebcamScanner from "../components/scanner/WebcamScanner";
import PhoneAsWebcam from "../components/scanner/PhoneAsWebcam";
import FileUploadScanner from "../components/scanner/FileUploadScanner";
import ManualInputScanner from "../components/scanner/ManualInputScanner";
import VerificationResult from "../components/scanner/VerificationResult";
import ImageUpload from "../components/common/ImageUpload";

export default function MedicineVerification() {
  const [scanMethod, setScanMethod] = useState(null);
  const [formData, setFormData] = useState({
    qrData: null,
    images: Array(4).fill(null),
    geolocation: null,
    timestamp: null,
    selectedMedicine: null,
  });
  const [loading, setLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [scanResult, setScanResult] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            geolocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            timestamp: new Date().toISOString(),
          }));
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setFormData((prev) => ({
            ...prev,
            timestamp: new Date().toISOString(),
          }));
        }
      );
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchMedicines(searchTerm.trim());
      } else {
        setMedicines([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchMedicines = async (term) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:8000/api/medicine/search-medicine?q=${term}`
      );
      if (!response.ok) throw new Error("Failed to fetch medicines");
      const data = await response.json();
      setMedicines(data);
    } catch (err) {
      console.error(err);
      setMedicines([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleScanSuccess = (qrData) => {
    setFormData((prev) => ({ ...prev, qrData }));
  };

  const handleImageUpload = (index, url) => {
    const newImages = [...formData.images];
    newImages[index] = url;
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  const handleMedicineSelect = (medicine) => {
    setFormData((prev) => ({ ...prev, selectedMedicine: medicine.name }));
    setMedicines([]);
    setSearchTerm("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmissionError("");

    try {
      if (!formData.qrData) throw new Error("Please scan a QR code first");
      if (!formData.images.some((img) => img)) {
        throw new Error("Please upload at least one image");
      }
      if (!formData.selectedMedicine) {
        throw new Error("Please select a medicine");
      }

      let qrPayload;
      try {
        qrPayload = JSON.parse(formData.qrData);
      } catch (err) {
        throw new Error("Invalid QR code data format");
      }

      const role = sessionStorage.getItem("role");
      if (!role) throw new Error("User role not found");

      const payload = {
        qr_payload: qrPayload,
        image_urls: formData.images.filter((img) => img),
        geolocation: formData.geolocation
          ? `${formData.geolocation.lat},${formData.geolocation.lng}`
          : null,
        timestamp: formData.timestamp,
        role: role,
        medicine_name: formData.selectedMedicine,
      };

      const response = await fetch(
        "http://localhost:8000/api/verification/full-verify/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed");
      }

      setScanResult(await response.json());
    } catch (err) {
      setSubmissionError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (scanResult) {
    return (
      <VerificationResult
        result={scanResult}
        onReset={() => navigate("/verify-medicine")}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <motion.button
              whileHover={{ x: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(-1)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Dashboard
            </motion.button>

            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Medicine Verification Form
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* QR Code Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  1. Scan Medicine QR Code
                </h2>
                {!formData.qrData ? (
                  !scanMethod ? (
                    <ScannerMethodSelector onSelect={setScanMethod} />
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-start mb-4">
                        <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
                          {scanMethod === "webcam" && <FaCamera />}
                          {scanMethod === "phone" && <FaMobileAlt />}
                          {scanMethod === "upload" && <FaUpload />}
                          {scanMethod === "manual" && <FaKeyboard />}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {
                              {
                                webcam: "Webcam Scanner",
                                phone: "Phone as Webcam",
                                upload: "File Upload",
                                manual: "Manual Input",
                              }[scanMethod]
                            }
                          </h3>
                          <button
                            type="button"
                            onClick={() => setScanMethod(null)}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                          >
                            Change method
                          </button>
                        </div>
                      </div>

                      {scanMethod === "webcam" && (
                        <WebcamScanner onScanSuccess={handleScanSuccess} />
                      )}
                      {scanMethod === "phone" && (
                        <PhoneAsWebcam onScanSuccess={handleScanSuccess} />
                      )}
                      {scanMethod === "upload" && (
                        <FileUploadScanner onScanSuccess={handleScanSuccess} />
                      )}
                      {scanMethod === "manual" && (
                        <ManualInputScanner onScanSuccess={handleScanSuccess} />
                      )}
                    </div>
                  )
                ) : (
                  <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center">
                    <span>QR Code scanned successfully!</span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, qrData: "" }))
                      }
                      className="text-red-600 hover:text-red-800"
                    >
                      Rescan
                    </button>
                  </div>
                )}
              </div>

              {/* Image Upload Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6">
                  2. Upload Medicine Images
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <ImageUpload
                      key={index}
                      label={`Image ${index + 1}`}
                      onUpload={(url) => handleImageUpload(index, url)}
                    />
                  ))}
                </div>
              </div>

              {/* Medicine Search Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">
                  3. Select Medicine
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search medicine by name..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  
                  {isSearching && (
                    <div className="absolute z-10 w-full mt-2 text-center text-gray-500">
                      Searching...
                    </div>
                  )}

                  {medicines.length > 0 && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                    >
                      {medicines.map((medicine) => (
                        <li
                          key={medicine.id}
                          onClick={() => handleMedicineSelect(medicine)}
                          className="p-3 hover:bg-indigo-50 cursor-pointer transition-colors border-b border-gray-100 last:border-0"
                        >
                          <span className="font-medium text-indigo-600">
                            {medicine.name}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            {medicine.brand}
                          </p>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </div>
                
                {formData.selectedMedicine && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 p-3 bg-green-50 rounded-lg flex items-center justify-between"
                  >
                    <span className="text-green-700">
                      Selected: <strong>{formData.selectedMedicine}</strong>
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, selectedMedicine: null }))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Clear
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Submission Section */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.qrData ||
                    !formData.images.some((img) => img) ||
                    !formData.selectedMedicine
                  }
                  className={`bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium cursor-pointer ${
                    loading ||
                    !formData.qrData ||
                    !formData.images.some((img) => img) ||
                    !formData.selectedMedicine
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-indigo-700"
                  }`}
                >
                  {loading ? "Verifying..." : "Submit Verification"}
                </button>
                {submissionError && (
                  <p className="text-red-600 mt-4">{submissionError}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}