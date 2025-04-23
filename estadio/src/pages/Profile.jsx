// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiEdit, FiGrid, FiList, FiSettings, FiUser } from 'react-icons/fi';
// import axios from 'axios';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     bio: '',
//     profilePicture: null
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
        
//         // Fetch profile data
//         const profileResponse = await axios.get('/api/users/profile', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         if (!profileResponse.data?.user) {
//           throw new Error('User data not found');
//         }

//         setUser(profileResponse.data.user);
//         setFormData({
//           username: profileResponse.data.user.username,
//           bio: profileResponse.data.user.bio || ''
//         });

//         // Fetch posts separately (optional - can be lazy loaded)
//         const postsResponse = await axios.get(`/api/users/${profileResponse.data.user._id}/posts`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         setPosts(postsResponse.data?.posts || []);

//       } catch (err) {
//         console.error('Profile load error:', err);
//         setError(err.response?.data?.message || err.message);
//         if (err.response?.status === 401) {
//           navigate('/login');
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [navigate]);

//   const handleEditProfile = () => {
//     setIsEditing(true);
//   };

//   const handleSaveProfile = async () => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append('username', formData.username);
//       formDataToSend.append('bio', formData.bio);
      
//       if (formData.profilePicture) {
//         formDataToSend.append('profilePicture', formData.profilePicture);
//       }

//       const response = await axios.put('/api/users/profile', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });

//       setUser(response.data.user);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       setError(error.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setFormData({
//       ...formData,
//       profilePicture: e.target.files[0]
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen p-4">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
//           <h3 className="text-red-600 font-bold text-lg mb-2">Error Loading Profile</h3>
//           <p className="text-red-700 mb-4">{error}</p>
          
//           <div className="flex flex-col space-y-2">
//             <button
//               onClick={() => window.location.reload()}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//               Refresh Page
//             </button>
//             <button
//               onClick={() => {
//                 localStorage.removeItem('token');
//                 navigate('/login');
//               }}
//               className="text-blue-500 hover:underline"
//             >
//               Go to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       {/* Profile Header */}
//       <div className="flex flex-col md:flex-row items-center mb-8">
//         <div className="relative mb-4 md:mb-0 md:mr-12">
//           {isEditing ? (
//             <>
//               <img
//                 src={
//                   formData.profilePicture
//                     ? URL.createObjectURL(formData.profilePicture)
//                     : user.profilePicture || '/default-profile.png'
//                 }
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
//               />
//               <input
//                 type="file"
//                 id="profile-picture"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="hidden"
//               />
//               <label
//                 htmlFor="profile-picture"
//                 className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
//               >
//                 <FiEdit size={16} />
//               </label>
//             </>
//           ) : (
//             <img
//               src={user.profilePicture || '/default-profile.png'}
//               alt="Profile"
//               className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
//             />
//           )}
//         </div>

//         <div className="flex-1">
//           {isEditing ? (
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="text-2xl font-bold border rounded px-3 py-1 w-full"
//                 placeholder="Username"
//               />
//               <textarea
//                 name="bio"
//                 value={formData.bio}
//                 onChange={handleInputChange}
//                 className="border rounded px-3 py-1 w-full"
//                 rows="3"
//                 placeholder="Tell us about your football passion..."
//               />
//               <div className="flex space-x-4">
//                 <button
//                   onClick={handleSaveProfile}
//                   className="bg-blue-500 text-white px-4 py-1 rounded"
//                 >
//                   Save Changes
//                 </button>
//                 <button
//                   onClick={() => setIsEditing(false)}
//                   className="bg-gray-200 px-4 py-1 rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="flex items-center mb-4">
//                 <h1 className="text-2xl font-bold mr-4">{user.username}</h1>
//                 <button
//                   onClick={handleEditProfile}
//                   className="bg-gray-100 px-4 py-1 rounded text-sm flex items-center"
//                 >
//                   <FiEdit className="mr-1" /> Edit Profile
//                 </button>
//                 <button 
//                   className="ml-4 p-2 rounded-full hover:bg-gray-100"
//                   onClick={() => navigate('/settings')}
//                 >
//                   <FiSettings />
//                 </button>
//               </div>
//               <div className="flex space-x-8 mb-4">
//                 <span className="font-semibold">{posts.length} posts</span>
//                 {/* We'll add followers/following later */}
//               </div>
//               <p className="text-gray-800">{user.bio || 'No bio yet'}</p>
//             </>
//           )}
//         </div>
//       </div>

//       {/* View Mode Toggle */}
//       <div className="flex justify-center border-t border-b border-gray-200 py-2 mb-8">
//         <button
//           onClick={() => setViewMode('grid')}
//           className={`px-4 py-2 flex items-center ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-500'}`}
//         >
//           <FiGrid className="mr-2" /> Grid
//         </button>
//         <button
//           onClick={() => setViewMode('list')}
//           className={`px-4 py-2 flex items-center ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-500'}`}
//         >
//           <FiList className="mr-2" /> List
//         </button>
//       </div>

//       {/* Posts */}
//       {posts.length === 0 ? (
//         <div className="text-center py-12">
//           <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
//           <p className="text-gray-500">Share your favorite football moments!</p>
//           <button
//             onClick={() => navigate('/upload')}
//             className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             Upload Your First Post
//           </button>
//         </div>
//       ) : viewMode === 'grid' ? (
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="aspect-square bg-gray-100 relative cursor-pointer group"
//               onClick={() => navigate(`/post/${post._id}`)}
//             >
//               <img
//                 src={post.thumbnail || post.videoThumbnail || '/default-post.jpg'}
//                 alt={post.caption || 'Football moment'}
//                 className="w-full h-full object-cover"
//                 onError={(e) => {
//                   e.target.src = '/default-post.jpg';
//                 }}
//               />
//               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity">
//                 <span className="text-white font-semibold flex items-center">
//                   <FiUser className="mr-1" /> {post.likes || 0}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {posts.map((post) => (
//             <div
//               key={post._id}
//               className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
//               onClick={() => navigate(`/post/${post._id}`)}
//             >
//               <div className="flex">
//                 <img
//                   src={post.thumbnail || post.videoThumbnail || '/default-post.jpg'}
//                   alt={post.caption || 'Football moment'}
//                   className="w-24 h-24 object-cover rounded"
//                   onError={(e) => {
//                     e.target.src = '/default-post.jpg';
//                   }}
//                 />
//                 <div className="ml-4 flex-1">
//                   <h3 className="font-semibold">
//                     {post.caption || 'Football Moment'}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1">
//                     {new Date(post.createdAt).toLocaleDateString()}
//                   </p>
//                   <div className="flex items-center mt-2 text-sm text-gray-600">
//                     <FiUser className="mr-1" />
//                     <span>{post.likes || 0} likes</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;