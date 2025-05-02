import { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';

export default function ImageUpload({ label, onUpload }) {
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'medicine');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      console.error('Upload failed:', err);
      throw err;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    
    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    try {
      // Upload to Cloudinary and pass URL to parent
      const url = await uploadToCloudinary(file);
      onUpload(url);
    } catch (err) {
      alert('Image upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
      <label className="cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={loading}
        />
        {preview ? (
          <div className="relative h-40">
            <img src={preview} alt="Preview" className="h-full w-full object-cover rounded" />
            <button
              type="button"
              onClick={() => {
                setPreview('');
                onUpload(null);
              }}
              className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-red-600 text-sm" />
            </button>
          </div>
        ) : (
          <div className="h-40 flex flex-col items-center justify-center text-gray-500">
            {loading ? (
              <div className="animate-pulse">Uploading...</div>
            ) : (
              <>
                <FiUpload className="text-2xl mb-2" />
                <span className="text-sm">{label}</span>
              </>
            )}
          </div>
        )}
      </label>
    </div>
  );
}