import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiHome, FiUser } from 'react-icons/fi';

export default function Upload() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/upload' } });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'video') {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));
      
      if (file) {
        const videoPreview = URL.createObjectURL(file);
        setPreviewUrl(videoPreview);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('video', formData.video);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      const response = await axios.post('/api/posts', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      });

      navigate(`/posts/${response.data.post._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 p-4 flex flex-col items-center"
    >
      {/* Navigation Buttons */}
      <div className="w-full max-w-4xl flex justify-end mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 mr-3 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Home"
          onClick={() => navigate('/')} 
        >
          <FiHome className="text-xl" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Profile"
          onClick={() => navigate('/profile')}
        >
          <FiUser className="text-xl" />
        </motion.button>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-8">
        <motion.h1 
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          className="text-3xl font-light text-gray-900 mb-8 text-center"
        >
          Share Your Football Moment
        </motion.h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100"
          >
            {error}
          </motion.div>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form 
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Video Preview */}
            {previewUrl && (
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <video 
                  src={previewUrl} 
                  controls 
                  className="w-full aspect-video object-cover"
                />
              </div>
            )}

            {/* Video Upload */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Select Video
              </label>
              <input
                type="file"
                name="video"
                id="video-upload" 
                accept="video/*"
                onChange={handleChange}
                required
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-medium
                  file:bg-gray-100 file:text-gray-700
                  hover:file:bg-gray-200 cursor-pointer"  
              />
            </div>

            {/* Title Input */}
            <div className="space-y-1">
              <label htmlFor="title-input" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title-input"  
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                placeholder="Amazing goal vs Barcelona"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-1">
              <label htmlFor="description-input" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description-input"  
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
                placeholder="Describe your moment..."
              />
            </div>

            {/* Progress Bar */}
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{uploadProgress}% uploaded</p>
              </div>
            )}

            <motion.button
              type="submit"
              disabled={isUploading || !formData.video}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                'Upload Moment'
              )}
            </motion.button>
          </motion.form>

          {/* Tips panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-50 p-6 rounded-xl border border-gray-200"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Upload Guidelines
            </h3>
            
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <div>
                  <h4 className="font-medium">Video Length</h4>
                  <p className="text-sm">Keep clips under 2 minutes for optimal viewing</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <div>
                  <h4 className="font-medium">Quality Matters</h4>
                  <p className="text-sm">Landscape (16:9) videos in HD look best</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-3">•</span>
                <div>
                  <h4 className="font-medium">Descriptive Titles</h4>
                  <p className="text-sm">"Last minute bicycle kick goal" works better than "My goal"</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}